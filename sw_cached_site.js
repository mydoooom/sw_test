const cacheName = "v3"

self.addEventListener('install', (event) => {
  console.log("Service worker installed", event);
})

self.addEventListener('activate', (event) => {
  console.log("Service worker activated", event);

  // Removing old caches that don't match our version name
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cache => {
      if (cache !== cacheName) {
        console.log("Service worker clearing old cache")

        return caches.delete(cache)
      }
    }))
  }))
})

self.addEventListener('fetch', (event) => {
  console.log("Service worker fetching", event)


  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const resClone = response.clone()

        caches.open(cacheName)
          .then((cache) => {
          void cache.put(event.request, resClone)
        })

        return response
      }).catch(() => {
        caches.match(event.request).then(res => { res })
    })
  )
})