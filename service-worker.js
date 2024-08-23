const CACHE_NAME = 'my-pwa-cache-v1';
const URLs_TO_CACHE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/scripts.js',
  '/images/CONOS_2_icon.png',
  '/videos/CONOS_VIDEO_2.mp4'
  // Añade aquí otros recursos que quieras cachear
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLs_TO_CACHE).catch((error) => {
        console.error('Error al agregar recursos a la caché:', error);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((error) => {
      console.error('Error al recuperar el recurso:', error);
    })
  );
});