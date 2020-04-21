self.addEventListener('install', function(e) {
    console.log('SW: instalado!', e)
    caches.open('pwa-v1.1')
        .then(cache => {
            cache.add('/index.html');
        });

    caches.has('pwa-v1.1').then(function(res) {
        if (res)
            console.log('cache existe')
        else
            console.log('cache não existe')
    })
})

self.addEventListener('active', function(e) {
    console.log('SW: ativado!', e)
})

self.addEventListener('fetch', function(event) {
    let resposta = caches.open('pwa-v1.1')
        .then(cache => {
            return cache.match(event.request).then(recurso => {
                if (recurso) {
                    console.log(`Servindo ${event.request.url} do cache`);
                    return recurso;
                }
                console.log(`Servindo ${event.request.url} da web`);
                return fetch(event.request)
                    .then(recurso => {
                        cache.put(event.request, recurso.clone());
                        return recurso;
                    });
            });
        });

    event.respondWith(resposta);
})