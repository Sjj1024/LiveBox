;(function () {
    // 保存原始的 WebSocket 构造函数
    const OriginalWebSocket = window.WebSocket
    // 自定义 WebSocket 构造函数
    window.WebSocket = function (url, protocols) {
        const ws = new OriginalWebSocket(url, protocols)
        // 监听消息事件
        ws.addEventListener('message', (event) => {
            console.log(
                '[Injected Script] WebSocket Message Received:',
                event.data
            )
        })
        return ws
    }
    console.log('[Injected Script] WebSocket wrapper initialized.')
})()
