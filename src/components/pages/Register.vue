<template>
    <div class="register">
        <van-nav-bar title='用户注册' left-text='返回' left-arrow @click-left='goBack' />
        <div class="register-panel">
            <van-field v-model="userName" label='用户名' icon='clear' placeholder='请输入用户名' required @click-icon='userName=""' :error-message='userNameErrorMsg'/>
            <van-field v-model="password" label='密码' type='password' placeholder='请输入密码' required  :error-message='passwordErrorMsg'/>
            <div class="register-button">
                <van-button size='large' type='primary' @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import url from "../../serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      password: "",
      openLoading: false, //是否开启用户注册的loading状态
      userNameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "" //当密码出现错误时的提示信息
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosRegisterUser() {
      this.openLoading = true;
      this.$axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            Toast.success(res.data.message);
            this.$router.push("/");
          } else {
            console.log(res.data.message);
            this.openLoading = false;
            Toast.fail("注册失败");
          }
        })
        .catch(err => {
          console.log(err);
          this.openLoading = false;
          Toast.fail("注册失败");
        });
    },
    //表单验证方法
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.userNameErrorMsg = "用户名不能小于5";
        isOk = false;
      } else {
        this.userNameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能小于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    }
  }
};
</script>

<style lang="scss" scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
  .register-button {
    padding-top: 10px;
  }
}
</style>

