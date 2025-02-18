const paragraph = document.createElement("p")
paragraph.textContent =  "Text from javascript"
document.body.appendChild(paragraph)

if ("serviceWorker" in navigator) {
  // Register SW on load
  window.addEventListener("load", () => {
    // Registering our SW
    navigator.serviceWorker
      .register("/sw_test/sw_cached_site.js")
      .then((registration) => console.log("Service worker registered", registration))
      .catch((error) => console.log(`Service worker error: ${error}`));
  })
}