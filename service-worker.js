
const CACHE_NAME = "amada-divinidad-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "https://www.pucv.cl/uuaa/site/artic/20170609/imag/foto_0000000220170609125131.jpg",
  "https://juaninos.org.mx/wp-content/uploads/cuadro-de-la-santisima-trinidad.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
