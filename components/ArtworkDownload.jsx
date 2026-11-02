"use client";
import {useEffect, useState} from "react";

export default function ArtworkDownload({profileId, profileName, gallery, language}) {
  const [archive, setArchive] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const pl = language === "pl";
  useEffect(() => {
    const controller = new AbortController();
    let url;
    setArchive(null);
    async function prepare() {
      const {collectGalleryPngs, fileStem} = await import("../lib/artwork-archive.mjs");
      const result = await collectGalleryPngs(profileId, gallery, {signal: controller.signal});
      if (controller.signal.aborted) return;
      if (result.blob) url = URL.createObjectURL(result.blob);
      setArchive({url, count: result.count, missing: result.missing,
        filename: "Malino-" + fileStem(profileName) + ".zip"});
    }
    prepare().catch(() => { if (!controller.signal.aborted) setArchive({error: true}); });
    return () => {
      controller.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [profileId, profileName, gallery, attempt]);

  const label = pl ? "Pobierz rysunki" : "Bilder herunterladen";
  return <div data-i18n-ignore="true" className="artworkDownload">
    {archive?.url && <a className="parentUtilityPrimary" download={archive.filename} href={archive.url}>
      ⬇ {label} ({archive.count})
    </a>}
    <p role="status">{!archive ? (pl ? "Przygotowuję rysunki…" : "Bilder werden vorbereitet…")
      : archive.error ? (pl ? "Nie udało się odczytać prac." : "Die Bilder konnten nicht geladen werden.")
      : archive.url ? (pl ? "Plik ZIP z rysunkami PNG." : "ZIP-Datei mit PNG-Bildern.")
      : (pl ? "Brak rysunków do pobrania." : "Keine Bilder zum Herunterladen.")}
      {archive?.missing > 0 && (pl ? " Wpisy bez zapisanego obrazu: " : " Einträge ohne gespeichertes Bild: ") + archive.missing}
    </p>
    {archive?.error && <button onClick={() => setAttempt(n => n + 1)}>{pl ? "Spróbuj ponownie" : "Erneut versuchen"}</button>}
  </div>;
}
