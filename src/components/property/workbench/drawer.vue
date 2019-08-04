<template>
    <transition name="slide-fade">
        <div
            class="move"
            v-if="show"
        >
            <div class="main">
                <div class="move-header">
                    <div class="title fl">
                        一幢一单元
                    </div>
                    <div
                        class="backBtn fr"
                        @click="back()"
                    >
                        <i class="ico icon-x-fanhui1"></i>返回工作台
                    </div>
                </div>
                <div class="move-body">
                    <div class="move-list">
                        1
                    </div>
                    <div class="move-tab">
                        2
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            show: false
        };
    },
    methods: {
        open() {
            this.show = !this.show;
        },
        back() {
            this.show = !this.show;
            this.$emit("isHide", "");
        }
    }
};
</script>

<style lang="less" scoped>
.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(3000px);
}
.move {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 894px;
    background: #ffffff;
    overflow: hidden;
    .btn {
        position: absolute;
        left: 0px;
        top: 50%;
        margin-top: -108px;
        .el-button {
            padding: 100px 5px;
            margin: auto 0;
            vertical-align: middle;
        }
    }
    .main {
        margin: 0 24px;
        height: 100%;
        position: relative;
        .move-header {
            height: 28px;
            line-height: 28px;
            padding: 24px 0;
            width: 100%; /*必须沾满宽度防止浮动*/
            float: left; /*必须*/
            .title {
                font-size: 18px;
                font-weight: bold;
            }
            .backBtn {
                color: #21b2c6;
                cursor: pointer;
            }
        }
        .move-body {
            width: 100%;
            position: absolute;
            top: 76px;
            bottom: 20px;
            .move-list {
                float: left;
                width: 448px;
                height: 100%;
                border: 1px solid #e7eaec;
            }
            .move-tab {
                float: right;
                border: 1px solid #e7eaec;
                height: 100%;
                width: calc(100% - 466px);
            }
        }
    }
}
</style>

