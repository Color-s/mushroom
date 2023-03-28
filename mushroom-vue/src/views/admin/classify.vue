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
import {searchByNameApi, searchByIdApi, addClassifyApi, updateClassifyApi, deleteById, allClassifyApi} from '../../api/classify'

export default defineComponent({
    name: 'Classify',
    setup() {
      const inputname = ref('')
        const tableData = ref()
        const editShow = ref(false)
        const form = ref({
          id: '',
          username: '',
          color: '',
          desc: ''
        })

        const formInit = () => {
          form.value.id = ''
          form.value.name = '';
          form.value.color = '';
          form.value.desc = '';
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

        const loadDataList = () => {
          allClassifyApi().then((res) => {
            tableData.value = res.data.data;
            for (var i = 0; i < tableData.value.length; i++) {
              tableData.value[i].desc = tableData.value[i].description;
            }
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
            form.value.desc = res.data.data[0].description;
          })
        }

        const handleUpdate = () => {
          updateClassifyApi(form.value).then((res) => {
            if (res.data.row) {
              ElMessage.success('操作成功')
              loadDataList();
            } else {
              ElMessage.error('操作失败，请联系管理员')
            }
            editShow.value = false;
          })
          formInit();
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
          addClassifyApi(form.value).then((res) => {
            if (res.data.row) {
              ElMessage.success('操作成功')
              editShow.value = false;
              loadDataList()
            } else {
              ElMessage.error('操作失败，请联系管理员')
            }
          })
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
          predefineColors
        }
    }
})
</script>

<style>

</style>