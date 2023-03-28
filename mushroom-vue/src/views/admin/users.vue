<template>
  <div>
    <el-input style="width: 250px" v-model="inputname" placeholder="请输入用户名" clearable></el-input>
    <el-button @click="searchByName" style="margin-left: 30px;" type="primary">搜索</el-button>
    <el-button @click="editShow = true" style="margin-left: 30px;" type="success">添加</el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="200" align="center" header-align="center" />
    <el-table-column prop="username" label="用户名" width="200" align="center" header-align="center" />
    <el-table-column prop="tel" label="电话" header-align="center" align="center" />
    <el-table-column prop="email" label="邮箱" header-align="center" align="center" />
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
      <el-form-item label="用户名" label-width="80">
        <el-input prop="username" style="width: 250px;" v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" label-width="80">
        <el-input type="password" v-model="form.password" style="width: 250px;" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" label-width="80">
        <el-input type="tel" v-model="form.tel" style="width: 250px;" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="80">
        <el-input type="email" v-model="form.email" style="width: 250px;" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" style="width: 250px;" label-width="80">
        <el-select v-model="form.role" placeholder="请选择用户角色">
          <el-option label="普通用户" value="0" />
          <el-option label="管理员" value="1" />
        </el-select>
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
import {addUserApi, allUsersApi, deleteById, searchByIdApi, searchByNameApi, updateUserApi} from "../../api/users.js"
import {ElMessage, ElMessageBox} from 'element-plus'

export default defineComponent({
    name: 'Users',
    setup() {
        const inputname = ref('')
        const tableData = ref()
        const editShow = ref(false)
        const form = ref({
          id: '',
          username: '',
          password: '',
          tel: '',
          email: '',
          role: '',
        })

        const formInit = () => {
          form.value.id = ''
          form.value.username = '';
          form.value.password = '';
          form.value.tel = '';
          form.value.email = '';
          form.value.role = '';
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
          allUsersApi().then((res) => {
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
            if (form.value.role) {
              form.value.role = '管理员'
            } else {
              form.value.role = '普通用户'
            }
          })
        }

        const handleUpdate = () => {
          if (form.value.role == '管理员') {
            form.value.role = 1;
          }
          if (form.value.role == '普通用户') {
            form.value.role = 0;
          }

          updateUserApi(form.value).then((res) => {
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
          console.log('添加', form.value)
          if (form.value.role == '0') {
            form.value.role = 0;
          } else {
            form.value.role = 1;
          }
          addUserApi(form.value).then((res) => {
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