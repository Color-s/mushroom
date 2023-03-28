<template>
  <div class="common-layout">
    <el-container>
      <!-- 导航栏 -->
      <el-header>
        <el-menu style="width: 100%; height: 100%;" @select="handleSelect" :default-active="activeIndex"
          mode="horizontal" :ellipsis="false">
          <el-menu-item index="0"><span @click="toAdmin" class="logoTop">毒菇<span>.</span></span></el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">
            <router-link to="/index">主页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/toadstool">毒菇</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/edible-mushroom">食菇</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/information">资讯</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link to="/about">关于</router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <el-dropdown><el-image src="/img/UserIcon.svg" style="height: 2rem; margin-top: 24px;bottom: 12px;" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="isLogin == true">
                    <el-button @click="toStatus(1)" type="primary">登录</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item v-else>
                    <el-button @click="toStatus(0)" type="danger">注销</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-menu-item>

        </el-menu>
      </el-header>

      <!-- 主体 -->
      <el-col :xs="24" class="" :style="{ 'height': documentClientHeight + 'px' }" style="overflow-y:scroll;">
        <el-main :body-style="siteContentViewHeight" width="100%" height="100%" frameborder="0" scrolling="yes">
          <router-view />
        </el-main>
      </el-col>
      <!-- footer -->
      <el-footer>
        <el-row>
          <el-col style="text-align: center;">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=14042502000115"
              style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
              <p style="height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
                <img src="/beianimage.png" />晋公网安备14042502000115号
              </p>
            </a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a target="_blank" href="https://beian.miit.gov.cn/"
              style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
              <p style="height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
                晋ICP备2021013740号</p>
            </a>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script >
import { reject } from "lodash";
import { defineComponent, onMounted, ref } from "vue";
import {
  useRoute,
  useRouter
} from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { infoTop } from "../api/info";
export default defineComponent({
  name: 'Home',
  setup() {
    const documentClientHeight = ref(0)
    const siteContentViewHeight = ref({})
    const height = ref(0);
    const router = useRouter()


    const isLogin = ref(false)
    // 设置屏幕显示区域的高度
    const resetDocumentClientHeight = () => {
      documentClientHeight.value = document.documentElement['clientHeight'] - 100;
      window.onresize = () => {
        documentClientHeight.value = document.documentElement['clientHeight'] - 120;
        loadSiteContentViewHeight();
      };
    }

    const loadSiteContentViewHeight = () => {
      height.value = documentClientHeight.value - 50 - 30 - 2;
      let h = height.value;
      siteContentViewHeight.value = {
        minHeight: h + 'px'
      };
    }

    const activeIndex = ref('1')

    const handleSelect = (key, keyPath) => {
      localStorage.setItem('activeIndex', key)
    }

    const toStatus = (num) => {
      if (num) {
        router.push({ path: '/login' })
      } else {
        isLogin.value = true;
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        router.push({ path: '/' })
        ElMessage.success('已退出')
      }
    }

    const toAdmin = () => {
      if (!isLogin.value) {
        router.push({ path: '/admin/users' })
      } else {
        ElMessage.warning('请登录后访问')
      }
    }

    const loadDatalist = () => {
      infoTop().then((res) => {
        var data = res.data.data[0];
        ElNotification({
          title: data.title,
          message: data.msg,
          duration: 0
        })
      })
    }

    onMounted(() => {
      resetDocumentClientHeight();
      loadSiteContentViewHeight();
      activeIndex.value = localStorage.getItem('activeIndex')
      if (localStorage.getItem('userId') == null || localStorage.getItem('userId' == '')) {
        isLogin.value = true;
      }
      loadDatalist()
    })

    return {
      activeIndex,
      siteContentViewHeight,
      loadSiteContentViewHeight,
      documentClientHeight,
      handleSelect,
      toStatus,
      isLogin,
      toAdmin
    }
  }
})
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.el-menu-item {
  width: 5vw;
}

.logoTop {
  font-size: 1.5rem;
  color: #333;
  font-weight: bolder;
  float: left;
}

.logoTop span {
  color: pink;
}

.main {
  padding: 0 5px;
  margin: 10px;
  border-radius: 0 0 20px 20px;
  box-shadow: -2px 0px 0px 0px #f1f4f5,
    /*左边阴影  绿色*/
    2px 0px 0px 0px #f1f4f5,
    /*右边阴影  蓝色*/
    0px 4px 0px 0px #f1f4f5;
  /*下边阴影  黄色*/
}

.el-sub-menu__title {
  color: white !important;
}

.el-menu-item-group>ul {
  padding-left: 20px !important;
}

.el-sub-menu__title:hover {
  background-color: #545c64 !important;
}

.el-menu .el-menu-item-group {
  height: 50px;
}

.el-menu .el-menu-item-group:hover {
  background-color: #545c64;
}

.el-menu .el-menu-item-group {
  padding-left: 20px !important;
}

.el-menu .el-menu-item-group ul .icon-svg {
  vertical-align: middle;
}

.el-menu .el-menu-item-group ul span {
  display: inline-block;

}
</style>