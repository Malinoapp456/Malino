// Malino PWA update fix — 2026-10-18.
// Bump VERSION whenever this worker or its precached resources change.
const VERSION = "v36-20261018-magical-xylo";
const CACHE = "malino-pwa-" + VERSION;
const CORE = [
  "/puzzle-astronaut-color.png",
  "/puzzle-drache-color.png",
  "/puzzle-feuerwehr-color.png",
  "/puzzle-fuchs-color.png",
  "/puzzle-igel-color.png",
  "/puzzle-pferd-color.png",
  "/puzzle-pinguin-color.png",
  "/puzzle-rakete-color.png",
  "/puzzle-schloss-color.png",
  "/puzzle-traktor-color.png",
  "/puzzle-triceratops-color.png",
  "/puzzle-ziege-color.png",
  "/puzzle-rakete.png",
  "/puzzle-triceratops.png",
  "/puzzle-feuerwehr.png",
  "/puzzle-traktor.png",
  "/puzzle-fuchs.png",
  "/puzzle-pinguin.png",
  "/puzzle-drache.png",
  "/puzzle-schloss.png",
  "/puzzle-pferd.png",
  "/puzzle-igel.png",
  "/puzzle-ziege.png",
  "/puzzle-astronaut.png",
  "/malino-raetsel-mascot.png",
  "/sounds/premium-reward-fanfare.wav",
  "/sounds/premium-chest-open.wav",
  "/reward-chest-premium.png",
  "/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/malino-hero-mascot.png",
  "/malino-hero-background.png",
  "/sounds/magical-welcome.wav",
  "/sounds/xylophone-welcome.wav",
  "/sounds/click.wav",
  "/sounds/color.wav",
  "/sounds/success.wav",
  "/sounds/stars.wav",
  "/sounds/reward.wav",
  "/sounds/streak.wav",
  "/sounds/chest-creak.wav",
  "/sounds/reward-boom.wav",
  "/sounds/reward-fanfare.wav"
];

// Do not force activation: page.js reloads on controllerchange.
// The new worker waits until all existing Malino windows have closed.
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.add(new Request("/", { cache: "reload" }));
    await Promise.allSettled(CORE.filter(url => url !== "/").map(
      url => cache.add(new Request(url, { cache: "reload" }))
    ));
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key =>
      key.startsWith("malino-pwa-") && key !== CACHE
    ).map(key => caches.delete(key)));
  })());
});

async function readCache(key) {
  try { return await (await caches.open(CACHE)).match(key); }
  catch { return undefined; }
}

async function saveCache(key, response) {
  if (!response.ok || response.status === 206 || response.redirected) return;
  if (/no-store/i.test(response.headers.get("Cache-Control") || "")) return;
  try { await (await caches.open(CACHE)).put(key, response.clone()); }
  catch { /* A full/unavailable cache must not break the online app. */ }
}

async function navigation(request) {
  const url = new URL(request.url);
  const isHome = url.pathname === "/" && !url.search;
  try {
    const response = await fetch(request, { cache: "no-cache" });
    if (isHome && response.ok &&
        (response.headers.get("Content-Type") || "").includes("text/html")) {
      await saveCache("/", response);
    }
    return response;
  } catch {
    if (isHome) {
      const cached = await readCache("/");
      if (cached) return cached;
    }
    return new Response(
      '<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Malino</title><body><h1>Du bist offline</h1><p>Bitte verbinde dich mit dem Internet und versuche es erneut.</p></body></html>',
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

async function asset(request, immutable) {
  if (immutable) {
    const hit = await readCache(request);
    if (hit) return hit;
  }
  try {
    const response = await fetch(request, immutable ? {} : { cache: "no-cache" });
    await saveCache(request, response);
    return response;
  } catch {
    const hit = await readCache(request);
    return hit || Response.error();
  }
}

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  // Partial audio requests, API calls and Next.js RSC data stay network-only.
  if (request.headers.has("range") || url.pathname.startsWith("/api/") ||
      request.headers.has("RSC") || url.searchParams.has("_rsc") ||
      url.pathname === "/sw.js") return;
  if (request.mode === "navigate") {
    event.respondWith(navigation(request));
    return;
  }
  const immutable = url.pathname.startsWith("/_next/static/");
  const staticAsset = ["image", "audio", "video", "font", "style", "script", "manifest"]
    .includes(request.destination) ||
    /\.(?:png|jpe?g|webp|svg|gif|ico|wav|mp3|ogg|m4a|woff2?|ttf|css|js|webmanifest)$/i.test(url.pathname);
  if (immutable || staticAsset) event.respondWith(asset(request, immutable));
});

