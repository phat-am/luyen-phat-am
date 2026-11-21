// Lưu sẵn file của app trên điện thoại để mở nhanh; luôn lấy bản mới nhất khi có mạng.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok) { const c = res.clone(); caches.open('phatam-v1').then(x => x.put(r, c)); }
      return res;
    }).catch(() => caches.match(r, {ignoreSearch: true}))
  );
});
