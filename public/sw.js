// Minimal service worker to avoid 404

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  // Just fetch normally, no caching
  event.respondWith(fetch(event.request));
});
