<template>
  <el-button text @click="centerDialogVisible = true" class="ctaa" style="height: 44px;">
    查看毒蝇鹅膏菌
  </el-button>

  <el-dialog v-model="centerDialogVisible" title="🍄毒蝇鹅膏菌延时生长" width="51%" destroy-on-close center>
    <iframe style="height: 399px; width: 600px;"
      src="//player.bilibili.com/player.html?aid=298511030&bvid=BV15F411u71H&cid=587406869&page=1" scrolling="yes"
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
  border: 1px solid rgb(240, 206, 18);
  transform: translateX(8px);
  background-color: orange;
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