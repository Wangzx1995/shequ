<template>
    <div class="index-container">
        <!-- hearder -->
        <div class="index-header">
            <!-- logo -->
            <span class="index-logo"></span>
            <!-- right info -->
            <div class="com-header-right">
                <!-- 消息中心 -->
                <div class="header-btn-bell">
                    <el-badge :is-dot="!!message">
                    <el-tooltip effect="dark" :content="message ? `有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                        <i class="ico icon-x-bell"></i>
                        </router-link>
                    </el-tooltip>
                    </el-badge>
                </div>
                <!-- 帮助 -->
                <div class="header-btn-help">
                    <el-tooltip effect="dark" content="有什么可以帮助你的吗？" placement="bottom">
                        <i class="ico icon-x-question"></i>
                    </el-tooltip>
                </div>
                <!-- 分割线 -->
                <div class="header-divider"></div>
                <!-- 用户头像 -->
                <div class="header-user-avatar"><img src="./../assets/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="header-user-name" size="small">
                    <span class="el-dropdown-link">
                        {{ userName }} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="updatePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- content -->
        <div class="index-content">
            <div class="router">
                <div class="router-box1">
                    <router-link to="/console/index" class="link1"><i class="el-icon-star-off"></i>指挥中心系统</router-link>
                </div>
                <div class="router-box2">
                    <router-link to="/security/index" class="link1"><i class="el-icon-star-off"></i>智慧安防系统</router-link>
                    <router-link to="/property/workbench-index" class="link2"><i class="el-icon-star-off"></i>智慧物业系统</router-link>
                </div>
                <div class="router-box3">
                    <router-link to="/security/index" class="link1"><i class="el-icon-star-off"></i>大数据分析系统</router-link>
                    <router-link to="/system/CommunityInfo-index" class="link2"><i class="el-icon-star-off"></i>平台配置系统</router-link>
                </div>
            </div>
            <div class="right-bar">
                <dl>
                    <dt>
                        <i class="el-icon-star-off"></i>关联系统
                    </dt>
                    <dd>
                        <a href="javascript:void(0);">
                            <span>海康管理平台</span>
                            <i class="el-icon-right"></i>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:void(0);">
                            <span>大华管理平台</span>
                            <i class="el-icon-right"></i>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:void(0);">
                            <span>新门海管理系统</span>
                            <i class="el-icon-right"></i>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:void(0);">
                            <span>叙简管理平台</span>
                            <i class="el-icon-right"></i>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:void(0);">
                            <span>智慧租房系统</span>
                            <i class="el-icon-right"></i>
                        </a>
                    </dd>
                </dl>
            </div>
        </div>
        <!-- copyright -->
        <p class="index-copyright">copyright © {{ year }}浙江微风智能科技有限公司 版权所有</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    },
    created() {},
    methods: {}
};
</script>
<style lang="less" scoped>
    .index-container {
        position: fixed;
        width: 100%;
        height: 100%;
        background: url('/static/images/index-bg.png') no-repeat center;
        background-size: cover;
        background-attachment: fixed;
        overflow: hidden;
        overflow-y: auto;
    }
    .index-header {
        height: 110px;
        background: rgba(0, 0, 0, .1);
        display: flex;
        justify-content: space-between;
    }
    .index-logo {
        width: 495px;
        background: url(/static/images/index-logo.png) no-repeat center;
    }
    .com-header-right * {
        color: #fff !important;
    }
    .index-content {
        padding: 90px 0;
        width: 1280px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .index-content .router {
        display: flex;
        color: #fff;
        text-align: center;
    }
    .index-content .router a {
        color: #fff;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .index-content .router a i {
        margin-bottom: 50px;
        font-size: 100px;
    }
    .router-box1 {
        width: 320px;
        font-size: 36px;
    }
    .router-box1 .link1 {
        height: 100%;
        background: rgba(148, 219, 243, .36);
    }
    .router-box2 {
        width: 390px;
        margin: 0 15px;
        font-size: 36px;
    }
    .router-box2 a,.router-box3 a {
        display: block;
    }
    .router-box2 .link1 {
        height: 405px;
        margin-bottom: 15px;
        background: rgba(27, 176, 219, .56);
    }
    .router-box2 .link2 {
        height: 250px;
        background: rgba(47, 199, 232, .8);
    }
    .router-box3 {
        width: 240px;
        font-size: 24px;
    }
    .router-box3 .link1 {
        height: 275px;
        margin-bottom: 15px;
        background: rgba(47, 199, 232, .36);
    }
    .router-box3 .link2 {
        height: 380px;
        background: rgba(47, 199, 232, .5);
    }
    .index-content .right-bar {
        box-sizing: border-box;
        width: 268px;
        padding: 30px 25px;
        background: rgba(0, 0, 0, .2);
        border-radius: 4px;
    }
    .index-content .right-bar i {
        margin-right: 8px;
    }
    .index-content .right-bar dt {
        color: #fff;
        font-size: 24px;
    }
    .index-content .right-bar dd a {
        display: flex;
        height: 45px;
        line-height: 14px;
        padding-top: 44px;
        font-size: 20px;
        color: #ffd954;
        border-bottom: 1px solid rgba(255, 255, 255, .25);
        justify-content: space-between;
    }
    .index-copyright {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 25px;
        font-size: 14px;
        font-family: simsun;
        text-align: center;
        color: #fff;
    }
</style>
