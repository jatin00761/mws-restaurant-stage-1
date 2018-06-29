var CacheName = 'restaurant-review-v1';
const urlsToCache = [
  'index.html',
  'restaurant.html',
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
    caches.open(CacheName).then(function(cache){
      return cache.match(event.request).then(function(response){
          return response || fetch(event.request).then(function(response){
              cache.put(event.request,response.clone());
          });
      });
  })
); 
});