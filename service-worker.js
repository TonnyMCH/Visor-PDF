const CACHE_NAME = "rosario-cache-v2"; // Cambia el número de versión para forzar la actualización
const urlsToCache = [
  "/index.html",
  "/manifest.json",
  "/icon-192x192.png", // Asegúrate de tener estos archivos en tu proyecto
  "/icon-512x512.png",
];

// Evento de instalación
self.addEventListener("install", event => {
  console.log("[ServiceWorker] Instalando...");

  // Precarga de recursos en caché
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[ServiceWorker] Archivos cacheados");
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de activación
self.addEventListener("activate", event => {
  console.log("[ServiceWorker] Activado");

  // Limpiar cachés antiguas
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log(`[ServiceWorker] Eliminando caché antigua: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Evento de recuperación (fetch)
self.addEventListener("fetch", event => {
  console.log(`[ServiceWorker] Interceptando: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retorna el recurso del caché o realiza una solicitud a la red
      return response || fetch(event.request);
    })
  );
});

// Forzar actualización inmediata
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
