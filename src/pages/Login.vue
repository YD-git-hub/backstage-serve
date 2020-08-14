<template>
  <div id="Login">
    <div class="Login_div">
      <p>馋食后台系统登录</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="text">
          <el-input type="text" v-model="ruleForm.text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <span class="point_span">{{ruleForm.pointmsg}}</span>
        <el-form-item>
          <el-button type="primary" @click="Btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/Api/apis.js";

export default {
  data() {
    var pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var text = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        text: "",
        pointmsg: "",
      },
      rules: {
        pass: [{ validator: pass, trigger: "blur" }],
        text: [{ validator: text, trigger: "blur" }],
      },
    };
  },
  methods: {
    Btn() {
      // console.log(this.$router)
      login(this.ruleForm.text, this.ruleForm.pass).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          localStorage.token = res.data.token;
          localStorage.roles = res.data.role;
          localStorage.uid = res.data.id;
          localStorage.uesrname = this.ruleForm.text;
          this.$message({
              message: "恭喜你，登录成功,请稍等",
              type: "success",
            });
          window.setTimeout(() => {
            this.$router.push("/Home/Index");
          }, 1000);
        } else this.ruleForm.pointmsg = res.data.msg;
      });
    },
  },
};
</script>

<style lang="less" scoped>
#Login {
  height: 100%;
  background-color: #304156;
  display: flex;
  justify-content: center;
  .Login_div {
    width: 500px;
    height: 300px;
    align-self: center;
    p {
      margin: 30px 0px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 24px;
    }
    .el-form-item__label {
      color: #fff;
    }
    .point_span {
      margin-left: 50px;
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      color: #f56c6c;
      font-size: 16px;
      display: inline-block;
    }
  }
  .demo-ruleForm {
    width: 90%;
  }
  .el-button--primary {
    width: 100%;
  }
  /deep/ label.el-form-item__label {
    color: #fff;
  }
}
</style>