// Self-unregistering service worker.
// A previous Vite-based project at localhost:3000 may have registered a SW
// that intercepts requests for /assets/*.{js,css} and yields 404s in this
// dev server. This file replaces it and unregisters cleanly on next visit.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      const regs = await self.registration.unregister();
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((c) => c.navigate(c.url));
    })(),
  );
});
