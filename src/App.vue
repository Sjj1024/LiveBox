<script setup lang="ts">
import { creatSignature } from '@/assets/static/vFun'
import { Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'

// 直播间地址
const input = ref('')

// 开始监听
const startListen = () => {
    // const url = input.value
    const signature = creatSignature('069bd6275204dd05fcf936917710f656')
    console.log(signature)
}

const dialogVisible = ref(false)
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
