import WebSocket from 'tauri-plugin-websocket-api'
import { ConnectionConfig } from 'tauri-plugin-websocket-api'

// WebSocket类对象
class WebSocketCli {
    // 链接地址
    url: string
    // websocket实例
    ws: WebSocket | null
    // websocket配置：配置心跳和重连等信息
    opts: ConnectionConfig
    // 时间监听对象数组：可以为一个事件绑定多个监听事件
    listeners: any
    // 是否开启心跳连接
    ping: boolean
    // 心跳链接间隔，默认10秒
    heartbeatInterval: any
    // 心跳定时器
    heartbeatTimer: any
    // 心跳消息：可以自定义
    pingMsg: any

    // 构造函数
    constructor(
        url: string,
        opts: ConnectionConfig = {},
        ping: boolean = false,
        pingMsg = 'ping'
    ) {
        this.url = url
        this.ws = null
        this.opts = opts
        this.heartbeatInterval = 10000
        this.listeners = {}
        this.ping = ping
        this.pingMsg = pingMsg
        this.init()
    }

    // 初始化ws对象
    async init() {
        try {
            this.ws = await WebSocket.connect(this.url).then((w) => {
                // 成功建立连接
                this.onOpen()
                return w
            })
            // 是否开启心跳
            this.ping && this.startHeartbeat()
            // 监听接收消息
            this.ws?.addListener(this.onMessage)
        } catch (e) {
            // 发送错误信息
            this.onMessage(e)
        }
    }

    // websocket链接建立:可注册多个回调函数
    onOpen() {
        console.log('WebSocket opened:')
        this.emit('open', 'open')
    }

    // websocket收到消息:可注册多个回调函数
    onMessage(event: any) {
        console.log('WebSocket message received:', event.data)
        this.emit('message', event.data)
    }

    // websocket关闭:可注册多个回调函数
    onClose(event) {
        console.log('WebSocket closed:', event)
        // 停止心跳
        this.ping && clearInterval(this.heartbeatTimer)
        // 断开连接
        this.ws?.disconnect()
        this.emit('close', event)
    }

    // 发送心跳
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            // 其实心跳主要是发送的消息内容是啥，所以传递一个心跳消息内容即可
            this.ws?.send(this.pingMsg)
        }, this.heartbeatInterval)
    }

    // 发送消息
    send(data) {
        console.error('WebSocket is not open. Cannot send:', data)
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
