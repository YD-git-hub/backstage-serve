<template>
  <div id="Addmark">
    <addtl :ti="'添加账号'"></addtl>
    <div style="width:300px">
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
        <el-form-item label="密码" prop="Pass">
          <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="age">
          <el-select v-model="value" placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import addtl from "@/components/Title";
import {adduser} from "@/Api/apis";

export default {
  data() {
    var validatetext = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        Pass: "",
        text: "",
      },
      rules: {
        text: [{ validator: validatetext, trigger: "blur" }],
        Pass: [{ validator: validatePass, trigger: "blur" }],
      },
      options: [{
          value: '超级管理员',
          label: '超级管理员'
        }, {
          value: '普通管理员',
          label: '普通管理员'
        },],
        value: ''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          adduser(this.ruleForm.text,this.ruleForm.Pass,this.value).then((res)=>{
            if(res.data.code===0)
              alert(res.data.msg)
            else
            alert("添加失败")
          })
        } else {
          alert("操作有误")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {
    addtl,
  },
};
</script>

<style lang="less" scoped>
#Addmark {
  background: #fff;
  padding-bottom: 50px;
//   height: 100%;
}
</style>