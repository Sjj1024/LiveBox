<script setup lang="ts">
import { creatSignature } from '@/assets/static/vFun'
import { Setting } from '@element-plus/icons-vue'
import { invoke } from '@tauri-apps/api/tauri'
import { ref } from 'vue'
import LiveApi from '@/apis/live'
import pako from 'pako'
import WebSocket from 'tauri-plugin-websocket-api'
import { ConnectionConfig } from 'tauri-plugin-websocket-api'
import { douyin } from '@/proto/dy.js'
// 必须使用Uint8Array解析数据，不然解析不出来

// 直播间地址
const input = ref('')
const dialogVisible = ref(false)
const logTxt = ref(
    'wss://webcast5-ws-web-lf.douyin.com/webcast/im/push/v2/?room_id=7383537257166261018&compress=gzip&version_code=180800&webcast_sdk_version=1.0.14-beta.0&live_id=1&did_rule=3&user_unique_id=7744929113639289632&identity=audience&signature=fZal%2Fy9Hj4RsrEXn&aid=6383&device_platform=web&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F126.0.0.0+Safari%2F537.36+Edg%2F126.0.0.0'
)

// 开始监听
const startListen = async () => {
    // const url = input.value
    // 传递直播间ID，返回signature字段
    // const liveHtml = await LiveApi.get_live_html(input.value)
    // console.log('liveHtml---', liveHtml)
    // const signature = creatSignature('069bd6275204dd05fcf936917710f656')
    // console.log(signature)
    // // 调用rust函数
    const result: string = await invoke('get_live_html', {
        url: input.value,
    })
    console.log('result ', result)
    // input.value = result
    creatSokcet()
    // gzipTest()
}

// 测试gzip解压缩
const gzipTest = () => {
    const data = `hello world`
    const gzipData = pako.gzip(data)
    console.log('gzipData数据是:', gzipData)
    const ungzip = pako.ungzip(gzipData)
    console.log('ungzip数据是:', ungzip)
}

// 创建websokcet
const creatSokcet = async () => {
    const config: ConnectionConfig = {
        headers: {
            cookie: 'ttwid=1%7C9SEGPfK9oK2Ku60vf6jyt7h6JWbBu4N_-kwQdU-SPd8%7C1697721607%7Cc406088cffa073546db29932058720720521571b92ba67ba902a70e5aaffd5d6',
            'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
        },
    }
    const url =
        'wss://webcast5-ws-web-lf.douyin.com/webcast/im/push/v2/?room_id=7383652707992701722&compress=gzip&version_code=180800&webcast_sdk_version=1.0.14-beta.0&live_id=1&did_rule=3&user_unique_id=7988748593295730394&identity=audience&signature=f8p15z9f37JppAI+&aid=6383&device_platform=web&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F126.0.0.0+Safari%2F537.36+Edg%2F126.0.0.0'
    const ws = await WebSocket.connect(url, config)

    ws.addListener((msg) => {
        console.log('msg---', msg.data)
        // 解码PushFrame消息, msg.data是数组类型
        const decodeMsg = douyin.PushFrame.decode(msg.data)
        // gzip解压缩
        console.log('decodeMsg--', decodeMsg)
        console.log('logId--', decodeMsg.logId)
        logTxt.value = decodeMsg.logId
        // 解压缩应该是没问题，
        const gzipData = pako.inflate(decodeMsg.payload)
        console.log('gzipData--', gzipData)
        // Response解码，有问题, 所以要用Response.decode解码也应该是数字类型
        const decodeRes = douyin.Response.decode(gzipData)
        // 遍历 payloadPackage.messagesList
        console.log('decodeRes---', decodeRes)
        // 遍历messagesList
        handleMessage(decodeRes.messagesList)
    })
}

// 遍历消息数组，拿到具体的消息
const handleMessage = (messageList: douyin.Message[]) => {
    messageList.forEach((msg) => {
        // 判断消息类型
        switch (msg.method) {
            // 反对分数
            case 'WebcastMatchAgainstScoreMessage':
                console.log('反对分数')
                break
            // 点赞数
            case 'WebcastLikeMessage':
                console.log('点赞数')
                break
            // 成员进入直播间消息
            case 'WebcastMemberMessage':
                console.log('成员进入直播间消息')
                break
            // 礼物消息
            case 'WebcastGiftMessage':
                console.log('礼物消息')
                break
            // 聊天弹幕消息
            case 'WebcastChatMessage':
                console.log('聊天弹幕消息')
                decodeChat(msg.payload)
                break
            // 联谊会消息
            case 'WebcastSocialMessage':
                console.log('联谊会消息')
                break
            // 更新粉丝票
            case 'WebcastUpdateFanTicketMessage':
                console.log('更新粉丝票')
                break
            // 公共文本消息
            case 'WebcastCommonTextMessage':
                console.log('公共文本消息')
                break
            // 商品改变消息
            case 'WebcastProductChangeMessage':
                console.log('商品改变消息')
                break
            // 待解析方法
            default:
                console.log('待解析方法' + msg.method)
                break
        }
    })
}

// 解析弹幕消息
const decodeChat = (data) => {
    const chatMsg = douyin.ChatMessage.decode(data)
    console.log('chatMsg---', chatMsg)
    // json_format
}

// 解析礼物消息
const decodeGift = (data) => {
    const giftMsg = douyin.GiftMessage.decode(data)
    console.log('giftMsg---', giftMsg)
}
</script>

<template>
    <div class="container">
        <h1>欢迎使用网络直播盒子</h1>
        <div class="liveUrl">
            <el-input
                v-model="input"
                style="width: 360px"
                placeholder="请输入直播地址"
            />
            <el-button type="primary" class="startListen" @click="startListen"
                >开始采集</el-button
            >
        </div>
        <!-- 日志输出 -->
        <div class="logBox">{{ logTxt }}</div>
        <!-- 设置推流地址 -->
        <el-icon :size="20" class="pushUrl" @click="dialogVisible = true">
            <Setting />
        </el-icon>
        <el-dialog
            v-model="dialogVisible"
            title="设置推送地址"
            center
            :show-close="false"
            width="500"
        >
            <div class="setBox">
                <el-input v-model="input" placeholder="请输入推送地址" />
                <div class="tips">
                    *推送的消息会以POST请求的形式发送到该地址，请确保该地址能够接收POST请求
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    .liveUrl {
        display: flex;
        margin-top: 6vh;

        .startListen {
            margin-left: 2vw;
        }
    }

    .logBox {
        padding: 2vh;
        white-space: wrap;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 6vh;
        width: 60vw;
        height: 30vh;
        overflow: scroll;
    }

    .pushUrl {
        position: fixed;
        top: 3vh;
        right: 3vh;
    }
}

.setBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2vh 5vw;

    .tips {
        font-size: small;
        color: #999;
    }
}
</style>
