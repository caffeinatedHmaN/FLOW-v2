self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('flow-v1').then(c =>
      fetch(e.request).then(r => {
        c.put(e.request, r.clone());
        return r;
      }).catch(() => c.match(e.request))
    )
  );
});
