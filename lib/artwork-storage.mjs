// Store artwork outside localStorage to avoid its small quota.
const DB_NAME = "malino-artwork-v1";
const STORE = "images";
export const artworkKey = (profileId, itemId) => JSON.stringify([profileId, itemId]);

function openArtworkDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Database unavailable"));
  });
}

async function transaction(mode, operation) {
  const db = await openArtworkDb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const result = operation(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(result.result);
      result.onerror = () => reject(result.error || new Error("Artwork operation failed"));
      tx.onerror = () => reject(tx.error || new Error("Artwork transaction failed"));
      tx.onabort = () => reject(tx.error || new Error("Artwork transaction aborted"));
    });
  } finally {
    db.close();
  }
}

export function saveArtwork(profileId, itemId, imageBlob) {
  if (!(imageBlob?.preview instanceof Blob) || !(imageBlob?.layer instanceof Blob)) return Promise.reject(new Error("Painting needs preview and layer Blobs"));
  return transaction("readwrite", store => store.put(imageBlob, artworkKey(profileId, itemId)));
}

export function loadArtwork(profileId, itemId) {
  return transaction("readonly", store => store.get(artworkKey(profileId, itemId)));
}

export async function deleteProfileArtwork(profileId) {
  const db = await openArtworkDb();
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const request = store.openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        try {
          if (JSON.parse(cursor.key)[0] === profileId) cursor.delete();
        } catch { /* ignore unrelated legacy keys */ }
        cursor.continue();
      };
      request.onerror = () => reject(request.error);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
