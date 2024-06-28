/**
 * 封装WebSocket客户端
 */
class SocketClient {
    private socket: WebSocket | null = null
    // websocket构造函数
    constructor(wsUrl: string) {
        if ('undefined' != typeof WebSocket) {
            this.socket = new WebSocket(wsUrl)
            this.socket.binaryType = 'arraybuffer'
        }
    }
    onError(cb: (e: Event) => void) {
        this.socket?.addEventListener('error', cb)
    }
    onMessage(cb: (e: MessageEvent) => void) {
        // console.log('onMessage')
        this.socket?.addEventListener('message', cb)
        // this.socket?.onmessage = cb
    }
    onOpen(cb: () => void) {
        this.socket?.addEventListener('open', cb)
    }
    onClose(cb: (e: CloseEvent) => void) {
        this.socket?.addEventListener('close', cb)
    }
    /**
     * 向服务端发送消息
     * @param data 数据
     */
    send(data: any) {
        this.socket?.send(data)
    }
    ready() {
        return this.socket?.readyState
    }
}

// 导出对象
export default SocketClient
