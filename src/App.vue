<script setup lang="ts">
import { creatSignature } from '@/assets/static/vFun'
import { Setting } from '@element-plus/icons-vue'
import { invoke } from '@tauri-apps/api/tauri'
import { ref } from 'vue'
import LiveApi from '@/apis/live'
import pako from 'pako'
import WebSocket from 'tauri-plugin-websocket-api'
import { ConnectionConfig } from 'tauri-plugin-websocket-api'
import protoRoot from '@/proto/dy.js'
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
    gzipTest()
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
        'wss://webcast5-ws-web-lf.douyin.com/webcast/im/push/v2/?room_id=7383589903612775220&compress=gzip&version_code=180800&webcast_sdk_version=1.0.14-beta.0&live_id=1&did_rule=3&user_unique_id=7915760211825286069&identity=audience&signature=fBoflHwAPnanF3w6&aid=6383&device_platform=web&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F126.0.0.0+Safari%2F537.36+Edg%2F126.0.0.0'
    const ws = await WebSocket.connect(url, config)

    ws.addListener((msg) => {
        console.log('msg---', msg)
        // 解码PushFrame消息
        const decodeMsg = protoRoot.douyin.PushFrame.decode(msg.data)
        // gzip解压缩
        console.log('decodeMsg--', decodeMsg)
        console.log('logId--', decodeMsg.logId)
        const gzipData = pako.ungzip(decodeMsg.payload)
        // Response解码
        // const decodeRes = protoRoot.douyin.Response.decode(gzipData)
        // 遍历 payloadPackage.messagesList
        console.log('decodeRes---', gzipData)
        // logTxt.value = JSON.stringify(msg)
    })
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
        padding: 10vh;
        white-space: pre-wrap;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 6vh;
        width: 60vw;
        height: 30vh;
        overflow-y: scroll;
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
