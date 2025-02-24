const paragraph = document.createElement("p")
paragraph.textContent =  "Text from javascript"
document.body.appendChild(paragraph)

if ("serviceWorker" in navigator) {
  // Register SW on load
  window.addEventListener("load", () => {
    // Registering our SW
    navigator.serviceWorker
      .register("/sw_test/sw.js")
      .then(registration => {
        console.log("Service worker registered 😎", registration)

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          console.log('New service worker found', newWorker)

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              const updatePrompt = confirm('New version available! Click OK to update.');
              if (updatePrompt) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          })
        })
      })
      .catch((error) => console.log('Registration failed 😭:', error))
  })

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}