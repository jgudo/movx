workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.routing.registerRoute(
  /https:\/\/api\.themoviedb\.org\/3/,
  new workbox.strategies.NetworkFirst({
    cacheName: "movx_v2",
    navigateFallback: '/index.html',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
);

addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting();
   }
  
});