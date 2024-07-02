<template>
    <div class="mainBox">
        <div class="title">LiveBox直播管理</div>
        <div class="liveBox">
            <div v-for="(item, index) in 5" :key="index" class="liveItem">
                <img
                    src="https://hadoappusage.oss-cn-shanghai.aliyuncs.com/static/pad_image/blueBg.png"
                    alt="live"
                    class="liveImg"
                    fit="cover"
                    width="100%"
                    height="82%"
                />
                <div class="liveTitle">
                    <span>他家的衣服质量很好</span>
                </div>
                <div class="liveUser">
                    <img
                        src="https://hadoappusage.oss-cn-shanghai.aliyuncs.com/static/pad_image/miniAvatar.jpg"
                        alt="avatar"
                        fit="cover"
                        class="avatar"
                        height="100%"
                    />
                    <span>小美</span>
                </div>
            </div>
        </div>
        <!-- 添加按钮 -->
        <el-icon class="addBtn">
            <CirclePlusFilled class="addIcon" />
        </el-icon>
        <!-- 添加直播 -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CirclePlusFilled } from '@element-plus/icons-vue'

const liveList = ref([
    {
        id: 1,
        name: '直播间',
        url: '',
        status: '',
    },
])
</script>

<style lang="scss" scoped>
.mainBox {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin: 20px 0 20px 0;
    }

    .liveBox {
        flex: 1;
        width: 100%;
        padding: 10px;
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto;
        grid-gap: 10px;
        overflow: hidden;
        .liveItem {
            height: 90%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .liveImg {
                border-radius: 5px;
            }

            .liveTitle {
                height: 20px;
                font-size: 13px;
            }

            .liveUser {
                height: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;

                .avatar {
                    border-radius: 50%;
                }
            }
        }
    }

    .addBtn {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 25px;

        .addIcon {
            color: #18222c;
        }
    }
}
</style>
