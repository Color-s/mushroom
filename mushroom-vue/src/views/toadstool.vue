<template>
  <el-row class="top toadstool">
    <el-row class="topImg">
      <el-col :span="2" :xs="0" class="topImg-img">
      </el-col>
      <!-- 毒蝇鹅膏菌 左文字 -->
      <el-col :span="10" :xs="24" class="topImg-text">
        <el-image src="https://cdn.retiehe.com/cached-ed459c467a2bcd60c7f4a70d87f6dfc3/cunchu/img110/logo.png" alt="" style="width: 35px;height: 20px;position: absolute; left:55px;top: 20px;" />
        <h4>Amanita muscaria</h4>
        <h1>毒蝇鹅膏菌</h1>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;属于担子菌纲、伞菌科。子实体伞形，菌盖幼时半球形，后平展开来，表面有黏性，鲜红色至橘红色，上面有白色或黄色鳞片或疣。</p>


        <!-- 引入视频 -->
        <Demo class="bv"></Demo>
      </el-col>
      <!-- 毒蝇鹅膏菌 右图片 -->
      <el-col :span="10" :xs="24" class="topImg-img"
        style="display: flex; justify-content: center; align-items: center;">
        <el-image src="https://cdn.retiehe.com/cached-da065ee467804dbfa11a354c87e28cdf/cunchu/img110/toadstool.jpg" style="width: 100%; min-height: 200px;" />
      </el-col>
      <el-col :span="2" :xs="0" class="topImg-img">

