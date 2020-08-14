<template>
  <div id="Modi">
      <moditl :ti="'修改密码'"></moditl>
    <div style="width:300px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <el-form-item label="原密码" prop="ypass">
          <el-input type="password" v-model="ruleForm.ypass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import moditl from "../../components/Title";
// import {ldpwd} from "@/Api/apis"
import {ldpwd,newPwd} from "@/Api/apis"
export default {
  components: {
    moditl,
  },
  data() {
    //原密码
      var validateyPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          ldpwd(value,localStorage.uid).then((res)=>{
            if(res.data.code===0){
          this.yflag=true
          }else{
          callback(new Error(res.data.msg));
          this.yflag=false
          }
          })
          
        }
      };
    //新密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
          this.xflag=false
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          this.xflag=true
        }
      };
    //原确认密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次确认新密码'));
          this.qflag=false
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
          this.qflag=false
        } else {
          this.qflag=true
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          ypass: ''
        },
        yflag:false,
        xflag:false,
        qflag:false,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          ypass: [
            { validator: validateyPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        if(!(this.xflag&this.yflag&this.qflag)){
          this.$refs[formName].validate()
            return false;
        }else{
          newPwd(this.ruleForm.pass,localStorage.uid).then((res)=>{
            if(res.data.code===0)
            alert(res.data.msg)
            else
            alert(res.data.msg)
          })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style lang="less" scoped>
#Modi {
  background-color: #fff;
  padding-bottom: 50px;
}
</style>