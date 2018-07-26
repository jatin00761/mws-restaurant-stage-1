var filesToCache = [
  '/css/style.min.css',
  '/css/media.min.css',
  '/index.html',
  'manifest.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/register-sw.js',
  'sw.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

var staticCacheName = 'static-cache-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(staticCacheName)
      .then(function(cache) {
          return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
      caches.match(event.request).then(function(response){
          if(response) return response;
          
          return fetch(event.request).then(function(response){
              return caches.open(staticCacheName).then(function (cache) {
                  cache.put(event.request.url, response.clone());
                  return response;
              })
          })
      }).catch(function(error){
          return new Response('Offline: Page unvisited!');
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});