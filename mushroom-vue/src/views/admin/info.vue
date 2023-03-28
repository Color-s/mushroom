<template>
  <div>
    <el-input style="width: 250px" v-model="inputname" placeholder="请输入用户名" clearable></el-input>
    <el-button @click="searchByName" style="margin-left: 30px;" type="primary">搜索</el-button>
    <el-button @click="addButton" style="margin-left: 30px;" type="success">添加</el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="200" align="center" header-align="center" />
    <el-table-column prop="title" label="名称" width="200" align="center" header-align="center" />
    <el-table-column :show-overflow-tooltip="true" prop="msg" label="信息" header-align="center" align="center" />
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
        <el-input prop="title" style="width: 250px;" v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图片" label-width="80">
        <el-upload
          class="avatar-uploader"
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
      <el-form-item label="权重" label-width="80">
        <el-input-number v-model="form.weight" :step="1" :min="0" :max="100" />
      </el-form-item>
      <el-form-item label="信息" label-width="80">
        <el-input type="textarea" v-model="form.msg" style="width: 250px;" :placeholder="form.desc"/>
      
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
import {searchByTitleApi, searchByIdApi, addInfoApi, updateInfoApi, deleteById, allInfoApi} from '../../api/info'


export default defineComponent({
    name: 'Info',
    setup() {
        const userId = localStorage.getItem('userId')

        const inputname = ref('')
        const tableData = ref()
        const editShow = ref(false)
        const form = ref({
          id: '',
          photo: '',
          title: '',
          msg: '',
          userId: userId,
          weight: 0
        })


        const formInit = () => {
          form.value.id = ''
          form.value.title = '';
          form.value.msg = '';
          form.value.userId = userId;
          form.value.weight = 0;
          form.value.photo = ''
        }

        const searchByName = () => {
          if (inputname.value == '' || inputname.value == null) {
            loadDataList()
          } else {
            searchByTitleApi(inputname.value).then((res) => {
              tableData.value = res.data.data;
              inputname.value = '';
            })
          }
        }

        const loadDataList = () => {
          allInfoApi().then((res) => {
            tableData.value = res.data.data;
          })
        }

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
            form.value.userId = form.value.user_id;
          })
        }

        const handleUpdate = () => {
          console.log('更新', form.value)
          updateInfoApi(form.value).then((res) => {
            if (res.data.row) {
              ElMessage.success('操作成功')
              editShow.value = false;
              formInit();
              loadDataList();
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
          addInfoApi(form.value).then((res) => {
            if (res.data.row) {
              ElMessage.success('操作成功')
              editShow.value = false;
              loadDataList()
            } else {
              ElMessage.error('操作失败，请联系管理员')
            }
          })
        }

        const beforeImgUpload = (rawFile) => {
          if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('文件格式必须是 JPG 格式!')
            return false
          } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('文件大小不能超过 2MB!')
            return false
          }
          return true
        }//图片上传前检查

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
        }//文件转换为base64

        const addButton = () => {
          formInit()
          editShow.value = true;
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
          beforeImgUpload,
          getFile,
          addButton
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