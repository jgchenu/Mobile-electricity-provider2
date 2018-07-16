<template>
    <div class="register">
        <van-nav-bar title='用户注册' left-text='返回' left-arrow @click-left='goBack' />
        <div class="register-panel">
            <van-field v-model="userName" label='用户名' icon='clear' placeholder='请输入用户名' required @click-icon='userName=""' />
            <van-field v-model="password" label='密码' type='password' placeholder='请输入密码' required  />
            <div class="register-button">
                <van-button size='large' type='primary' @click="axiosRegisterUser">马上注册</van-button>
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
      password: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosRegisterUser() {
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
          } else {
            console.log(res.data.message);
            Toast.fail("注册失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
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

