if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
}

require('zone.js/dist/zone');