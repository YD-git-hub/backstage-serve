<template>
  <div id="Store">
    <titles :ti="'店铺管理'"></titles>
    <div class="Store_p">
      <span>店铺名称</span>
      <el-input placeholder="请输入内容" clearable v-model="name"></el-input>
    </div>
    <!-- bulletin	String	公告
avatar	String	店铺头像
deliveryPrice	int	配送费
deliveryTime	int	送达时间
description	String	描述
score	String	评分
sellCount	int	销量
supports	String	活动
pics	String	店铺图片
date	date	营业时间
minPrice	String	起送价格
    get_URL-->
    <div class="Store_p">
      <span>店铺公告</span>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="bulletin"></el-input>
    </div>
    <div class="Store_p">
      <span>店铺头像</span>
      <el-upload
        class="avatar-uploader"
        :action="IMG_URL_LOAD"
        :show-file-list="false"
        :on-success="Success"
      >
        <img v-if="avatar" :src="St_URL+avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <!-- <div class="Store_p">
      <el-upload
        class="upload-demo"
        :action="IP+'/shop/upload'"
        list-type="picture"
        :on-success="Success"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>-->
    <div class="Store_p">
      <span>店铺照片</span>
      <el-upload
        :action="IMG_URL_LOAD"
        list-type="picture-card"
        :on-success="UploadSuccess"
        :on-remove="removeImg"
        :file-list="fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <!-- <div class="Store_p">
      <el-upload
        class="upload-demo"
        :action="IP+'/shop/upload'"
        list-type="picture"
        :on-success="Success"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>-->
    <div class="Store_p">
      <span>配送费</span>
      <el-input placeholder="请输入内容" clearable v-model="deliveryPrice"></el-input>
    </div>
    <div class="Store_p">
      <span>起送价格</span>
      <el-input placeholder="请输入内容" clearable v-model="minPrice"></el-input>
    </div>
    <div class="Store_p">
      <span>配送时间</span>
      <el-input placeholder="请输入内容" clearable v-model="deliveryTime"></el-input>
    </div>
    <div class="Store_p">
      <span>配送描述</span>
      <el-input placeholder="请输入内容" clearable v-model="description"></el-input>
    </div>
    <div class="Store_p">
      <span>店铺评分</span>
      <el-rate v-model="score" show-text></el-rate>
    </div>
    <div class="Store_p">
      <span>销量</span>
      <el-input placeholder="请输入内容" clearable v-model="sellCount"></el-input>
    </div>
    <div class="Store_p">
      <span>活动</span>
      <el-checkbox-group v-model="supports">
        <el-checkbox label="夏日大促销"></el-checkbox>
        <el-checkbox label="满30送小吃"></el-checkbox>
        <el-checkbox label="首单减5"></el-checkbox>
        <el-checkbox label="满20免配送费"></el-checkbox>
        <el-checkbox label="起送20"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="Store_p">
      <span>营业时间</span>
      <el-time-picker
        is-range
        v-model="date"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      ></el-time-picker>
    </div>
    <el-button type="primary" @click="clickStore">点击提交</el-button>
  </div>
</template>

<script>
import titles from "@/components/Title";
import { Oreinfo, St_URL, IMG_URL_LOAD, Stedit } from "@/Api/apis";
import { getCtime } from "@/utils/utils";
export default {
  created() {
    this.Orein();
    this.St_URL = St_URL;
    this.IMG_URL_LOAD = IMG_URL_LOAD;
  },
  data() {
    return {
      //数据
      St_URL: "", //获取地址
      IMG_URL_LOAD: "", //上传地址
      fileList: [], //店铺图片

      avatar: "", //店铺头像
      bulletin: "", //公告
      date: [], //营业时间
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送达时间
      description: "", //描述
      id: 0,
      minPrice: 0, //起送费
      name: "",
      pics: [], //店铺图片
      score: 0, //评分
      sellCount: 0, //销量
      supports: [], //活动
    };
  },
  methods: {
    //数据
    Orein() {
      Oreinfo().then((res) => {
        for (const key in res.data.data) {
          this[key] = res.data.data[key];
        }
        //图片
        this.fileList = this.pics.map((imgsrc) => {
          return {
            name: imgsrc,
            url: St_URL + imgsrc,
          };
        });
      });
    },
    //上传头像
    Success(res) {
      // this.info.pics.push(res.imgUrl);
      console.log(res);
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺头像上传成功",
        });
      }
    },
    //上传图片
    UploadSuccess(res) {
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "照片上传成功",
        });
        this.pics.push(res.imgUrl);
        console.log(this.pics);
      }
    },
    //删除店铺图片
    removeImg(res) {
      this.$message({
        type: "success",
        message: "照片删除成功",
      });
      this.pics.splice(this.pics.indexOf(res.name), 1);
      console.log(this.pics);
    },
    //提交修改
    clickStore() {
      let parms = {
        avatar: this.avatar,
        bulletin: this.bulletin,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        id: this.id,
        minPrice: this.minPrice,
        name: this.name,
        score: this.score,
        sellCount: this.sellCount,
        //字符串格式
        supports: JSON.stringify(this.supports),
        pics: JSON.stringify(this.pics),
        date: JSON.stringify([getCtime(this.date[0]), getCtime(this.date[1])]),
      };
      parms;
      Stedit(parms).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功！",
          });
        }
      });
    },
  },
  //提交

  mounted() {},
  components: {
    titles,
  },
};
</script>

<style lang="less" scoped>
@bgff: #fff;
#Store {
  background-color: @bgff;
  //   height: 1500px;
  min-height: 100%;
  padding-bottom: 70px;
  .Store_p {
    display: flex;
    width: 30%;
    margin-left: 20px;
    margin-bottom: 20px;
    span {
      width: 100px;
      line-height: 40px;
      margin-left: 5px;
    }
  }
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
  }
  .el-button--primary {
    margin-left: 120px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>