</el-col>
    </el-row>

  </el-row>



  <div style="">
    <h1 style="margin-top: 10px; line-height: 70px; width: 100%;" align="center">毒菇</h1>

    <div class="types">
      <el-row class="mb-4" justify="center">
        <el-button @click="selectColor" type="primary">颜色</el-button>
        <el-button @click="selectClassify" type="success">形状</el-button>
        <el-button @click="selectTags" type="info">毒性</el-button>
        <el-button @click="selectArea" type="warning">分布地区</el-button>
      </el-row>
    </div>

    <div class="stage" style="margin: 30px 0px;">
      <el-row v-show="showColor" class="mb-4" justify="center">
        <el-button v-for="item in colorList" :key="item.id" :label="item.id" @click="showColorInfo(item.id)"
          :color="item.color">
          {{ item.color }}
        </el-button>
      </el-row>
      <el-row v-show="showTag" class="mb-4" justify="center">
        <el-button style="padding: 10px;" v-for="item in tagList" :key="item.id" :label="item.id" @click="showTagInfo(item.id)"
          :color="item.color">
          {{ item.name }}
        </el-button>
      </el-row>
      <el-row v-show="showArea" class="mb-4" justify="center">
        <el-button v-for="item in areaList" :key="item.id" :label="item.id" @click="showAreaInfo(item.id)"
          :color="item.color">
          {{ item.name }}
        </el-button>
      </el-row>
      <el-row v-show="showClassify" class="mb-4" justify="center">
        <el-button v-for="item in classifyList" :key="item.id" :label="item.id" @click="showClassifyInfo(item.id)"
          :color="item.color">
          {{ item.name }}
        </el-button>
      </el-row>
    </div>

    <el-row justify="center">
      <el-col style="margin: 4px;" v-for="item in infoList" :key="item.id" :span="7" :xs="24" :offset="item.id > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px', height: '420px' }">
          <img :src="item.photo" style="height: 300px;" class="image" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom">
              <span class="time">{{ item.description }}</span>
              <el-button type="primary" @click="infomationItem(item)" text class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>


  <el-dialog v-model="dialogVisible" title="详细信息">
    <el-image class="el-img" :preview-src-list="[itemInfo.photo]" :initial-index="0" style="width: 80%"
      :src="itemInfo.photo" />
      <h3 style="text-align: center;color: black;">{{ itemInfo.mushroomName }}</h3>
    <el-row style="text-align: center;">
      <el-col :span="8" :xs="24">
        颜色： <el-tag :color="itemInfo.color">{{ itemInfo.color }}</el-tag>
      </el-col>
      <el-col :span="8" :xs="24">
        形状： {{ itemInfo.classify }}
      </el-col>
      <el-col :span="8" :xs="24">
        毒性： <el-tag size="small">{{ itemInfo.tag }}</el-tag>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        详情信息： <p @click="speakText">{{ itemInfo.description }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" xs="0">
        <el-button @click="stopSpeaking" type="primary" :icon="MuteNotification" round
          style="display:block;margin:0 auto;">🔕静音</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import Demo from "./mushroomVideo.vue";
import { allPoisonColorAndIdApi, allPoisonList, searchPoisonByAreaIdApi, searchPoisonByClassifyIdApi, searchByIdApi, searchByTagIdApi, allPoison } from "../api/mushroom";
import { allTagsApi } from "../api/tags";
import { allClassifyApi } from "../api/classify";
import { allAreasApi } from "../api/areas";
import { mushroomInfoByIdApi } from "../api/mushroomInfo"

export default defineComponent({
  name: 'Toadstool',
  components: { Demo },
  methods: {
    speakText(event) {
      const text = event.target.textContent;
      const msg = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(msg);
    },
    stopSpeaking() {
      speechSynthesis.cancel();
    }
  },
  setup() {
    const golbalProperties = getCurrentInstance().appContext.config.globalProperties;
    const baseUrl = golbalProperties.$baseUrl;
    const topImgUrl = baseUrl + '/poisonousImg/toadstool.jpg';
    const topLogoUrl = baseUrl + '/favicon.ico';
    const dialogVisible = ref(false);

    const checkColor = ref()
    const checkTag = ref()
    const checkClassify = ref()
    const checkArea = ref()

    const colorList = ref([])

    const showInit = () => {
      showArea.value = false;
      showClassify.value = false;
      showColor.value = false;
      showTag.value = false;
    }

    const showColor = ref(false)
    const selectColor = () => {
      showInit()
      infoList.value = [];
      showColor.value = true;
      allPoisonColorAndIdApi().then((res) => {
        colorList.value = res.data.data;
      })
    }
    //毒性查询
    const showTag = ref(false)
    const tagList = ref()
    const selectTags = () => {
      showInit();
      infoList.value = [];
      showTag.value = true;
      allTagsApi().then((res) => {
        tagList.value = res.data.data;
      })
    }
    //形状查询
    const showClassify = ref(false)
    const classifyList = ref()
    const selectClassify = () => {
      showInit()
      infoList.value = [];
      showClassify.value = true;
      allClassifyApi().then((res) => {
        classifyList.value = res.data.data;
      })
    }
    //分布地区查询
    const showArea = ref(false)
    const areaList = ref()
    const selectArea = () => {
      showInit()
      infoList.value = [];
      showArea.value = true;
      allAreasApi().then((res) => {
        areaList.value = res.data.data;
      })
    }

    const infoList = ref([])
    const showColorInfo = (data) => {
      searchByIdApi(data).then((res) => {
        infoList.value = res.data.data;
      })
    }

    const showTagInfo = (data) => {
      searchByTagIdApi(data).then((res) => {
        infoList.value = res.data.data;
      })
    }

    const showClassifyInfo = (data) => {
      searchPoisonByClassifyIdApi(data).then((res) => {
        infoList.value = res.data.data;
      })
    }

    const showAreaInfo = (data) => {
      searchPoisonByAreaIdApi(data).then((res) => {
        infoList.value = res.data.data;
      })
    }

    const itemInfo = ref({
      id: '',
      mushroomName: '',
      color: '',
      description: '',
      area: '',
      tag: '',
      classify: '',
      photo: ''
    })
    const initItemInfo = () => {
      itemInfo.value.id = '';
      itemInfo.value.mushroomName = '';
      itemInfo.value.color = '';
      itemInfo.value.description = '';
      itemInfo.value.area = '';
      itemInfo.value.tag = '';
      itemInfo.value.classify = '';
      itemInfo.value.photo = '';
    }
    const infomationItem = (data) => {
      dialogVisible.value = true;
      mushroomInfoByIdApi(data.id).then((res) => {
        itemInfo.value = res.data.data[0];
      })
    }

    const initData = ref()
    const loadDataList = () => {
      allPoison().then((res) => {
        initData.value = res.data.data;
      })
      allPoisonList().then((res) => {
        infoList.value = res.data.data;
      })
    }

    onMounted(() => {
      loadDataList()
    })

    return {
      topImgUrl, topLogoUrl,
      checkColor,
      checkTag,
      checkArea,
      checkClassify,
      selectColor,
      showColor,
      colorList,
      showTag,
      tagList,
      selectTags,
      showArea,
      areaList,
      selectArea,
      showClassify,
      classifyList,
      selectClassify,
      showColorInfo, infoList,
      showAreaInfo, showClassifyInfo,
      showTagInfo,
      infomationItem,
      dialogVisible,
      itemInfo,
      initData
    }
  }
})
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  list-style: none;
  text-decoration: none;
}

