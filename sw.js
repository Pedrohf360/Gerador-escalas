self.addEventListener('install', function(e) {
    console.log('SW: instalado!', e)
})

self.addEventListener('active', function(e) {
    console.log('SW: ativado!', e)
})

self.addEventListener('fetch', function(e) {
    // if (e.request.url.endsWith('/styles.css')) {
    //     console.log('SW: carregando', e.request.url)
    //     e.respondWith(fetch('/assets/styles2.css'))
    // }
})