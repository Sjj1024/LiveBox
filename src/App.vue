<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { invoke } from '@tauri-apps/api/tauri'
import { ref } from 'vue'
import { DPlayerImp, LiveInfo } from '@/types'
import Logo from '@/assets/logo.png'
import pako from 'pako'
import WebSocket from 'tauri-plugin-websocket-api'
import { ConnectionConfig } from 'tauri-plugin-websocket-api'
import { douyin } from '@/proto/dy.js'
import { ElMessage } from 'element-plus'
import DPlayer from 'dplayer'
import Hls from 'hls.js'
import Flv from 'flv.js'
// 必须使用Uint8Array解析数据，不然解析不出来

// 直播间地址
const inputUrl = ref('')
const dialogVisible = ref(false)
const messageList = ref([
    {
        id: '1',
        name: '1024小神',
        msg: '欢迎使用直播盒子，输入直播地址开始安静看直播。',
    },
])

// 主播信息
const liveInfo = ref({
    uid: '888888',
    status: 0, // 直播间状态4是已结束
    title: '直播标题',
    name: 'Livebox',
    roomId: '888888',
    avatar: Logo,
    fans: 0,
    customer: 0,
    totalCustomer: 0,
    signature: '',
})

// 推送流地址
const pushUrl = ref('')

// 开始监听
const startListen = async () => {
    const url = inputUrl.value.trim()
    console.log('直播间地址:', url)
    if (url) {
        // 根据直播间地址获取roomid等字段
        const roomJson: LiveInfo = await invoke('get_live_html', { url })
        console.log('获取到的直播房间信息:', roomJson)
        // roomInfo
        const roomInfo = JSON.parse(roomJson.room_info)
        console.log('roomInfo----', roomInfo)
        // 获取主播的头像昵称粉丝数等信息
        if (roomInfo.owner) {
            ElMessage.success('open live success!')
            liveInfo.value = {
                uid: roomInfo.owner.id_str,
                status: roomInfo.status,
                title: roomInfo.title,
                name: roomInfo.owner.nickname,
                roomId: roomInfo.id_str,
                avatar: roomInfo.owner.avatar_thumb.url_list[0],
                fans: 0,
                customer: roomInfo.user_count_str,
                totalCustomer: roomInfo.stats.total_user_str,
                signature: 'roomInfo.signature',
            }
            // 加载直播视频
            let videoUrl = roomInfo.stream_url.hls_pull_url_map.HD1.replace(
                'http://',
                'https://'
            )
            loadLive(videoUrl)
        } else {
            console.log('没有获取到')
            ElMessage.error('open live error')
        }
    }
}

// 创建websokcet
const creatSokcet = async () => {
    console.log('创建连接')
}

// 直播播放器
let dplayer: DPlayerImp | null = null
// 加载直播视频
const loadLive = (videoUrl: string) => {
    // 根据不同的视频加载不同的播放器
    console.log('加载的videlurl', videoUrl)
    if (videoUrl.includes('m3u8')) {
        dplayer = new DPlayer({
            container: document.getElementById(`dplayer`),
            screenshot: false,
            video: {
                url: '',
                type: 'customHls',
                customType: {
                    customHls: function (video: any, _: any) {
                        const hls = new Hls() //实例化Hls  用于解析m3u8
                        hls.loadSource(videoUrl)
                        hls.attachMedia(video)
                    },
                },
            },
        })
    } else if (videoUrl.includes('mp4')) {
        dplayer = new DPlayer({
            container: document.getElementById(`dplayer`),
            screenshot: false,
            fullScreen: false,
            lang: 'zh-cn', // zh-cn // en
            video: {
                url: videoUrl,
                type: 'mp4',
            },
        })
    } else if (videoUrl.includes('flv')) {
        dplayer = new DPlayer({
            container: document.getElementById(`dplayer`),
            screenshot: false,
            video: {
                url: videoUrl,
                type: 'customFlv',
                customType: {
                    customFlv: function (video: any, _: any) {
                        const flvPlayer = Flv.createPlayer({
                            type: 'flv',
                            url: videoUrl,
                        })
                        flvPlayer.attachMediaElement(video)
                        flvPlayer.load()
                    },
                },
            },
        })
    }
    // 立即播放视频
    dplayer?.play()
}

