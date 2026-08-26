const CACHE="malino-pwa-v18-8";
const CORE=["/sounds/premium-reward-fanfare.wav","/sounds/premium-chest-open.wav","/reward-chest-premium.png","/","/manifest.webmanifest","/icon-192.png","/icon-512.png","/apple-touch-icon.png","/malino-hero-mascot.png","/malino-hero-background.png","/sounds/click.wav","/sounds/color.wav","/sounds/success.wav","/sounds/stars.wav","/sounds/reward.wav","/sounds/streak.wav","/sounds/chest-creak.wav","/sounds/reward-boom.wav","/sounds/reward-fanfare.wav"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put("/",cp)).catch(()=>{});return r}).catch(()=>caches.match("/")));return}
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===self.location.origin){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{})}return r})))
});