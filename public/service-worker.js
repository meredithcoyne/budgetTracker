const FILES_TO_CACHE = [`/db.js`, `/index.js`, `/index.html`, `/styles.css`, `/manifest.webmanifest`, `/icons/money.png`];

const STATIC_CACHE = `static-cache-v1`;
const RUNTIME_CACHE = `runtime-cache`;

// TODO: add listener and handler to retrieve static assets from the Cache Storage in the browser 
// install
self.addEventListener(`install`, e => {
    e.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

    
self.addEventListener(`activate`, e => {
    const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
    e.waitUntil(
        caches
            .keys()
            .then(cacheNames => 
                cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
            ) .then (deleteCaches => 
                Promise.all(
                    deleteCaches.map(deleteCaches => caches.delete(deleteCaches))
            )
        ) .then(() => self.clients.claim())
    );
});

