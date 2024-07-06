import WebSocket from 'tauri-plugin-websocket-api'
import { ConnectionConfig } from 'tauri-plugin-websocket-api'

// WebSocket类对象
class SocketCli {
    // 链接地址
    url: string
    // websocket实例
    ws: WebSocket | null
    // websocket配置：配置心跳和重连等信息
    opts: ConnectionConfig
    // 收到消息的回调函数：不能在这个对象中注册onMessage，因为这个onMessage需要传递给WebSocket实例，但是这里webscoket示例是rust里面生成的，注册进去之后，onMessage就不能使用this对象了
    callBack: (msg: any) => void
    // 时间监听对象数组：可以为一个事件绑定多个监听事件
    listeners: any
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
        callBack: (msg: any) => void,
        pingMsg: any = ''
    ) {
        this.url = url
        this.ws = null
        this.opts = opts
        this.callBack = callBack
        this.heartbeatInterval = 10000
        this.listeners = {}
        this.pingMsg = pingMsg
        this.init()
    }

    // 初始化ws对象
    async init() {
        try {
            this.ws = await WebSocket.connect(this.url, this.opts).then((w) => {
                // 成功建立连接
                this.onOpen()
                return w
            })
            // 是否开启心跳
            this.pingMsg && this.startHeartbeat()
            // 监听接收消息
            this.ws?.addListener(this.callBack)
        } catch (e) {
            // 发送错误信息
            console.log('WebSocket connection failed:', e)
        }
    }

    // websocket链接建立
    onOpen() {
        console.log('WebSocket opened:')
    }

    // 发送心跳
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            // 其实心跳主要是发送的消息内容是啥，所以传递一个心跳消息内容即可
            // console.log('发送心跳信息:', this.pingMsg)
            this.ws?.send([...this.pingMsg])
        }, this.heartbeatInterval)
    }

    // 发送消息
    send(data: any) {
        // console.log('WebSocket is send:', data)
        this.ws?.send([...data])
    }

    // 注册某个消息事件，并添加回调函数:可注册多个回调函数
    on(event: string, callback: () => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        // 将回调函数放进事件数组中
        this.listeners[event].push(callback)
    }

    // 断开连接
    disconnect() {
        if (this.ws) {
            this.ws.disconnect()
        }
    }
}

// 导出对象
export default SocketCli
