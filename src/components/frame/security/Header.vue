<template>
    <div class="com-header">
        <div class="com-header-inner-security">
            <!-- logo -->
            <router-link
                to="/"
                class="com-logo"
            ></router-link>
            <!-- navbar -->
            <el-menu
                class="com-top-menu"
                mode="horizontal"
                background-color="#040430"
                text-color="#fff"
                active-text-color="#f79623"
                router
            >
                <template v-for="(item, index) in menu">
                    <el-submenu
                        :index="`${index}`"
                        :key="index"
                        v-if="item.meta"
                    >
                        <template slot="title">
                            <span class="ele-p-title">{{ item.meta && item.meta.title }}</span>
                        </template>
                        <el-menu-item
                            class="ele-s-title-security"
                            :index="item.path + subitem.path"
                            v-for="subitem in item.children"
                            :key="subitem.path"
                            v-if="!subitem.hiddenMenu"
                        >
                            {{ subitem.meta && subitem.meta.title }}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item
                        v-else
                        :index="item.path + item.children[0].path"
                    >
                        <span
                            slot="title"
                            class="ele-p-title p10"
                        >{{ item.children[0].meta && item.children[0].meta.title }}</span>
                    </el-menu-item>
                </template>
                <!-- <el-menu-item index="1" class="ele-p-title">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <span class="ele-p-title">我的工作台</span>
                    </template>
                    <el-menu-item index="2-1" class="ele-s-title-security">选项1</el-menu-item>
                    <el-menu-item index="2-2" class="ele-s-title-security">选项2</el-menu-item>
                    <el-menu-item index="2-3" class="ele-s-title-security">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3" class="ele-p-title">消息中心</el-menu-item>
                <el-menu-item index="4" class="ele-p-title">订单管理</el-menu-item>
                <el-menu-item index="3" class="ele-p-title">消息中心</el-menu-item>
                <el-menu-item index="4" class="ele-p-title">订单管理</el-menu-item>
                <el-menu-item index="3" class="ele-p-title">消息中心</el-menu-item>
                <el-menu-item index="4" class="ele-p-title">订单管理</el-menu-item> -->
            </el-menu>
            <!-- user -->
            <div class="com-header-right">
                <!-- 帮助 -->
                <div class="header-btn-help">
                    <router-link to="/">
                        <i class="ico icon-x-home"></i>
                    </router-link>
                </div>
                <!-- 消息中心 -->
                <div class="header-btn-bell">
                    <el-badge :is-dot="!!message">
                        <el-tooltip
                            effect="dark"
                            :content="message ? `有${message}条未读消息`:`消息中心`"
                            placement="bottom"
                        >
                            <router-link to="/tabs">
                                <i class="ico icon-x-bell"></i>
                            </router-link>
                        </el-tooltip>
                    </el-badge>
                </div>
                <!-- 分割线 -->
                <div class="header-divider"></div>
                <!-- 用户头像 -->
                <div class="header-user-avatar"><img src="./../../../assets/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown
                    class="header-user-name"
                    size="small"
                >
                    <span class="el-dropdown-link">
                        你好，{{ userName }} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="updatePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item
                            divided
                            @click.native="logout"
                        >退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <!-- tab -->
        <div class="header-page-tab">

            <el-tag
                :key="index"
                v-for="(tag, index) in tagsList"
                closable
                :disable-transitions="false"
                :effect="tag.path === $route.fullPath ? 'light' : 'plain'"
                @close="closeTag(index)"
            >
                <router-link :to="tag.path">
                    {{tag.title}}
                </router-link>
            </el-tag>
        </div>

        <updatePsd
            v-dialogDrag
            ref="dlgUpdatePsd"
        ></updatePsd>
    </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import bus from '@/components/bus'
import updatePsd from '@/components/common/dialog/DlgUpdatePass'

export default {
    data() {
        return {
            userName: getUserInfo().userName.realName,
            message: 3,
            tagsList: [],
            menu: []
        }
    },
    created() {
        this.setTags(this.$route)

        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', data => {
            this.collapse = data
        })

        this.$router.options.routes.forEach(r => {
            if (r.path == `${this.$route.matched[0].path}/`) {
                this.menu.push(r)
            }
        });
    },
    watch: {
        $route(newValue, oldValue) {
            this.setTags(newValue)
        }
    },
    methods: {
        // 退出登录
        logout() {
            this.$$confirm('确认退出当前系统?', '提示', {
                type: 'warning'
            }).then(() => {
                this.$store.dispatch("logout")
            })
        },
        // 修改密码
        updatePassword: function () {
            this.$refs.dlgUpdatePsd.onOpen()
        },
        // 设置标签
        setTags(route) {
            if (!route.meta.hiddenMenu) {
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath
                })
                if (!isExist) {
                    if (this.tagsList.length >= 8) {
                        this.tagsList.shift()
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                }

                bus.$emit('tags', this.tagsList)
            }
        },
        // 关闭单个标签
        closeTag(index) {
            const delItem = this.tagsList.splice(index, 1)[0]
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path)
            } else {
                this.$router.push('/')
            }
        }
    },
    components: {
        updatePsd
    }
}
</script>