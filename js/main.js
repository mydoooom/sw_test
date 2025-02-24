const paragraph = document.createElement("p")
paragraph.textContent =  "Text from javascript"
document.body.appendChild(paragraph)

if ('serviceWorker' in navigator) {
  let newWorker;

  // Register the service worker
  navigator.serviceWorker.register('/sw_test/sw.js').then(registration => {
    registration.addEventListener('updatefound', () => {
      newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        // When the service worker is installed, show the prompt
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          const updatePrompt = confirm('New version available! Click OK to update.');
          if (updatePrompt) {
            newWorker.postMessage({ type: 'SKIP_WAITING' })
              .then(() => window.location.reload())
              .catch(err => console.error('Error during update:', err));
          }
        }
      });
    });
  });

  // Detect controller change and reload page
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}