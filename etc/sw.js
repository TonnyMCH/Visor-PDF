const CACHE = "contador-v1";

const archivos = [
    "./",
    "./Contador.html",
    "./manifest.json"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE)
        .then(cache => cache.addAll(archivos))
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
        .then(resp => resp || fetch(e.request))
    );
});