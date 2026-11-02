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

// Keep consecutive edits, resume, finish and profile removal ordered in this tab.
const pending = new Map();
function inProfileOrder(profileId, operation) {
  const previous = pending.get(profileId) || Promise.resolve();
  const result = previous.then(operation);
  const settled = result.catch(() => {});
  pending.set(profileId, settled);
  settled.then(() => { if (pending.get(profileId) === settled) pending.delete(profileId); });
  return result;
}

const draftKey = profileId => JSON.stringify([profileId, "draft", 1]);
export function saveDraft(profileId, itemId, pixels) {
  return inProfileOrder(profileId, () => transaction("readwrite", store =>
    store.put({itemId, pixels}, draftKey(profileId))));
}
export function loadDraft(profileId) {
  return inProfileOrder(profileId, () => transaction("readonly", store => store.get(draftKey(profileId))));
}

export function saveArtwork(profileId, itemId, imageBlob) {
  if (!(imageBlob?.preview instanceof Blob) || !(imageBlob?.layer instanceof Blob)) return Promise.reject(new Error("Painting needs preview and layer Blobs"));
  return inProfileOrder(profileId, () => transaction("readwrite", store => {
    const draft = store.get(draftKey(profileId));
    draft.onsuccess = () => {
      if (draft.result?.itemId === itemId) store.delete(draftKey(profileId));
    };
    return store.put(imageBlob, artworkKey(profileId, itemId));
  }));
}

export function loadArtwork(profileId, itemId) {
  return transaction("readonly", store => store.get(artworkKey(profileId, itemId)));
}

export function deleteProfileArtwork(profileId) {
  return inProfileOrder(profileId, () => removeProfileImages(profileId));
}

async function removeProfileImages(profileId) {
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
