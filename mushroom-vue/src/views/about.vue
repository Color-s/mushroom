<template>
  <el-timeline>
    <el-timeline-item v-for="(item, index) in timelineData" center
    :key="index"
    :icon="item.icon"
    :type="item.type"
    :color="item.color"
    :hollow="item.hollow"
     :timestamp="item.timestamp" placement="top">
      <el-card>
        <h4>{{ item.title }}</h4>
        <p>{{ item.content }}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { timelineData } from "../data";

export default defineComponent({
    name: 'About',
    setup() {
        
        const loadDataList = () => {
          console.log(timelineData)
        }
        onMounted(() => {
          loadDataList()
        })

        return {
          timelineData
        }
    }
})
</script>

<style>

</style>