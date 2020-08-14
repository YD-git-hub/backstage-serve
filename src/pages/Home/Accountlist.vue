<template>
  <div id="Accoun">
    <atitle :ti="'账号列表'"></atitle>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;height:310px"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      element-loading-text="拼老命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" width="200"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>

      <el-table-column width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row) ">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 7, 10, 15]"
      :page-size="SizeChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div style="margin-left:20px;margin-top:20px">
      <el-button @click="toggleSelection([multipleSelection])" class="del_btn">批量删除</el-button>
      <el-button @click="toggleSelection()" class="cs_btn">取消选择</el-button>
    </div>

    <!-- //编辑信息 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="修改账户名" :label-width="formLabelWidth">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="修改用户组" :label-width="formLabelWidth">
          <el-select v-model="form.userGroup" placeholder="请输入内容">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import atitle from "../../components/Title";
// import { list, del, batchdel } from "@/Api/apis";
import { list, del, batchdel, edit } from "@/Api/apis";
//时间
import { getCtime } from "@/utils/utils";
export default {
  components: {
    atitle,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1, //页
      total: 0,
      SizeChange: 5, //条
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "150px",
      loading: true,
    };
  },
  created() {
    //数据
    this.Acclist();
  },
  updated() {},
  mounted() {},
  methods: {
    //服务器数据
    Acclist() {
      this.loading=true,
      // window.setTimeout(()=>{
        list(this.currentPage, this.SizeChange).then((res) => {
        let arr = res.data.data;
        for (const obj of arr) {
          obj.ctime = getCtime(obj.ctime);
        }
        this.tableData = arr;
        this.total = res.data.total;
      })
      // },2000)
        this.loading= false
      
    },
    //编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    edit() {
      edit(this.form).then((res) => {
        if (res.data.code == 0) {
          alert(res.data.msg);
          this.Acclist();
        } else alert(res.data.msg);
        this.dialogFormVisible = false;
      });
    },
    //删除
    handleDelete(index, row) {
      //弹框确认
      this.$confirm("此操作将永久删除, 是否继续?", "馋食提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(row.id).then((res) => {
            console.log(res.data);
            this.Acclist();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);

          this.$confirm("此操作将永久删除, 是否继续?", "馋食提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              //批量删除
              batchdel(row).then((res) => {
                console.log(res.data.code);
                if (res.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                  this.Acclist();
                } else
                  this.$message({
                    type: "success",
                    message: "删除失败!",
                  });
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选中的值
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let dels = [];
      for (const iter of this.multipleSelection) {
        dels.push(iter.id);
      }
      let datdel = JSON.stringify(dels);
      console.log(datdel);
      this.multipleSelection = datdel;
    },
    //条数
    handleSizeChange(SizeChange) {
      this.SizeChange = SizeChange;
      this.Acclist();
    },
    //页数
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;

      this.Acclist();
    },
    //时间格式
  },
};
</script>

<style lang="less" scoped>
#Accoun {
  background: #fff;
  padding-bottom: 30px;
  .el-pagination {
    margin-top: 20px;
    margin-left: 20px;
  }
  .del_btn {
    background-color: #f56c6c;
    color: #fff;
  }
  .cs_btn {
    background-color: #409eff;
    color: #fff;
  }
}
</style>