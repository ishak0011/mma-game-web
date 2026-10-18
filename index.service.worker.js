// Eski surumlerin onbellegini temizleyen "kendini silen" service worker.
// Onceki web surumleri PWA onbellegi kullaniyordu; bu dosya o onbellegi siler,
// kendini kaldirir ve sayfayi yeniler. Boylece her yayin aninda gorunur.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		for (const key of await caches.keys()) {
			await caches.delete(key);
		}
		await self.registration.unregister();
		const clients = await self.clients.matchAll({ type: 'window' });
		for (const client of clients) {
			client.navigate(client.url);
		}
	})());
});
