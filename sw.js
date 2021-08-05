const CACHE_ELEMENTS = [
    './',
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'style.css',
    './components/Contador.js',
    
];

const CACHE_NAME = 'v3_cache_contador_react';

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(Cache => {
        Cache.addAll(CACHE_ELEMENTS).then(() => {
            self.skipWaiting();
        }).catch(console.log);
    })
    )
});

self.addEventListener('activate', (e) => {

    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            //Promise recive un array y resolver las promesas al mismo tiempo.
            return Promise.all(cacheNames.map(cacheName => {
                //comparamos el nombre del cache de cacheWhiteList con cacheName
               return  cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName) 
            }))
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {

    e.respondWith(
        caches.match(e.request).then((res) => (res ? res : fetch(e.request)))
    );
});