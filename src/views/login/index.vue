<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginInfo"
      :rules="rules"
      class="login-form"
    >

      <h3 class="title">Login Form</h3>

      <el-form-item prop="account">
        <el-input v-model="loginInfo.account"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginInfo.password"
        ></el-input>
      </el-form-item>

      <div class="login-btns">
        <el-button
          type="primary"
          @click="handleLogin"
        >提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    loginInfo: {
      account: "",
      password: "",
    },
    rules: {
      account: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [
        { required: true, message: "请输入活动密码", trigger: "blur" },
      ],
    },
    redirect: undefined,
  }),
  created() {
    this.redirect = this.$route.query.redirect;
  },

  methods: {
    handleLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginInfo)
            .then((_) => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch((err) => {
              throw Error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleReset() {
      this.$refs["loginForm"].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  &-container {
    height: 100%;
    background-color: #2d3a4b;

    .title {
      margin-bottom: 40px;
      font-size: 30px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }
  }

  &-form {
    margin: 0 auto;
    padding: 160px 35px 0;
    width: 450px;
  }

  &-btns {
    display: flex;
    justify-content: space-around;
  }
}

.el-input__inner {
  background-color: #ccc;
}
</style>