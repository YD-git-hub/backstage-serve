<template>
  <div id="Plist">
    <titlesp :ti="'商品列表'"></titlesp>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%; height:100%;
      "
        v-loading="loading"
        element-loading-text="拼老命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="props">
            <img :src="get_URL + props.row.imgUrl" style="width:80px;hight:80px;" />
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </template>

    <!-- //编辑信息 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="obj">
        <el-form-item label="修改商品名" :label-width="formLabelWidth">
          <el-input v-model="obj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改商品分类" :label-width="formLabelWidth">
          <el-select v-model="obj.category" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.cateName"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改商品价格" :label-width="formLabelWidth">
          <el-input v-model="obj.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改商品图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :action="URL_Upload"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="修改商品描述" :label-width="formLabelWidth">
          <el-input v-model="obj.goodsDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="prdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import titlesp from "../../components/Title";
import {
  Prodlist,
  Prdel,
  Predel,
  categories,
  URL_Upload,
  get_URL,
} from "@/Api/apis";
import { getCtime } from "@/utils/utils";
export default {
  created() {
    
    //商品列表
    this.ProDlist();
    //商品分类
    categories().then((res) => {
      //value: "选项1",
      this.options = res.data.categories.filter((itme) => {
        return (itme.value = itme.cateName);
      });
      console.log(this.options);
    });

    this.URL_Upload = URL_Upload;
    this.get_URL = get_URL;
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 5, //条数
      total: 0, //总条数
      dialogFormVisible: false, //编辑模态框
      img: "",
      pageSizes: [5, 7, 10, 15],
      obj: {},
      options: [], //分类
      formLabelWidth: "150px",
      fileList: [], //删除图片
      URL_Upload: "", //上传地址
      get_URL: "", //获取地址
      loading: true,
    };
  },
  methods: {
    //数据
    ProDlist() {
      this.loading=true
      // window.setTimeout(()=>{
      Prodlist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (const obj of arr) {
          obj.ctime = getCtime(obj.ctime);
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
      // },2000)
        this.loading=false
    },
    //编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.obj = { ...row };
    },
    prdit() {
      this.obj.imgUrl = this.img;
      Predel(this.obj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你修改成功",
            type: "success",
          });
          this.ProDlist();
        } else {
          this.$message.error("修改失败,请重试");
        }
        this.dialogFormVisible = false;
        console.log(this.obj.imgUrl);
      });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "馋食提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Prdel(row.id).then((res) => {
            console.log(res.code);
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.ProDlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //条
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.ProDlist();
    },
    //页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.ProDlist();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片地址
    handleAvatarSuccess(res) {
      this.img = res.imgUrl;
    },
  },
  components: {
    titlesp,
  },
};
</script>

<style lang="less" scoped>
#Plist {
  height: 100%;
  background-color: #fff;
  padding-bottom: 200px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 80px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.is-leaf {
  width: 80px;
}
.el-pagination {
  margin-top: 20px;
}
</style>