/* 详细信息图片居中 */
.el-img {
  display: block;
  margin: 0 auto;
}

.toadstool {
  width: 100%;
  margin: 0 auto;
  padding: 0;
}


/* 引入元素css */
.topImg {
  height: 470px;
  min-height: 400px;
  background: linear-gradient(245.59deg, #F3993A 0%, #E9BB41 28.53%, #EE781F 75.52%);
  position: relative;
}

.topImg-text {
  padding-top: 8vh;
  padding-left: 3vw;
  padding-right: 2vw;
}

.topImg-text h5 {
  font-size: 14px;
  font-weight: 400;
  color: white;
  margin-bottom: 40px;
}

.topImg-text h1 {
  font-family: 'Permanent Marker', cursive;
  font-size: 80px;
  line-height: 1;
  color: white;
  padding-top: 2vh;
  padding-bottom: 4vh;
}

.topImg-text h4 {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
}

.topImg-text p {
  color: white;
  font-size: 15px;
  line-height: 1.9;
  margin-bottom: 40px;
}

.topImg-text a {
  display: inline-block;
  color: white;
  background: orange;
  border: 1px solid transparent;
  padding: 12px 30px;
  line-height: 1.4;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  text-transform: uppercase;
  transition: all .55s ease;
}

.topImg-text a:hover {
  background: transparent;
  border: 1px solid white;
  transform: translateX(8px);
}

@media screen and (max-width: 768px) {
  /* 特定的样式 */


  .topImg {
    height: 800px;
    min-height: 400px;
    background: linear-gradient(245.59deg, #F3993A 0%, #E9BB41 28.53%, #EE781F 75.52%);
    position: relative;
  }

  .topImg-text {
    padding-top: 8vh;
    padding-left: 3vw;
    padding-right: 2vw;
  }

  .topImg-text h5 {
    font-size: 14px;
    font-weight: 400;
    color: white;
    margin-bottom: 40px;
  }

  .topImg-text h1 {
    font-family: 'Permanent Marker', cursive;
    font-size: 50px;
    line-height: 1;
    color: white;
    padding-top: 2vh;
    padding-bottom: 4vh;
    text-align: center;
  }

  .topImg-text h4 {
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin-bottom: 10px;
    text-align: center;
  }

  .topImg-text p {
    color: white;
    font-size: 15px;
    line-height: 1.9;
    margin-bottom: 40px;
  }

  .topImg-text a {
    display: inline-block;
    color: white;
    background: orange;
    border: 1px solid transparent;
    padding: 12px 30px;
    line-height: 1.4;
    font-size: 14px;
    font-weight: 500;
    border-radius: 30px;
    text-transform: uppercase;
    transition: all .55s ease;
  }

  .topImg-text a:hover {
    background: transparent;
    border: 1px solid white;
    transform: translateX(8px);
  }
}


/* 后面是分类内容 */
.time {
  font-size: 12px;
  color: #999;
  /* 文本超过四行的进行折叠，隐藏为… */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>