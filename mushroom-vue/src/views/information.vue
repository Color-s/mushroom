<template>
  <div>
    <el-input style="width: 300px;" v-model="input" placeholder="请输入资讯标题" clearable />
    <el-button @click="selectByName" style="margin-left: 10px;" type="primary">搜索</el-button>
  </div>
  <br />
  <div>
    <el-row gutter="10">
      <el-col v-for="(item, index) in data" :key="index" :span="6"  :xs="24">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-area">
          <el-skeleton style="width: 100%" :loading="item.photo == null" animated>
            <template #template>
              <el-skeleton-item variant="image" style="height: 180px" />
            </template>
            <template #default>
              <el-image :preview-src-list="[item.photo]" :initial-index="0" :src="item.photo" class="image" />
            </template>
          </el-skeleton>
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom">
              <time class="time">{{ item.create_time }}</time>
              <el-button @click="showMsgInfo(item)" text class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="信息详情">
      <h3 style="text-align: center;color: black;">标题：{{ msgInfo.title }}</h3>
      <el-row>
        <el-col :span="24">
          详情信息： <p @click="speakText">{{ msgInfo.msg }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" xs="0">
          <el-button @click="stopSpeaking" type="primary" :icon="MuteNotification" round
            style="display:block;margin:0 auto;">🔕静音</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { allInfoApi, searchByTitleApi } from "../api/info";

export default defineComponent({
  name: 'Information',
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

    const input = ref('')
    const currentDate = ref(new Date())
    const data = ref([])

    const loadDataList = () => {
      allInfoApi().then((res) => {
        data.value = res.data.data;
      })
    }

    const dialogVisible = ref(false)
    const msgInfo = ref({
      title: '',
      msg: ''
    })
    const showMsgInfo = (data) => {
      dialogVisible.value = true;
      msgInfo.value = data;
    }

    const selectByName = () => {
      console.log(input.value)

      searchByTitleApi(input.value).then((res) => {
        data.value = res.data.data;
      })
    }

    onMounted(() => {
      loadDataList()
    })

    return {
      data,
      input,
      dialogVisible,
      showMsgInfo,
      msgInfo,
      selectByName
    }
  }
})
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
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
  height: 180px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.card-area {
  margin-top: 10px;
  height: 300px;
  width: 100%;
}

.card-area:hover {
  box-shadow: 4px 4px 5px 1px rgba(188, 139, 139, 0.5) !important;
}
</style>