const paragraph = document.createElement("p")
paragraph.textContent =  "Text from javascript"
document.body.appendChild(paragraph)

if ('serviceWorker' in navigator) {
  // let newWorker;

  // Register the service worker
  // navigator.serviceWorker.register('/sw_test/sw.js').then(registration => {
  //   registration.addEventListener('updatefound', () => {
  //     newWorker = registration.installing;
  //     newWorker.addEventListener('statechange', () => {
  //
  //       if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
  //         const updatePrompt = confirm('New version available! Click OK to update.');
  //         if (updatePrompt) {
  //           newWorker.skipWaiting()
  //             .then(() => window.location.reload())
  //             .catch(err => console.error('Error during update:', err));
  //         }
  //       }
  //     });
  //   });
  // });

  // This code sample uses features introduced in Workbox v6.
  import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-window.prod.mjs';

  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');
    let registration;

    const showSkipWaitingPrompt = async (event) => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener('controlling', () => {
        // At this point, reloading will ensure that the current
        // tab is loaded under the control of the new service worker.
        // Depending on your web app, you may want to auto-save or
        // persist transient state before triggering the reload.
        window.location.reload();
      });

      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.

      // This code assumes your app has a promptForUpdate() method,
      // which returns true if the user wants to update.
      // Implementing this is app-specific; some examples are:
      // https://open-ui.org/components/alert.research or
      // https://open-ui.org/components/toast.research
      const updateAccepted = prompt('New version available! Click OK to update.');

      if (updateAccepted) {
        wb.messageSkipWaiting();
      }
    };

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', (event) => {
      showSkipWaitingPrompt(event);
    });

    wb.register();
  }

  // Detect controller change and reload page
  // let refreshing = false;
  // navigator.serviceWorker.addEventListener('controllerchange', () => {
  //   if (!refreshing) {
  //     refreshing = true;
  //     window.location.reload();
  //   }
  // });
}