<template>
  <div id="Addto">
    <titles :ti="'商品添加'"></titles>
    <div class="Store_p">
      <span>商品名称</span>
      <el-input placeholder="请输入内容" v-model="obj.name" clearable></el-input>
    </div>
    <div class="Store_p">
      <span>商品分类</span>
      <div>
        <el-select v-model="obj.category" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.cateName"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="Store_p">
      <span>商品价格</span>
      <el-input-number v-model="obj.price" :min="1" :max="100" label="描述文字"></el-input-number>
    </div>
    <div class="Store_p">
      <span>商品图片</span>
      <el-upload
        class="upload-demo"
        :action="URL_Upload"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="Store_p"></div>
    <div class="Store_p">
      <span>商品描述</span>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="obj.goodsDesc"></el-input>
    </div>
    <el-button type="primary" @click="refer">点击提交</el-button>
  </div>
</template>

<script>
import titles from "@/components/Title";
// import { categories } from "@/Api/apis";
import { categories, preadd,URL_Upload } from "@/Api/apis";
export default {
  created() {
    //查询分类
    categories().then((res) => {
      this.options = res.data.categories.filter((itme) => {
        return (itme.value = itme.cateName);
      });
      this.obj.category=this.options[0].cateName
    });
    this.URL_Upload=URL_Upload
  },
  data() {
    return {
      options: [],//商品分类
      fileList: [],//删除图片
      obj: {
        name: "",//商品名称
        category: "dasdas",
        price: 1,
        imgUrl: "",
        goodsDesc: "",
      },
      URL_Upload:"",//图片上传地址
    };
  },
  methods: {
    //删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片地址
    refer() {
      preadd(this.obj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        } else this.$message.error("添加失败");
      });
    },
    handleAvatarSuccess(res) {
      this.obj.imgUrl = res.imgUrl;
      if (res.code == 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
      } else {
        this.$message.error("上传失败");
      }
      console.log(res);
    },
  },
  components: {
    titles,
  },
};
</script>

<style lang="less" scoped>
#Addto {
  background-color: #fff;
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
    .el-select {
      margin-left: -20px;
    }
    .el-input-number {
      margin-left: -20px;
    }
    .upload-demo {
      margin-left: -20px;
    }
  }
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
  }
  .el-button--primary {
    margin-left: 20px;
  }
}
</style>