const cacheName = 'cache-v2'
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
