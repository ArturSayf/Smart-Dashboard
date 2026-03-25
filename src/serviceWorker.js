const CACHE_NAME = 'smart-dashboard-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/src/main.js',
    '/src/core/router.js',
    '/src/core/uiContainer.js',
    '/src/core/dataService.js',
    '/src/modules/notes/notes.js',
    '/src/modules/notes/notesUI.js',
    '/src/modules/dailyData/dailyData.js',
    '/src/modules/dailyData/dailyDataUI.js',
    '/src/modules/statistics/statistics.js',
    '/src/modules/statistics/statisticsUI.js',
    '/src/styles/reset.css',
    '/src/styles/variables.css',
    '/src/styles/main.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});