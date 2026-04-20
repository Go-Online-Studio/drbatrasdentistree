const CACHE_VERSION = "drbatra-v1";
const STATIC_CACHE = CACHE_VERSION + "-static";
const RUNTIME_CACHE = CACHE_VERSION + "-runtime";

const STATIC_ASSETS = [
  "/drbatrasdentistree/",
  "/drbatrasdentistree/index.html",
  "/drbatrasdentistree/css/style.css",
  "/drbatrasdentistree/css/responsive.css",
  "/drbatrasdentistree/js/critical.js",
  "/drbatrasdentistree/js/script.js",
  "/drbatrasdentistree/js/lazy-loader.js",
  "/drbatrasdentistree/js/performance-optimizer.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  if (req.destination === "document") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("/drbatrasdentistree/index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const clone = res.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, clone));
        return res;
      });
    })
  );
});
