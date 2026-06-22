/* ============================================
   AJ FITNESS — Service Worker
   ============================================ */

const CACHE_NAME = 'aj-fitness-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/programs.html',
  '/trainers.html',
  '/contact.html',
  '/timetable.html',
  '/assets/css/style.css',
  '/assets/css/components.css',
  '/assets/css/sections.css',
  '/assets/css/responsive.css',
  '/assets/js/app.js',
  '/assets/js/cms.js',
  '/assets/js/swiper-init.js',
  '/assets/js/whatsapp.js',
  '/assets/js/timetable.js',
  '/assets/js/isotope-init.js',
  '/data/programs.json',
  '/data/trainers.json',
  '/data/timetable.json'
];

// Install — Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — Network first for HTML, cache first for assets
self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.mode === 'navigate') {
    // Network first for pages
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/index.html')))
    );
  } else {
    // Cache first for assets
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok && request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
  }
});
