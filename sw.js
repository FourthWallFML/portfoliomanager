const CACHE_NAME = 'bux-portfolio-v14'; // Verhoog dit nummer bij elke grote update

// Installeer direct en dwing de nieuwe Service Worker om de oude te vervangen
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Neem direct de controle over alle open tabbladen
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Oude caches opschonen
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch logica: haal altijd verse data op voor je API of geef de cache terug waar nodig
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('script.google.com') || e.request.url.includes('query1.finance.yahoo.com')) {
    e.request.cache = 'no-store';
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).catch(() => caches.match('./index.html'));
    })
  );
});
