var CACHE_NAME = "vue-pwa";
var urlsToCache = ["/", "manifast.json", "/app.js"];

self.addEventListener("install", function(event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
	self.skipWaiting();
});
self.addEventListener("activate", () => {
	self.clients
		.matchAll({
			type: "window"
		})
		.then(clients => {
			for (let client of clients) {
				client.navigate(client.url);
			}
		});
});
self.addEventListener("fetch", e => {
	e.respondWith(
		fetch(e.request).catch(() => {
			return caches.open(CACHE_NAME).then(cache => {
				return cache.match("index.html");
			});
		})
	);
});
