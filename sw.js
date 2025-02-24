const cacheName = 'cache-v7'
const resourcesToPrecache = [
  '/sw_test/',
  '/sw_test/index.html',
  '/sw_test/css/styles.css',
  '/sw_test/js/main.js'
]

self.addEventListener('install', event => {
  console.log('Install event!')

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToPrecache)
      })
      .catch(error => {
        console.log('Error caching files:', error)
      })
  )
})

self.addEventListener('activate', event => {
  console.log('Activate event!')
  event.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys
      .filter(key => key !== cacheName)
      .map(key => caches.delete(key))
    )
  }))
})

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url)

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request)
      })
  )
})

self.addEventListener('message', event => {
  if (event.data.type === 'SKIP_WAITING') {
    return self.skipWaiting();
  }
});
