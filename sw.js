const CACHE_NAME = 'golf-caddie-v1';
const urlsToCache = [
  '/index.html',
  '/manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com'
];

// Installation - cachea viktiga filer
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache öppnad');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Aktivering - rensa gamla cachers
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Raderar gammal cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Network First för API, Cache First för assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Alltid försök hämta väderdata från nätverket
  if (url.hostname === 'api.openweathermap.org') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response(JSON.stringify({
            wind: { speed: 5, deg: 180 },
            main: { temp: 15 }
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }
  
  // Cache First strategi för övriga resurser
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          // Cacha bara GET-förfrågningar
          if (event.request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Returnera offline-sida vid behov
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