// 页面初始化
// onMounted(() => {

// })
</script>

<template>
    <div class="container">
        <!-- 顶部输入直播间地址 -->
        <div class="liveUrl">
            <input
                class="urlInput"
                v-model="inputUrl"
                placeholder="请输入直播间地址"
            />
            <el-button type="primary" class="startListen" @click="startListen">
                开始采集
            </el-button>
        </div>
        <!-- 下面直播间:左侧直播，右侧评论 -->
        <div class="liveBox">
            <!-- 视频播放容器 -->
            <div class="liveVideo">
                <!-- 主播头像信息：固定位置 -->
                <div class="ownerBox">
                    <!-- 头像 -->
                    <img :src="liveInfo.avatar" alt="头像" class="avatar" />
                    <div class="nickBox">
                        <span class="nickName">{{ liveInfo.name }}</span>
                        <span class="fans">
                            {{ liveInfo.totalCustomer }}本场点赞
                        </span>
                    </div>
                </div>
                <!-- 右侧本场点赞等信息 -->
                <div class="likeInfo">
                    <div class="title"></div>
                </div>
                <!-- 视频播放器 -->
                <div id="dplayer" class="dplayer"></div>
            </div>
            <div class="liveMeg">
                <div
                    v-for="u in messageList"
                    :key="u.id + u.msg"
                    class="msgBox"
                >
                    <div class="msg">
                        <span class="name">{{ u.name }}：</span>
                        <span class="msg">{{ u.msg }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 设置推流地址 -->
        <el-icon :size="20" class="pushUrl" @click="dialogVisible = true">
            <Setting />
        </el-icon>
    </div>
    <!-- 设置推流地址 -->
    <el-dialog
        v-model="dialogVisible"
        title="设置推送地址"
        center
        :show-close="false"
        width="500"
    >
        <div class="setBox">
            <el-input v-model="pushUrl" placeholder="请输入推送地址" />
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
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    .liveUrl {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 100%;

        .urlInput {
            width: 50%;
            height: 36px;
            border-radius: 10px;
            padding-left: 16px;
            font-size: 15px;
            letter-spacing: 0.15px;
            border: none;
            outline: none;
            color: black;
            font-family: 'Montserrat', sans-serif;
            background-color: #ecf0f3;
            transition: 0.25s ease;
            box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #d1d9e6;

            &:focus {
                box-shadow: inset 4px 4px 4px #d1d9e6,
                    inset -4px -4px 4px #e1e5ec;
            }
        }

        .startListen {
            margin-left: 16px;
            box-shadow: 0 0 6px 2px #bfc7d4;
        }
    }

    .liveBox {
        flex: 1;
        display: flex;
        width: 100%;
        height: 90%;
        padding: 20px 20px 0 20px;
        flex-direction: row;
        justify-content: center;
        .liveVideo {
            position: relative;
            width: 72%;
            height: 100%;
            border-radius: 10px;
            background-image: url('@/assets/images/liveBg.webp');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 10px 2px gray;

            .ownerBox {
                position: absolute;
                top: 10px;
                left: 10px;
                height: 40px;
                display: flex;
                flex-direction: row;
                align-items: center;
                background-color: #0000008b;
                padding: 10px 4px;
                border-radius: 20px;

                .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-right: 5px;
                    z-index: 999;
                }

                .nickBox {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    margin-right: 10px;
                    z-index: 999;

                    .nickName {
                        font-size: 14px;
                        color: white;
                    }

                    .fans {
                        font-size: 11px;
                        color: #ccc;
                    }
                }
            }

            .dplayer {
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }
        }

        .liveMeg {
            flex: 1;
            margin-left: 10px;
            background-color: #252632;
            border-radius: 10px;
            box-shadow: 0 0 10px 2px gray;
            scrollbar-color: #363741 transparent;
            scrollbar-width: thin;
            overflow: scroll;

            .msgBox {
                display: flex;
                flex-direction: row;
                padding: 5px;
                white-space: wrap;

                .name {
                    color: #8ce7ff;
                    margin-right: 2px;
                    white-space: nowrap;
                }

                .msg {
                    color: white;
                    white-space: wrap;
                }
            }
        }
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
