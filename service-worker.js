const CACHE_NAME = "centeng-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/css/bootstrap.css",
  "/assets/css/style.css",
  "/assets/img/favicon-32x32.png",
  "/assets/img/favicon-96x96.png",
  "/assets/img/favicon-16x16.png",
  "/android-icon-192x192.png"
];

// Install SW & cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate & clean old cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // fallback offline
        )
      );
    })
  );
});