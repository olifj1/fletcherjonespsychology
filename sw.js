// Retired service worker. Earlier versions of the site cached files for offline/app use.
// This version clears those caches and removes itself so visitors always get the live site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach(c => c.navigate(c.url));
  })());
});
