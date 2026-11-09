// Service Worker
const CACHE_NAME = 'bux-portfolio-v14';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('script.google.com') || e.request.url.includes('googleusercontent')) {
    e.respondWith(fetch(e.request));
    return;
  }
});
