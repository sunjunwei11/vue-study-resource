<template>
    <div>
        <jd-form :model="userInfo" :rules="rules" ref="loginForm">
            <jd-form-item label="用户名" prop="username">
                <jd-input v-model="userInfo.username" placeholder="请输入用户名"></jd-input>
            </jd-form-item>
            <jd-form-item label="密码" prop="password">
                <jd-input v-model="userInfo.password" placeholder="请输入密码"></jd-input>
            </jd-form-item>
            <!-- 提交按钮 -->
            <jd-form-item>
                <button class="login-button" @click="login">登录</button>
            </jd-form-item>
        </jd-form>

    </div>
</template>

<script>
import JdInput from "./JdInput";
import JdFormItem from "./JdFormItem";
import JdForm from "./JdForm";
export default {
  components: {
    JdInput,
    JdFormItem,
    JdForm
  },
  data() {
    return {
      // 要校验的数据
      userInfo: {
        username: "",
        password: ""
      },
      // 校验的规则
      rules: {
        username: [{required: true, message: '请输入用户名称'}],
        password: [{required: true, message: '请输入密码'}, {type: 'string', min: 6, message: '密码长度不能少于6位'}]
      }
    };
  },
  methods: {
      // 对整个表单进行校验
      login() {
          this.$refs.loginForm.validate((success) => {
              if (success) {
                  alert('校验成功');
              } else {
                  alert('校验失败');
              }
          });
      }
  },
};
</script>

<style lang="scss" scoped>
    .login-button {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        font-size: 14px;
        border-radius: 4px;
        text-align: center;
        padding: 5px 15px;
    }
</style>