<template>
    <div class="login">
        <van-nav-bar title='用户登录' left-text='返回' left-arrow @click-left='goBack' />
        <div class="register-panel">
            <van-field v-model="userName" label='用户名' icon='clear' placeholder='请输入用户名' required @click-icon='userName=""' :error-message='userNameErrorMsg'/>
            <van-field v-model="password" label='密码' type='password' placeholder='请输入密码' required  :error-message='passwordErrorMsg'/>
            <div class="register-button">
                <van-button size='large' type='primary' @click="loginAction" :loading="openLoading">马上登录</van-button>
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
  created(){
    if (localStorage.userInfo) {
      Toast.success('你已经登录过了')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosLoginUser() {
      this.openLoading = true;
      this.$axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.userName };
              setTimeout(() => {
                resolve();
              }, 500);
              Toast.success("登录成功");
            })
              .then(() => {
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.openLoading = false;
          Toast.fail("登录失败");
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
    loginAction() {
      this.checkForm() && this.axiosLoginUser();
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

