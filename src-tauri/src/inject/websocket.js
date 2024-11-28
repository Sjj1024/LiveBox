window.addEventListener('DOMContentLoaded', () => {
    if (window.__TAURI__) {
        console.log('Tauri API loaded:', window.__TAURI__.event)
        window.__TAURI__.event.listen('handlepay', (data) => {
            console.log('Received example-event:', data)
        })
    } else {
        console.error('Tauri API not available!')
    }
})
