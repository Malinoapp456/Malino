import {zipSync} from "fflate";
import {loadArtwork} from "./artwork-storage.mjs";

export function fileStem(value) {
  return String(value ?? "").normalize("NFC")
    .replace(/[^\p{L}\p{N}_-]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 64) || "Malino";
}

// Gallery entries predating saved previews may only have a template image.
export async function collectGalleryPngs(profileId, gallery, {read = loadArtwork, signal} = {}) {
  const files = Object.create(null);
  let count = 0;
  const uniqueIds = new Set();
  for (const item of gallery) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    if (!item?.id || uniqueIds.has(item.id)) continue;
    uniqueIds.add(item.id);
    const record = await read(profileId, item.id);
    const png = record?.preview;
    if (!(png instanceof Blob) || png.type !== "image/png" || !png.size) continue;
    const data = new Uint8Array(await png.arrayBuffer());
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const number = String(++count).padStart(2, "0");
    files[number + "-" + fileStem(item.name || item.id) + ".png"] = data;
  }
  return {count, missing: uniqueIds.size - count,
    blob: count ? new Blob([zipSync(files, {level: 0})], {type: "application/zip"}) : null};
}
