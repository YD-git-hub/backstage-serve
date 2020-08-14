import VueRouter from "vue-router";
import Vue from "vue";
import Login from "./pages/Login"; //后台首页
import { token } from "@/Api/apis"

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: "/",
            name: "Login",
            component: Login //登录
        },
        
        {
            path: "/Home",
            name: "Home",
            component: () => import("./pages/Home"),
            children: [
                //后台首页
                {
                    path: "/Home/Index",
                    name: "Index",
                    component: () => import("./pages/Home/Index"),
                    meta:{breadnav:["首页"]}
                },
                //订单管理
                {
                    path: "/Home/Order",
                    name: "Order",
                    component: () => import("./pages/Home/Order"),
                    meta:{breadnav:["订单管理"]}
                },
                //店铺管理
                {
                    path: "/Home/Store",
                    name: "Store",
                    component: () => import("./pages/Home/Store"),
                    meta:{breadnav:["店铺管理"]}
                },
                //个人中心
                {
                    path: "/Home/Personal",
                    name: "Personal",
                    component: () => import("./pages/Home/Personal"),
                    meta:{breadnav:["首页","个人中心"]}
                },
                //订单统计
                {
                    path: "/Home/Addup",
                    name: "Addup",
                    component: () => import("./pages/Home/Addup"),
                    meta:{breadnav:["销售统计","订单统计"]}
                },
                //商品统计
                {
                    path: "/Home/Paddup",
                    name: "Paddup",
                    component: () => import("./pages/Home/Paddup"),
                    meta:{breadnav:["销售统计","商品统计"]}
                },
                //商品分类
                {
                    path: "/Home/Sort",
                    name: "Sort",
                    component: () => import("./pages/Home/Sort"),
                    meta:{breadnav:["商品管理","商品分类"]}
                },
                //商品列表
                {
                    path: "/Home/Productlist",
                    name: "Productlist",
                    component: () => import("./pages/Home/Productlist"),
                    meta:{breadnav:["商品管理","商品列表"]}
                },
                //商品添加
                {
                    path: "/Home/Addto",
                    name: "Addto",
                    component: () => import("./pages/Home/Addto"),
                    meta:{breadnav:["商品管理","商品添加"]}
                },
                //添加账号
                {
                    path: "/Home/Addmark",
                    name: "Addmark",
                    component: () => import("./pages/Home/Addmark"),
                    meta:{breadnav:["账号管理","添加账号"]}
                },
                //修改密码
                {
                    path: "/Home/Modifypwd",
                    name: "Modifypwd",
                    component: () => import("./pages/Home/Modifypwd"),
                    meta:{breadnav:["商品管理","修改密码"]}
                },
                //账号列表
                {
                    path: "/Home/Accountlist",
                    name: "Accountlist",
                    component: () => import("./pages/Home/Accountlist"),
                    meta:{breadnav:["商品管理","账号列表"]}
                },


            ]
        },
    ]
})

router.beforeEach((to, form, netx) => {
    if (to.path != "/") {
        token(localStorage.token).then((res) => {
            if (res.data.code == 0)
                netx()
            else
                netx("/")
        })
    } else
        netx()
})

export default router