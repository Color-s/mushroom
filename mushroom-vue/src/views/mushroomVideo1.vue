<template>
  <el-button text @click="centerDialogVisible = true" class="ctaa" style="height: 44px;">
    查看法国黑松露
  </el-button>

  <el-dialog v-model="centerDialogVisible" title="法国黑松露的分析" width="51%" destroy-on-close center>
    <iframe style="height: 399px; width: 600px;"
      src="//player.bilibili.com/player.html?aid=379815775&bvid=BV1NZ4y1R7w9&cid=460066308&page=1" scrolling="yes"
      border="0" frameborder="yes" framespacing="0" allowfullscreen="true"> </iframe>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>
<style scoped>
.el-button.ctaa {
  display: inline-block;
  color: white;
  background: #4d9559;
  border: 1px solid transparent;
  padding: 12px 30px;
  line-height: 1.4;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  text-transform: uppercase;
  transition: all .55s ease;
}

.el-button.ctaa:hover {
  background: transparent;
  border: 1px solid rgb(28, 156, 39);
  transform: translateX(8px);
  background-color: #4d9559;
}

.el-button.ctaa {
  background: transparent;
  border: 1px solid white;
  margin-left: 20px;
}

@media screen and (max-width: 768px) {
  .el-button.ctaa {
    background: transparent;
    border: 1px solid white;
    margin-left: 25vw;
  }
}


.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>