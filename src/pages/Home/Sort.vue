<template>
  <div id="Sort">
    <titley :ti="'商品分类'"></titley>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" width="280">
        <template slot-scope="scope">
              <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //添加分类 -->
    <el-button type="text" @click="dialogFormVisible = true" >添加分类</el-button>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickadd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑分类 -->
    <el-dialog title="修改分类" :visible.sync="cditcateVisible">
      <el-form :model="form">
        <el-form-item label="修改名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cditcateVisible = false">取 消</el-button>
        <el-button type="primary" @click="cditset">确 定</el-button>
      </div>
    </el-dialog>
    <!-- //分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import titley from "@/components/Title";
import {cate,addcate,delcate,cditcate} from "@/Api/apis"
export default {
  components: {
    titley,
  },
  created(){
  this.Cate()
  },
  mounted(){
    
  },
  data() {
    return {
      tableData: [
       
      ],
      currentPage:1,//页
      pageSize:5,//条
      pageSizes:[5, 7, 10, 15],
      total:0,//总条数
      dialogFormVisible: false,//蒙版
      cditcateVisible:false,
      //添加数据,修改数据
      form: {
        value: true,//开关
        name: "",//内容
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //数据
    Cate(){
      cate(this.currentPage,this.pageSize).then((res)=>{
      // let arr=res.data.data
      // console.log(arr)
      this.tableData=res.data.data.map((itme)=>{
        return {id:itme.id,
        cateName:itme.cateName,
        state:itme.state==0?false:true
        }
      })
      console.log(this.tableData)
      this.total=res.data.total
      })
    },
    //添加数据
    clickadd(){
      addcate(this.form.name,this.form.value).then((res)=>{
        if(res.data.code===0){
          this.$message({
            type: "success",
            message: "添加分类成功",
          });
          this.Cate()
        }else{
          this.$message({
            type: "info",
            message: "添加分类失败",
          });
        }
        this.dialogFormVisible=false
        this.form={value:true,name:""}
      })
    },
    //修改分类
    handleEdit(index, row) {
      //挂ID到this
     this.cditcateVisible=true
     this.id=row.id
     console.log(this.id)
    },
    cditset(){
      cditcate(this.id,this.form.name,this.form.value).then((res)=>{
        if(res.data.code===0){
          this.Cate()
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }else{
          this.$message({
            type: "info",
            message: "修改失败",
          });
        }
        this.form={value:true,name:""}
        this.cditcateVisible=false
      })
    },
    //删除分类
    handleDelete(index, row) {
       this.$confirm("此操作将永久删除, 是否继续?", "馋食提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            delcate(row.id).then((res)=>{
            if(res.data.code===0){
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.Cate()
            }else{
              this.$message({
                type: "info",
                message: "删除失败",
              });
            }
          })
          this.ProDlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //条数
    handleSizeChange(pageSize) {
      this.pageSize=pageSize
        this.Cate()
    },
    //页数
    handleCurrentChange(currentPage) {
        this.currentPage=currentPage
        this.Cate()
    }
  },
};
</script>

<style lang="less" scoped>
#Sort {
  background-color: #fff;
  height: 100%;
  .input_v {
    line-height: 20px;
    width: 90%;
    border-radius: 2px;
    border: none;
    // border: 1px solid #ccc;
    outline: none;
  }
  .el-button--text {
    background-color: #409eff;
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    margin: 20px 20px;
  }
}
</style>