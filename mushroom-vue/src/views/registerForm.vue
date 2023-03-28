<template>
    <el-form style="margin-top: -90px;" ref="registerForm" :model="registerUser" :rules="registerRules" label-width="100px"
        class="registerForm sign-up-form">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="registerUser.username" placeholder="输入用户名..."></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
            <el-input v-model="registerUser.tel" placeholder="输入电话..."></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="输入邮箱..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerUser.password" type="password" placeholder="输入密码..."></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
            <el-input v-model="registerUser.password2" type="password" placeholder="再次输入密码..."></el-input>
        </el-form-item>

        <el-form-item label="选择身份">
            <el-select v-model="registerUser.role" placeholder="请选择身份">
                <el-option label="管理员" value="1"></el-option>
                <el-option label="游客" value="0"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button @click="submitFormRegister(registerForm)" type="primary" class="submit-btn">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { ElMessage } from 'element-plus';
import { defineComponent, ref } from 'vue'
import { addUserApi, searchByNameApi } from '../api/users';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RegisterForm',
    setup() {
        const router = useRouter()

        const registerUser = ref({
            username: "",
            email: "",
            password: "",
            password2: "",
            role: ""
        })

        const validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== registerUser.value.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        const registerRules = {
            username: [
                {
                    message: "用户名不能为空...",
                    required: true,
                    trigger: "blur",
                },
                {
                    min: 2,
                    max: 30,
                    message: "长度在2到30个字符",
                    trigger: "blur",
                },
            ],
            email: [
                {
                    type: "email",
                    message: "邮箱格式错误",
                    required: true,
                    trigger: "blur",
                },
            ],
            tel: [
                { required: true, message: '请输入您的电话', trigger: 'blur' },
                { min: 11, max: 11, message: '长度必须为11位', trigger: 'blur' },
            ],
            password: [
                {
                    required: true,
                    message: "密码不能为空",
                    trigger: "blur",
                },
                {
                    min: 6,
                    max: 30,
                    message: "密码长度必须是6-20位",
                    trigger: "blur",
                },
            ],
            password2: [
                {
                    required: true,
                    message: "确认密码不能为空",
                    trigger: "blur",
                },
                {
                    min: 6,
                    max: 30,
                    message: "密码长度必须是6-20位",
                    trigger: "blur",
                },
                { validator: validatePass2, trigger: "blur" },
            ]
        }
        const registerForm = ref()
        //触发注册方法
        const submitFormRegister = (formEl) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    searchByNameApi(registerUser.value.username).then((res) => {
                        if (res.data.data.length > 0) {
                            ElMessage.warning('该用户名已近存在');
                        } else {
                            ElMessage.info('可以注册');
                            addUserApi(registerUser.value).then((res) => {
                                if (res.data.row) {
                                    ElMessage.success("注册成功，请登录")
                                    router.go(0)
                                } else {
                                    ElMessage.error("信息异常，请重新注册或联系管理员")
                                }
                            })
                        }
                    })
                    
                } else {
                    console.log("提交错误！！");
                    return false;
                }
            })
        };

        return { registerForm, submitFormRegister, registerUser, registerRules };
    },
});
</script>
