let CacheName = 'restaurant-review-1';
const urlsToCache = [
  '/index.html',
  '/register-sw.js',
  '/restaurant.html',
  '/js',
  '/img',
  '/data',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CacheName)
        .then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate',function(event){
  console.log('Activated!!');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });