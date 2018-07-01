if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
    .then(registration => {
        console.log(`Registered!! || Scope:  ${registration.scope}`);
    }).catch(error => {
        console.log(`Failed: , error: ${error}`);
    });
} 