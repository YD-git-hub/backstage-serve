<template>
  <div id="Pers">
    <el-card class="box-card">
      <div class="text item">管理员信息</div>
      <div class="text item">管理员ID:{{id}}</div>
      <div class="text item">账号: {{account}}</div>
      <div class="text item">用户组: {{userGroup}}</div>
      <div class="text item">创建时间: {{ctime}}</div>
      <div class="text item">管理员头像: <img :src="imgUrl" alt="" style="width:100px;hieght:100px"> </div>
      <div class="text item">
        上传头像:
        <div style="border: 1px solid #ccc; width:100px">
           <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uid"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>
       
      </div>
    </el-card>
  </div>
</template>

<script>
import { tinfo } from "@/Api/apis";
import {getCtime} from '@/utils/utils'
export default {
  data() {
    return {
      id: "",
      account: "admin",
      userGroup: "",
      ctime: "",
      imgUrl:"",
      uid:{}
    };
  },
  created() {
    this.Tinfo()
    this.uid={
      id:localStorage.uid
    };
  },
  methods: {
    //数据
    Tinfo(){
      tinfo(localStorage.uid).then((res) => {
      console.log(res.data.accountInfo);
      this.id = res.data.accountInfo.id;
      this.account = res.data.accountInfo.account;
      this.ctime =getCtime(res.data.accountInfo.ctime) ;
      this.imgUrl = res.data.accountInfo.imgUrl;
      this.userGroup = res.data.accountInfo.userGroup;
      })
    }
     ,
    handleAvatarSuccess(res) {
       if(res.code==0){
         this.$bus.$emit("imgfinish");
         this.Tinfo()
       }
    },
  },
};
</script>

<style lang="less" scoped>
#Pers {
  height: 100%;
  background: #fff;
}
.text {
  font-size: 16px;
}

.item {
  margin-bottom: 18px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
.el-avatar--square {
  vertical-align: middle;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  height: 100%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>