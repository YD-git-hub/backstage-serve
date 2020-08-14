<template>
  <div class="top_div">
    <!-- 查询 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>订单号</span>
          <el-input placeholder="请输入内容" clearable v-model="orderNo"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>收货人</span>
          <el-input placeholder="请输入内容" clearable v-model="consignee"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>手机号</span>
          <el-input placeholder="请输入内容" clearable v-model="phone"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>订单状态</span>
          <el-select v-model="orderState" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <span class="dt_spna">选择时间</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="clickInquire">查询</el-button>
    </el-row>
    <!-- 数据列表 -->
    <el-table :data="tableData" border style="width: 80%">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column fixed prop="orderTime" label="下单时间" width="180"></el-table-column>
      <el-table-column fixed prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 订单详情 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="订单号:">
          <span class="ord">{{ obj.orderNo }}</span>
        </el-form-item>
        <el-form-item label="收货人:">
          <span class="ord">{{ obj.consignee }}</span>
        </el-form-item>
        <el-form-item label="下单时间:">
          <span class="ord">{{ obj.orderTime}}</span>
        </el-form-item>
        <el-form-item label="联系电话:">
          <span class="ord">{{ obj.phone }}</span>
        </el-form-item>
        <el-form-item label="送货地址:">
          <span class="ord">{{ obj.deliverAddress }}</span>
        </el-form-item>
        <el-form-item label="送达时间:">
          <span class="ord">{{ obj.deliveryTime }}</span>
        </el-form-item>
        <el-form-item label="备注:">
          <span class="ord">{{ obj.remarks }}</span>
        </el-form-item>
        <el-form-item label="订单金额:">
          <span class="ord">{{ obj.orderAmount }}</span>
        </el-form-item>
        <el-form-item label="订单状态:">
          <span class="ord">{{ obj.orderState }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 编辑信息 -->
    <el-dialog title="修改信息" :visible.sync="editVisible">
      <el-form :model="edit">
        <el-form-item label="修改收货人" :label-width="formLabelWidth">
          <el-input v-model="edit.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改电话" :label-width="formLabelWidth">
          <el-input v-model="edit.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改送货地址" :label-width="formLabelWidth">
          <el-input v-model="edit.deliverAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改备注" :label-width="formLabelWidth">
          <el-input v-model="edit.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改订单金额" :label-width="formLabelWidth">
          <el-input v-model="edit.orderAmount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="Ordit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCtime } from "@/utils/utils";
import { Orlist, Ordeteil, Oredit } from "@/Api/apis";
export default {
  created() {
    //数据
    this.orlist();
  },
  data() {
    return {
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //联系电话
      orderState: "", //订单状态
      // z订单状态选择栏
      options: [
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "全部",
          label: "全部",
        },
      ],
      //总条数
      total: 0,
      //表格
      tableData: [],
      //分页
      currentPage: 1, //页
      pageSizes: [5, 10, 15],
      pageSize: 5, //条
      //时间
      date: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //查询
      dialogFormVisible: false, //查看模态框
      editVisible: false,
      //查看
      obj: {},
      //编辑
      edit: {},
      formLabelWidth: "150px",
    };
  },
  components: {},
  methods: {
    //数据
    orlist(paramsX) {
      Orlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsX,
      }).then((res) => {
        let arr = res.data.data;
        //时间格式
        for (const item of arr) {
          item.orderTime = getCtime(item.orderTime);
          item.deliveryTime = getCtime(item.deliveryTime);
        }
        //数据
        this.tableData = arr;
        //总页数
        this.total = res.data.total;
      });
    },
    //查看
    handleClick(row) {
      this.dialogFormVisible = true;
      Ordeteil(row.id).then((res) => {
        res.data.data.deliveryTime = getCtime(res.data.data.deliveryTime);
        res.data.data.orderTime = getCtime(res.data.data.orderTime);
        this.obj = res.data.data;
      });
    },
    //编辑
    editClick(row) {
      this.editVisible = true;
      this.edit = { ...row };
    },
    Ordit() {
      Oredit(this.edit).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你修改成功",
            type: "success",
          });
          this.orlist();
        } else {
          this.$message.error("修改失败,请重试");
        }
        this.editVisible = false;
      });
    },
    //条
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.orlist(this.paramsX);
    },
    //页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.orlist(this.paramsX);
    },
    //查询
    clickInquire() {
      let { orderNo, consignee, phone, orderState } = this;
      let paramsX = {};
      if (orderNo != "") paramsX.orderNo = orderNo;
      if (consignee != "") paramsX.consignee = consignee;
      if (phone != "") paramsX.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsX.orderState = orderState;
      if (this.date) {
        paramsX.date = JSON.stringify([
          getCtime(this.date[0]),
          getCtime(this.date[1]),
        ]);
      }
      this.paramsX = paramsX;
      this.orlist(this.paramsX);
    },
  },
};
</script>

<style lang="less" scoped>
@bfff: #fff;
.top_div {
  background: @bfff;
  padding: 20px;
  height: 100%;

  .el-button--primary {
    margin-left: 10px;
  }
  .el-pagination {
    margin-top: 20px;
  }
  .el-table--border {
    margin-top: 50px;
  }
}
.el-col {
  width: 20%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  //   background: #99a9bf;
}
.bg-purple {
  display: flex;
  span {
    width: 75px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    margin-right: 5px;
  }
}
.bg-purple-light {
  //   background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.dt_spna {
  width: 60px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  margin-right: 10px;
}
.ord {
  color: red;
}
</style>