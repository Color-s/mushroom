<template>
  <div>
    <el-input style="width: 250px" v-model="inputname" placeholder="请输入用户名" clearable></el-input>
    <el-button @click="searchByName" style="margin-left: 30px;" type="primary">搜索</el-button>
    <el-button @click="editShow = true" style="margin-left: 30px;" type="success">添加</el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="200" align="center" header-align="center" />
    <el-table-column prop="name" label="地区名称" width="200" align="center" header-align="center" />
    <el-table-column prop="coordinate" label="坐标" header-align="center" align="center" />
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
      <el-form-item label="地区名称" label-width="80">
        <el-input prop="name" style="width: 250px;" v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="坐标" label-width="80">
        <el-input type="coordinate" v-model="form.coordinate" style="width: 250px;" autocomplete="off" />
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
import {searchByNameApi, searchByIdApi, addAreaApi, updateAreaApi, deleteById, allAreasApi} from '../../api/areas'
export default defineComponent({
    name: 'Areas',
    setup() {
      const inputname = ref('')
        const tableData = ref()
        const editShow = ref(false)
        const form = ref({
          id: '',
          name: '',
          coordinate: ''
        })

        const formInit = () => {
          form.value.id = ''
          form.value.name = '';
          form.value.coordinate = '';
        }

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
          allAreasApi().then((res) => {
            tableData.value = res.data.data;
          })
        }

        const submitForm = () => {
          console.log(form.value.id)
          if (form.value.id == null || form.value.id == '') {
            handleAdd()
          } else {
            handleUpdate();
          }
        }

        const handleEdit = (index, row) => {
          editShow.value = true;
          searchByIdApi(row.id).then((res) => {
            form.value = res.data.data[0]
          })
        }

        const handleUpdate = () => {
          updateAreaApi(form.value).then((res) => {
            console.log(res.data);
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
          addAreaApi(form.value).then((res) => {
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
        }
    }
})
</script>

<style>

</style>