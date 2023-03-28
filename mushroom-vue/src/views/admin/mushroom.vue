<template>
  <div>
    <el-input style="width: 250px" v-model="inputname" placeholder="请输入用户名" clearable></el-input>
    <el-button @click="searchByName" style="margin-left: 30px;" type="primary">搜索</el-button>
    <el-button @click="editShow = true" style="margin-left: 30px;" type="success">添加</el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="200" align="center" header-align="center" />
    <el-table-column prop="name" label="名称" width="200" align="center" header-align="center" />
    <el-table-column prop="color" label="颜色" header-align="center" align="center" >
     <template #default="scope">
      <el-tag class="ml-2" :color="scope.row.color">{{ scope.row.color }}</el-tag>
    </template>
    </el-table-column>
    <el-table-column prop="photo" label="图片" align="center" header-align="center">
      <template #default="scope">
        <el-image :zoom-rate="1.2" :preview-src-list="[scope.row.photo]" :initial-index="0" :src="scope.row.photo" style="width: 100px; height: 100px;" />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140" header-align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model="editShow" title="编辑信息" style="width: 400px">
    <el-form :model="form">
      <el-form-item v-if="form.id != ''" label="编号" label-width="80">
        <el-input :disabled="form.id != ''" style="width: 250px;" v-model="form.id" />
      </el-form-item>
      <el-form-item label="名称" label-width="80">
        <el-input prop="name" style="width: 250px;" v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="颜色" label-width="80">
        <el-color-picker v-model="form.color" :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="图片" label-width="80">
        <el-upload
          class="avatar-uploader"
          accept="image/jpg,image/jpeg,image.png"
          action="#"
          :show-file-list="false"
          :before-upload="beforeImgUpload"
          :auto-upload="false"
          :on-change="getFile"
          style="width: 50px; height: 50px"
        >
          <img v-if="form.photo" style="width:50px; height: 50px;" :src="form.photo" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签" label-width="80">
        <el-select-v2 style="width: 250px"
          v-model="form.tagId"
          :options="tagOptions"
          placeholder="请选择分布地区"
        />
      </el-form-item>
      <el-form-item label="形状" label-width="80">
        <el-select-v2 style="width: 250px"
          v-model="form.classifyId"
          :options="classifyOptions"
          placeholder="请选择分布地区"
        />
      </el-form-item>
      <el-form-item label="地区" label-width="80">
        <el-select-v2 style="width: 250px"
          v-model="form.areaId"
          :options="areaOptions"
          placeholder="请选择分布地区"
        />
      </el-form-item>
      <el-form-item label="描述" label-width="80">
        <el-input type="textarea" v-model="form.desc" style="width: 250px;" :placeholder="form.desc"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editShow = false">取消</el-button>
        <el-button type="primary" @click="submitForm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import {ElMessage, ElMessageBox} from 'element-plus'
import {searchByNameApi, searchByIdApi, addMushroomApi, updateMushroomApi, deleteById, allMushroomApi} from '../../api/mushroom'
import { allAreasApi } from "../../api/areas";
import { allTagsApi } from "../../api/tags";
import { allClassifyApi } from "../../api/classify";


