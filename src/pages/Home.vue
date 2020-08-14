<template>
  <el-container>
    <el-aside width="200px">
      <p class="loogo">
        <i class="el-icon-eleme"></i>
        后台管理系统
      </p>
      <el-menu
        :default-active="Firstload"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div v-for="(item,index) in powerarr" :key="index">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(chil,indexs) in item.children"
                :key="indexs"
                :index="chil.url"
              >{{chil.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
          <el-breadcrumb-item v-for="(item,index) in breadnav" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="myimg">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{uesrname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/Home/Personal" style="color: #606266;">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/" style="color: #606266;" @click.native="logout">退出登录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-avatar :size="50" :src="circleUrl" style="margin-top:5px"></el-avatar>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { token, tinfo } from "@/Api/apis";
export default {
  data() {
    return {
      //头像地址
      circleUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1883278254,2829362133&fm=26&gp=0.jpg",
      //权限数据
      list: [
        {
          url: "/Home/Index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/Home/Order",
          icon: "el-icon-s-order",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "1",
          icon: "el-icon-s-cooperation",
          name: "商品管理",
          children: [
            { url: "/Home/Productlist", name: "商品列表" },
            { url: "/Home/Addto", name: "商品添加" },
            { url: "/Home/Sort", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/Home/Store",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "2",
          icon: "el-icon-user-solid",
          name: "账号管理",
          children: [
            { url: "/Home/Accountlist", name: "账号列表" },
            { url: "Addmark", name: "添加账号" },
            { url: "Modifypwd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "3",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/Home/Paddup", name: "商品统计" },
            { url: "/Home/Addup", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      //请登录
      uesrname: "",
      //导航hash
      Firstload:"",
      //面包屑
      breadnav:[]

    };
  },
  created() {
    //监听面包屑导航
   this.breadnav=this.$route.meta.breadnav
    //监听侧栏hash值
    this.Firstload=this.$route.path;
    //头像数据刷新
    this.Tinfo();
    //头像
    this.$bus.$on("imgfinish", () => {
      this.Tinfo();
    });
    //验证token是否过期
    token(localStorage.token).then((res) => {
      if (res.data.code === 0) this.uesrname = localStorage.uesrname;
      else this.uesrname = "请登录";
    });
  },
  methods: {
    //获取用户头像
    Tinfo() {
      tinfo(localStorage.uid).then((res) => {
        this.circleUrl = res.data.accountInfo.imgUrl;
      });
    },
    logout(){
      localStorage.clear()
      this.$route.push("/")
    }
  },
  components: {},
  computed: {
    //包含权限管理
    powerarr() {
      return this.list.filter((item) => item.roles.includes(localStorage.roles)
      );
    },
  },
  watch:{
    $route(to){
      this.breadnav=to.meta.breadnav
    }
  }
};
</script>

<style lang="less" scoped>
@bg30: #304156;
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .myimg {
    display: flex;
    line-height: 60px;
    color: rgb(179, 173, 173);
    span {
      margin-right: 10px;
    }
  }
}

.el-aside {
  background-color: @bg30;
  .el-menu {
    border: 0px;
  }

  .loogo {
    text-align: center;
    color: #fff;
    font-size: 14px;
    .el-icon-eleme {
      font-size: 60px;
      vertical-align: middle;
    }
  }

  .is-active a {
    color: rgb(255, 208, 75);
  }
  .router {
    color: #fff;
  }
}

.el-main {
  background-color: #e9eef3;
  height: 100%;
  background: #f1f1f1;
  padding: 20px;
}
.el-container {
  height: 100%;
}

</style>