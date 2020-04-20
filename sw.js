var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    './assets/img/whatsfood.png',
    './controller/PedidoController.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');

            // return cache.addAll(urlsToCache);
        })
    );
});





self.addEventListener('push', function(event) {
    // console.log('[Service Worker] Push Received.');
    response = JSON.parse(event.data.text());
    console.log(response)
    titulo = response.notification.title;
    msg = response.notification.body;
    img = response.notification.icon;

    //console.log(`[Service Worker] Push had this data: "${msg}"`);

    const title = `${titulo}`;
    const options = {
        body: `${msg}`,
        icon: `${img}`,
        "vibrate": [200, 100, 200, 100, 200, 100, 400],
        badge: './assets/img/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));


});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://weslleymendes.com.br/whatsFood')
    );
});