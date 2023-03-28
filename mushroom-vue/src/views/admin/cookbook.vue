<template>
  <div>
    <el-input style="width: 250px" v-model="inputname" placeholder="请输入用户名" clearable></el-input>
    <el-button @click="searchByName" style="margin-left: 30px;" type="primary">搜索</el-button>
    <el-button @click="editShow = true" style="margin-left: 30px;" type="success">添加</el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="200" align="center" header-align="center" />
    <el-table-column prop="name" label="名称" width="200" align="center" header-align="center" />
    <el-table-column prop="type" label="类型" header-align="center" align="center" />
    <el-table-column prop="desc" label="做法" header-align="center" align="center" />
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
      <el-form-item label="类型" label-width="80">
        <el-select style="width: 250px" v-model="form.type" class="m-2" placeholder="请选择" >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
      <el-form-item label="蘑菇" label-width="80">
        <el-select-v2 style="width: 250px"
          v-model="form.mushroomId"
          :options="mushroomOptions"
          placeholder="请选择蘑菇"
        />
      </el-form-item>
      <el-form-item label="做法" label-width="80">
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
import {searchByNameApi, searchByIdApi, addCookbookApi, updateCookbookApi, deleteById, allCookbookApi} from '../../api/cookbook'
import { allMListApi } from "../../api/mushroom";

export default defineComponent({
    name: 'Cookbook',
    setup() {
      const inputname = ref('')
        const tableData = ref()
        const editShow = ref(false)
        const form = ref({
          id: '',
          name: '',
          type: '',
          desc: '',
          mushroomId: ''
        })

        const typeOptions = ref([
            {
              value: '煎',
              label: '煎',
            },
            {
              value: '炒',
              label: '炒',
            },
            {
              value: '烹',
              label: '烹',
            },
            {
              value: '炸',
              label: '炸',
            },
            {
              value: '焖',
              label: '焖',
            },
            {
              value: '熬',
              label: '熬',
            },
            {
              value: '炖',
              label: '炖',
            },
          ])

        const formInit = () => {
          form.value.id = ''
          form.value.name = '';
          form.value.type = '';
          form.value.desc = '';
          form.value.mushroomId = '';
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

        const mushroomOptions = ref()
        const loadDataList = () => {
          allCookbookApi().then((res) => {
            tableData.value = res.data.data;
            for (var i = 0; i < tableData.value.length; i++) {
              tableData.value[i].desc = tableData.value[i].description;
            }
          })
          allMListApi().then((res) => {
            mushroomOptions.value = Array.from({length: res.data.data.length}).map((_, idx) => ({
              value: `${res.data.data[idx].id}`,
              label: `${res.data.data[idx].name}`,
            }))
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
            form.value.mushroomId = res.data.data[0].mushroom_id;
            for (let i = 0; i < mushroomOptions.value.length; i++) {
              if (form.value.mushroomId == mushroomOptions.value[i].value) {
                form.value.mushroomId = mushroomOptions.value[i].label
                break;
              }
            }
          })
        }

        const handleUpdate = () => {
          updateCookbookApi(form.value).then((res) => {
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
          addCookbookApi(form.value).then((res) => {
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
          typeOptions,
          mushroomOptions
        }
    }
})
</script>

<style>

</style>