<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { invoke } from '@tauri-apps/api/tauri'
import { ref } from 'vue'
import { LiveInfo } from '@/types'
import pako from 'pako'
import WebSocket from 'tauri-plugin-websocket-api'
import { ConnectionConfig } from 'tauri-plugin-websocket-api'
import { douyin } from '@/proto/dy.js'
// 必须使用Uint8Array解析数据，不然解析不出来

// 直播间地址
const input = ref('')
const dialogVisible = ref(false)
const logTxt = ref('')

// 开始监听
const startListen = async () => {
    const url = input.value.trim()
    console.log('直播间地址:', url)
    if (url) {
        // 根据直播间地址获取roomid等字段
        const roomJson: LiveInfo = await invoke('get_live_html', { url })
        console.log('获取到的直播房间信息:', roomJson)
        // roomInfo
        const roomInfo = JSON.parse(roomJson.room_info)
        console.log('roomInfo----', roomInfo)
        // 传递直播间ID，返回signature字段
        // const res = await invoke('get_signature', { url })
        // const signature = res.signature
        // 传递直播间ID，返回roomId字段
    }
}

// 创建websokcet
const creatSokcet = async () => {
    console.log('创建连接')
}
</script>

<template>
    <div class="container">
        <h1>欢迎使用LiveBox</h1>
        <div class="liveUrl">
            <el-input
                v-model="input"
                style="width: 360px"
                placeholder="请输入直播间地址"
            />
            <el-button type="primary" class="startListen" @click="startListen">
                开始采集
            </el-button>
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
