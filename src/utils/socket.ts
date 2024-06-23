// WebSocket类对象
class WebSocketCli {
    // 构造函数
    constructor(url: string, opts = {}) {
        this.url = url
        this.ws = null
        this.opts = {
            heartbeatInterval: 30000, // 默认30秒
            reconnectInterval: 5000, // 默认5秒
            maxReconnectAttempts: 5, // 默认尝试重连5次
            ...opts,
        }
        this.heartbeatInterval = 30000
        this.reconnectAttempts = 0
        this.listeners = {}
        this.init()
    }

    // 链接地址
    url: string
    // websocket实例
    ws: WebSocket | null
    // websocket配置：配置心跳和重连等信息
    opts: any
    // 重新连接次数：默认5次
    reconnectAttempts: number
    // 时间监听对象数组：可以为一个事件绑定多个监听事件
    listeners: any
    // 心跳链接间隔
    heartbeatInterval: any

    // 初始化ws对象
    init() {
        this.ws = new WebSocket(this.url)
        this.ws.onopen = this.onOpen.bind(this)
        this.ws.onmessage = this.onMessage.bind(this)
        this.ws.onerror = this.onError.bind(this)
        this.ws.onclose = this.onClose.bind(this)
    }

    // websocket链接建立
    onOpen(event) {
        console.log('WebSocket opened:', event)
        this.reconnectAttempts = 0 // 重置重连次数
        // 发送心跳链接
        // this.startHeartbeat()
        this.emit('open', event)
    }

    // websocket收到消息
    onMessage(event) {
        console.log('WebSocket message received:', event.data)
        this.emit('message', event.data)
    }

    // websocket错误
    onError(event) {
        console.error('WebSocket error:', event)
        this.emit('error', event)
    }

    // websocket关闭
    onClose(event) {
        console.log('WebSocket closed:', event)
        // 停止心跳链接
        // this.stopHeartbeat()
        this.emit('close', event)
        // 最大5次重连
        if (this.reconnectAttempts < this.opts.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++
                this.init()
            }, this.opts.reconnectInterval)
        }
    }

    // 发送心跳
    startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.ws.send('ping') // 可以修改为你的心跳消息格式
            }
        }, this.opts.heartbeatInterval)
    }

    // 停止心跳
    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = null
        }
    }

    // 发送消息
    send(data) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(data)
        } else {
            console.error('WebSocket is not open. Cannot send:', data)
        }
    }

    // 注册某个消息事件，并添加回调函数
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        // 将回调函数放进事件数组中
        this.listeners[event].push(callback)
    }

    // 取消某个消息：如果存在回调函数就只移除这个回调事件，不存在就清空所有
    off(event, callback?) {
        if (!this.listeners[event]) return
        const index = callback && this.listeners[event].indexOf(callback)
        if (callback && index !== -1) {
            this.listeners[event].splice(index, 1)
        } else {
            console.log('移除所有事件: ', event)
            this.listeners[event] = []
        }
    }

    // 接收到消息后，通过这个函数执行所有回调函数
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((callback) => callback(data))
        }
    }
}

// 导出对象
export default WebSocketCli
