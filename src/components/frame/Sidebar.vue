<template>
  <div class="com-sidebar" :class="{'collapse': collapse}">
    <!-- logo -->
    <!-- <a href="/" class="com-logo"></a> -->
    <router-link to="/" class="com-logo">
      <!-- <img src="./../../assets/logo.png" alt=""/> -->
    </router-link>
    <!-- collapse -->
    <div class="sidebar-collapse">
      <i class="el-icon-s-fold" @click="toggleCollapse"></i>
    </div>
    <!-- menu -->
    <div class="com-left-menu">
      <el-menu
        :unique-opened="true"
        :default-active="onRoutes"
        background-color="#2b343d"
        text-color="#a8abae"
        active-text-color="#fff"
        :collapse="collapse"
        router
      >
        <template v-for="(item, index) in menu">
          <el-submenu :index="`${index}`" :key="index" v-if="item.meta">
            <template slot="title">
              <i :class="item.iconClz" />
              <span class="ele-p-title">{{ item.meta && item.meta.title }}</span>
            </template>
            <el-menu-item
              class="ele-s-title"
              :index="item.path + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.path"
              v-if="!subitem.hiddenMenu"
            >
              <i class="icon-x-dot" />
              {{ subitem.meta && subitem.meta.title }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path + item.children[0].path">
            <i :class="item.children[0].iconClz" />
            <span
              slot="title"
              class="ele-p-title"
            >{{ item.children[0].meta && item.children[0].meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import bus from "@/components/bus";
export default {
  data() {
    return {
      collapse: false,
      menu: []
    };
  },
  created() {
    this.$router.options.routes.forEach(r => {
      if (r.path == `${this.$route.matched[0].path}/`) {
        this.menu.push(r)
      }
    })
  },
  methods: {

    // 侧边栏折叠
    toggleCollapse() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse)
    }
  },
  components: {},
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  }
};
</script>