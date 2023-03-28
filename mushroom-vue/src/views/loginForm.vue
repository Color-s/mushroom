<template>
    <el-form style="margin-top: 90px; width: 500px;" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
        class="loginForm sign-in-form">
        <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" placeholder="输入登录账号..." />
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="输入密码..." />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" class="submit-btn">登录</el-button>
            <el-button @click="resetForm(ruleFormRef)" class="reset-btn">重置</el-button>
        </el-form-item>
        <!-- 找回密码 -->
        <div class="tiparea">
            <p>忘记密码？<a href="">立即找回</a></p>
        </div>
    </el-form>
</template>

<script>
import { ref, defineComponent } from 'vue'
import {loginApi} from '../api/login'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import { searchByNameApi } from '../api/users'

export default defineComponent({
    name: 'LoginForm',
    setup() {
        const router = useRouter()
        const ruleForm = ref({
            username: '',
            password: ''
        })
        const rules = {
            username: [{
                message: "账号不正确...",
                required: true,
                trigger: 'blur',
            }],
            password: [{
                //message: "Pasword could not be empty...",
                message: "密码不能为空...",
                required: true,
                trigger: 'blur',
            }, {
                min: 6,
                max: 30,
                //message: "Pasword's length has to be 6 to 30 characters...",
                message: "密码长度需在6-30个字符之内...",
            }],
        }
        const ruleFormRef = ref()
        //触发登录方法
        const submitForm = (formEl) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    const username = ruleForm.value.username;
                    const password = ruleForm.value.password;
                    searchByNameApi(username).then((resp) => {
                        console.log(resp)
                        if (resp.data.data.length >= 1) {
                            loginApi(username, password).then((res) => {
                                localStorage.setItem('userId', res.data.msg.id);
                                localStorage.setItem('userName', res.data.msg.id);
                                if (res.data.msg.role) {
                                    router.push({path: '/admin'})
                                } else {
                                    router.push({path: '/'})
                                }
                            }).catch((err) => {
                                ElMessage.error(err.response.data.password);
                            })
                        } else {
                            ElMessage.warning("该用户名不存在")
                        }
                    })
                } else {
                    ElMessage.error("检查输入是否存在错误")
                    return false;
                }
            })
        };

        const resetForm = (formEl) => {
            if (!formEl) return
            formEl.resetFields()
        };
        return { 
            ruleFormRef,
            submitForm, 
            resetForm,
            ruleForm, 
            rules
        };
    },
})
</script>


<style scoped>
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
    margin-left: 2%;
    width: 42%;
}

.reset-btn {
    margin-left: 10%;
    width: 42%;
}

.tiparea {
    margin-right: 4%;
    text-align: right;
    font-size: 12px;
    color: #333;
}

.tiparea p a {
    color: #409eff;
}
</style>

