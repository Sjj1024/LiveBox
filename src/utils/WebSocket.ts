/**
 * 封装WebSocket客户端
 */
class SocketClient {
    private socket: WebSocket | null = null
    // websocket构造函数
    constructor(wsUrl: string) {
        if ('undefined' != typeof WebSocket) {
            this.socket = new WebSocket(
                'wss://webcast3-ws-web-hl.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.3.0&update_version_code=1.3.0&compress=gzip&internal_ext=internal_src:dim|wss_push_room_id:7384803664436710155|wss_push_did:7384826880221136421|fetch_time:1719414014392|seq:1|wss_info:0-1719414014392-0-0&cursor=t-1719414014392_r-1_d-1_u-1_h-1&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&debug=false&maxCacheMessageNumber=20&endpoint=live_pc&support_wrds=1&im_path=/webcast/im/fetch/&user_unique_id=7384826880221136421&device_platform=web&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/111.0.0.0%20Safari/537.36%20Edg/111.0.1661.62&browser_online=true&tz_name=Asia/Shanghai&identity=audience&room_id=7384803664436710155&heartbeatDuration=0&signature=RQRFEZxcpjl97TDF'
            )
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
