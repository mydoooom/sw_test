const paragraph = document.createElement("p")
paragraph.textContent =  "Text from javascript"
document.body.appendChild(paragraph)

if ('serviceWorker' in navigator) {
  let newWorker;
  navigator.serviceWorker.register('/sw_test/sw.js').then(registration => {
    registration.addEventListener('updatefound', () => {
      newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {

        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          const updatePrompt = confirm('New version available! Click OK to update.');
          if (updatePrompt) {
            newWorker.postMessage({ type: 'skipWaiting' })

          }
        }
      });
    });
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}