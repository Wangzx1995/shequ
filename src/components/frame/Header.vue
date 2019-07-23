<template>
  <div class="com-header" :class="{'collapse': collapse}">
    <div class="com-header-right fr">
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
      <div class="header-user-avatar"><img src="./../../assets/img.jpg"></div>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="header-user-name" size="small">
          <span class="el-dropdown-link">
              你好，{{ userName }} <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="clear"></div>
    <div class="header-page-tab">
      <i class="el-icon-d-arrow-left"></i>

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

    <updatePsd v-dialogDrag ref="dlgUpdatePsd"></updatePsd>
  </div>
</template>

<script>
  import { getUserInfo } from '@/utils/auth'
  import bus from '@/components/bus'
  import updatePsd from '@/components/common/dialog/DlgUpdatePass'

  export default {
    data () {
      return {
        collapse: false,
        userName: getUserInfo().account,
        message: 3,
        tagsList: []
      }
    },
    created () {
      this.setTags(this.$route)
      
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', data => {
          this.collapse = data
      })
    },
    watch:{
      $route(newValue, oldValue){
        this.setTags(newValue)
      }
    },
    methods: {
      // 退出登录
      logout () {
        this.$$confirm('确认退出当前系统?', '提示', {
            type: 'warning'
        }).then(() => {
          this.$store.dispatch("logout")
        })
      },
      // 修改密码
      updatePassword: function() {
        this.$refs.dlgUpdatePsd.onOpen()
      },
      // 设置标签
      setTags(route){
        const isExist = this.tagsList.some(item => {
          return item.path === route.fullPath
        })
        if(!isExist){
          if(this.tagsList.length >= 8){
            this.tagsList.shift()
          }
          this.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.matched[1].components.default.name
          })
        }
        
        bus.$emit('tags', this.tagsList)
      },
      // 关闭单个标签
      closeTag (index) {
        const delItem = this.tagsList.splice(index, 1)[0]
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
        if (item) {
            delItem.path === this.$route.fullPath && this.$router.push(item.path)
        }else{
            this.$router.push('/')
        }
      }
    },
    components: {
      updatePsd
    }
  }
</script>