export default defineComponent({
    name: 'Mushroom',
    setup() {
      const inputname = ref('')
        const tableData = ref()
        const editShow = ref(false)
        const form = ref({
          id: '',
          name: '',
          color: '',
          photo: '',
          desc: '',
          tagId: '',
          classifyId: '',
          areaId: '',
          cookbookId: ''
        })

        const formInit = () => {
          form.value.id = ''
          form.value.name = '';
          form.value.color = '';
          form.value.photo = '';
          form.value.desc = '';
          form.value.tagId = '';
          form.value.classifyId = '';
          form.value.areaId = '';
          form.value.cookbookId = '';
        }

        const predefineColors = ref([
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577',
        ])


        const searchByName = () => {
          if (inputname.value == '' || inputname.value == null) {
            loadDataList()
          } else {
            searchByNameApi(inputname.value).then((res) => {
              tableData.value = res.data.data;
              inputname.value = '';
            })
          }
        }

        //加载后端数据
        const areasList = ref([])
        const tagsList = ref([])
        const classifyList = ref()
        
        const loadDataList = () => {
          allMushroomApi().then((res) => {
            tableData.value = res.data.data;
            for (var i = 0; i < tableData.value.length; i++) {
              tableData.value[i].desc = tableData.value[i].description;
            }
          })
          allAreasApi().then((res) => {
            areasList.value = res.data.data;
            areaOptions.value = Array.from({length: areasList.value.length}).map((_, idx) => ({
              value: `${areasList.value[idx].id}`,
              label: `${areasList.value[idx].name}`,
            }))
          })
          allTagsApi().then((res) => {
            tagsList.value = res.data.data;
            tagOptions.value = Array.from({length: tagsList.value.length}).map((_, idx) => ({
              value: `${tagsList.value[idx].id}`,
              label: `${tagsList.value[idx].name}`,
            }))
          })
          allClassifyApi().then((res) => {
            classifyList.value = res.data.data;
            classifyOptions.value = Array.from({length: classifyList.value.length}).map((_, idx) => ({
              value: `${classifyList.value[idx].id}`,
              label: `${classifyList.value[idx].name}`,
            }))
          })
        }

        const tagOptions = ref()
        const areaOptions = ref()
        const classifyOptions = ref()

        const submitForm = () => {
          if (form.value.id == null || form.value.id == '') {
            handleAdd()
          } else {
            handleUpdate();
          }
        }

        const handleEdit = (index, row) => {
          editShow.value = true;
          searchByIdApi(row.id).then((res) => {
            form.value = res.data.data[0];
            form.value.desc = res.data.data[0].description;
            let tagId = res.data.data[0].tags_id;
            let classifyId = res.data.data[0].classify_id;
            let areaId = res.data.data[0].area_id;
            for (let i = 0; i < tagsList.value.length; i++) {
              if (tagId == tagsList.value[i].id) {
                form.value.tagId = tagsList.value[i].name;
                break;
              }
            }
            for (let i = 0; i < classifyList.value.length; i++) {
              if (classifyId == classifyList.value[i].id) {
                form.value.classifyId = classifyList.value[i].name;
                break;
              }
            }
            for (let i = 0; i < areasList.value.length; i++) {
              if (areaId == areasList.value[i].id) {
                form.value.areaId = areasList.value[i].name;
                break;
              }
            }
          })
          
        }

        const handleUpdate = () => {
          if (form.value.areaId.length != 1) {
            for (let i = 0; i < areasList.value.length; i++) {
              if (form.value.areaId == areasList.value[i].name) {
                form.value.areaId = areasList.value[i].id;
                break;
              }
            }
          }

          if (form.value.classifyId.length != 1) {
            for (let i = 0; i < classifyList.value.length; i++) {
              if (form.value.classifyId == classifyList.value[i].name) {
                form.value.classifyId = classifyList.value[i].id;
                break;
              }
            }
          }

          if (form.value.tagId.length != 1) {
            for (let i = 0; i < tagsList.value.length; i++) {
              if (form.value.tagId == tagsList.value[i].name) {
                form.value.tagId = tagsList.value[i].id;
                break;
              }
            }
          }
          updateMushroomApi(form.value).then((res) => {
            if (res.data.row) {
              ElMessage.success('操作成功')
              editShow.value = false;
              formInit();
              setTimeout(loadDataList(),3000);
            } else {
              ElMessage.error('操作失败，请联系管理员')
            }
          })
        }

        const handleDelete = (index, row) => {
          ElMessageBox.confirm(`确定要删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            console.log('删除', row.id)
            deleteById(row.id).then((res) => {
                if (res.data.row) {
                  ElMessage.success('操作成功')
                  loadDataList()
                } else {
                  ElMessage.error('操作失败，请联系管理员')
                }
            })
          }).catch(() => {

          })
        }

        const handleAdd = () => {
          addMushroomApi(form.value).then((res) => {
            console.log('添加后返回值', res.data);
            if (res.data.row) {
              ElMessage.success('操作成功')
              editShow.value = false;
              setTimeout(loadDataList(),3000);
              formInit();
            } else {
              ElMessage.error('操作失败，请联系管理员')
            }
          })
        }

        const imageUrl = ref()

        const beforeImgUpload = (rawFile) => {
          if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('文件格式必须是 JPG 格式!')
            return false
          } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('文件大小不能超过 2MB!')
            return false
          }
          return true
        }

        const getFile = (file, fileList) => {
          var reader = new FileReader();
          reader.readAsDataURL(file.raw)
          reader.onload = () => {
            form.value.photo = reader.result;
            console.log("form",form)
          }
          reader.onerror = (error) => {
            console.log("imgTo64error",error)
          }
        }


        onMounted(() => {
          loadDataList()
        })

        return {
          inputname,
          searchByName,
          tableData,
          handleEdit,
          handleDelete,
          editShow,
          form,
          submitForm,
          predefineColors,
          imageUrl,
          beforeImgUpload,
          getFile,
          tagOptions,
          areaOptions,
          classifyOptions
        }
    }
})
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 10px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>