<template>
  
  <div class="common-layout">
      <el-container>
          <!-- 导航栏 -->
          <el-header>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                @select="handleSelect"
                  >
                  <el-menu-item index="0"><span class="logo"><router-link to="/index">毒菇</router-link><span>.</span></span></el-menu-item>
                  <div class="flex-grow" />
                  <el-menu-item index="AdminUsers">
                    <router-link to="/admin/users">用户管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="AdminAreas">
                    <router-link to="/admin/areas">地区管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="AdminTags">
                    <router-link to="/admin/tags">毒性管理</router-link>
                    </el-menu-item>
                  <el-menu-item index="AdminClassify">
                    <router-link to="/admin/classify">形状管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="AdminMushroom">
                    <router-link to="/admin/mushroom">蘑菇管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="AdminCookbook">
                    <router-link to="/admin/cookbook">烹饪管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="AdminInfo">
                    <router-link to="/admin/info">资讯管理</router-link>
                  </el-menu-item>
                  
                  <el-menu-item index="6">
                    <el-dropdown><el-image src="/img/UserIcon.svg" style="height: 2rem; margin-top: 12px;" />
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
          <div class="main" :style="{ 'height': documentClientHeight + 'px' }" style="overflow-y:scroll">
            <el-main :body-style="siteContentViewHeight" width="100%" height="100%"
								frameborder="0" scrolling="yes">
							  <router-view />
            </el-main>
          </div>
          <el-footer>
            <p align="center">京网安备</p>
          </el-footer>
      </el-container>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
	import {
		useRoute,
		useRouter
	} from 'vue-router'

export default defineComponent({
    name: 'AdminHome',
    setup() {
			const documentClientHeight = ref(0)
			const siteContentViewHeight = ref({})
			const height = ref(0);
			const router = useRouter()
      const isLogin = ref(false)

      const resetDocumentClientHeight = () => {
				documentClientHeight.value = document.documentElement['clientHeight'] - 140;
				window.onresize = () => {
					documentClientHeight.value = document.documentElement['clientHeight'] - 140;
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

      const activeIndex = ref('AdminUsers')

      const handleSelect = (key, keyPath) => {
        localStorage.setItem('activeIndex', key)
      }

      const toStatus = (num) => {
        if (num) {
          router.push({path: '/login'})
        } else {
          isLogin.value = true;
          localStorage.removeItem('userId')
          localStorage.removeItem('userName')
          router.push({path: '/'})
        }
      }

      onMounted(() => {
				resetDocumentClientHeight();
				loadSiteContentViewHeight();
        activeIndex.value = localStorage.getItem('activeIndex')
        if (localStorage.getItem('userId') == null || localStorage.getItem('userId' == '')) {
          isLogin.value = true;
        }
      })

      return {
        activeIndex,
        siteContentViewHeight,
        loadSiteContentViewHeight,
        documentClientHeight,
        handleSelect,
        toStatus,
        isLogin
      }
    }
})
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.logo {
  font-size: 1.5rem;
  color: #333;
  font-weight: bolder;
  float: left;
}

.logo span {
  color: pink;
}

.main {
  padding: 0 5px;
  margin: 10px;
  border-radius: 0 0 20px 20px;
  box-shadow:  -2px 0px 0px 0px #f1f4f5,   /*左边阴影  绿色*/
                2px 0px 0px 0px #f1f4f5,    /*右边阴影  蓝色*/
                0px 4px 0px 0px #f1f4f5;    /*下边阴影  黄色*/
}
</style>