interface Entry {
    key: string
    value: string
}

/**
 * 封装WebSocket客户端
 */
class Client {
    private socket
    // websocket构造函数
    constructor(wsUrl: string) {
        'undefined' != typeof WebSocket &&
            ((this.socket = new WebSocket(wsUrl)),
            (this.socket.binaryType = 'arraybuffer'))
    }
    onError(cb: (e: Event) => void) {
        this.socket?.addEventListener('error', cb)
    }
    onMessage(cb: (e: MessageEvent) => void) {
        this.socket?.addEventListener('message', cb)
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

/**
 * 抖音弹幕客户端
 */
export class DyClient {
    private client: Client | undefined
    private wsUrl: string
    private pingStarted: boolean = !1
    private pingTimer: any

    public heartbeatDuration: number = 0

    public onOpen: (() => void) | undefined
    public onClose: ((e: CloseEvent) => void) | undefined
    public onError: ((e: Event) => void) | undefined
    public onMessage: ((e: MessageEvent) => void) | undefined

    public accept: ((message: proto.Message) => void) | undefined
    public onOff: ((flag: boolean) => void) | undefined

    constructor() {
        this.client = undefined
        this.wsUrl = ''
    }

    init(wsUrl: string) {
        if (!window.WebSocket) {
            console.log('您的浏览器不支持WebSocket')
            return
        }
        this.wsUrl = wsUrl
        // 创建websocket客户端
        this.client = new Client(wsUrl)
        this.client.onOpen(
            this.onOpen
                ? this.onOpen
                : () => {
                      this.pingStarted = !0
                      this.ping()
                      this.onOff && this.onOff(true)
                  }
        )
        this.client.onClose(
            this.onClose
                ? this.onClose
                : (e: CloseEvent) => {
                      this.pingStarted &&
                          (console.log('socket close ......', e.type),
                          (this.pingStarted = !1))
                      this.onOff && this.onOff(false)
                  }
        )
        this.client.onError(
            this.onError
                ? this.onError
                : (e: Event) => {
                      this.pingStarted = !1
                      console.error('[socket error]: ', e)
                      this.onOff && this.onOff(false)
                  }
        )
    }

    ping() {
        const t = Math.max(1e4, Number(this.heartbeatDuration))
        if (this.client && this.client.ready() === 1) {
            const frame = new proto.PushFrame()
            frame.setPayloadtype('hb')
            this.client.send(frame.serializeBinary())
        }
        this.pingTimer = setInterval(() => {
            this.pingStarted && this.ping()
        }, t)
    }
}

interface Mess {
    id: number
    type: string | undefined
    content: string
    nickname: string
    /**
     * 在线观众
     */
    memberCount: number
    /**
     * 点赞数
     */
    likeCount: number
    /**
     * 主播粉丝数
     */
    followCount: number
    /**
     * 累计观看人数
     */
    totalUserCount: number
    rank: RankItem[]
    gift: Gift
}

interface Gift {
    name: string
    // 礼物数量
    count: number
    url: string
    desc: string
    // 单个价值-抖音币
    diamondCount?: number
    // 可能为重复参数，大于0时为重复的
    repeatEnd?: number
}

/**
 * 送礼点赞榜
 */
interface RankItem {
    nickname: string
    avatar: string
    rank: number
}

/**
 * 处理消息
 * @param message
 */
export const handleMessage = function (message: proto.Message) {
    let method = message.getMethod()
    let data: any
    let chat: Mess = {
        id: 0,
        type: undefined,
        nickname: '',
        content: '',
        memberCount: 0,
        likeCount: 0,
        followCount: 0,
        totalUserCount: 0,
        rank: [],
        gift: {
            name: '',
            count: 0,
            url: '',
            desc: '',
        },
    }
    switch (method) {
        // 进入
        case 'WebcastMemberMessage':
            data = proto.MemberMessage.deserializeBinary(message.getPayload())
            // membercount - 直播间人数， user.nickname
            chat.type = 'member'
            chat.nickname = data.getUser().getNickname()
            chat.content = '来了'
            chat.memberCount = data.getMembercount()
            break
        // 关注
        case 'WebcastSocialMessage':
            data = proto.SocialMessage.deserializeBinary(message.getPayload())
            chat.type = 'social'
            chat.nickname = data.getUser().getNickname()
            chat.content = '关注了主播'
            chat.followCount = data.getFollowcount()
            break
        // 聊天
        case 'WebcastChatMessage':
            data = proto.ChatMessage.deserializeBinary(message.getPayload())
            chat.type = 'chat'
            chat.nickname = data.getUser().getNickname()
            chat.content = data.getContent()
            break
        // 点赞
        case 'WebcastLikeMessage':
            data = proto.LikeMessage.deserializeBinary(message.getPayload())
            chat.type = 'like'
            chat.nickname = data.getUser().getNickname()
            chat.content = '为主播点赞了'
            chat.likeCount = data.getTotal()
            break
        // 礼物
        case 'WebcastGiftMessage':
            data = proto.GiftMessage.deserializeBinary(message.getPayload())
            chat.type = 'gift'
            // 礼物信息
            // console.log({
            //   username: data.getUser().getNickname(),
            //   msgId: data.getCommon().getMsgid(),
            //   logId: data.getLogid(),
            //   giftName: data.getGift().getName(),
            //   giftId: data.getGiftid(),
            //   repeatEnd: data.getRepeatend(),
            //   isShowMsg: data.getCommon().getIsshowmsg(),
            //   count: data.getRepeatcount(),
            //   describe: data.getCommon().getDescribe(),
            //   commonCreateTime: data.getCommon().getCreatetime()
            // });
            chat.nickname = data.getUser().getNickname()
            chat.content = data.getCommon().getDescribe()
            chat.gift.name = data.getGift().getName()
            chat.gift.desc = data.getGift().getDescribe()
            chat.gift.count = data.getRepeatcount()
            chat.gift.diamondCount = data.getGift().getDiamondcount()
            chat.gift.url = data.getGift().getImage().getUrllistList()[0]
            chat.gift.repeatEnd = data.getRepeatend()
            break
        // 直播间统计
        case 'WebcastRoomUserSeqMessage':
            data = proto.RoomUserSeqMessage.deserializeBinary(
                message.getPayload()
            )
            chat.type = 'room'
            chat.content = ''
            chat.memberCount = data.getTotal()
            chat.totalUserCount = data.getTotaluser()
            let rank = data.getRanksList()
            for (let item of rank) {
                let rankItem: RankItem = {
                    nickname: item.getUser().getNickname(),
                    avatar: item.getUser().getAvatarthumb().getUrllistList()[0],
                    rank: item.getRank(),
                }
                chat.rank.push(rankItem)
            }
            break
    }
    chat.id = data?.getCommon().getMsgid()
    return chat
}
