import axios from "axios"
import Axios from "axios"
// import { get } from "core-js/fn/dict"
//IP
export let IP ="http://127.0.0.1:5000"
//自动IP＋端口
axios.defaults.baseURL=IP
//图片上传地址
export let URL_Upload=IP+"/goods/goods_img_upload"
//获取图片地址
export let get_URL=IP+"/upload/imgs/goods_img/"

//获取店铺地址
export let St_URL=IP+"/upload/shop/"
//上传店铺图片地址
export let IMG_URL_LOAD=IP+"/shop/upload"
//---------------------------------登录------------------------------//
//account账号
//password密码
export let login=(account,password)=> Axios.post("/users/checkLogin",{account,password})
//---------------------------------token------------------------------//
//token token
export let token=(token)=> Axios.get("/users/checktoken",{params:{token}})
//---------------------------------账号管理------------------------------//
//添加账号
//account 账号
//password 密码
//userGroup 用户组
export let adduser=(account,password,userGroup)=> Axios.post("/users/add",{account,password,userGroup});
//账号列表
//currentPage 当前页码
//pageSize 每页条数
export let list=(currentPage,pageSize)=>Axios.get("/users/list",{params:{currentPage,pageSize}})
//修改账号
//id 用户ID 
//account 账号
//userGroup 用户组
export let edit=(obj)=>Axios.post("/users/edit",obj)
//删除账号
//id 删除账号ID
export let  del=(id)=>Axios.get("/users/del",{params:{id}})
//批量删除账号
//ids 批量删除数组字符串
export let batchdel=(ids)=>Axios.get("/users/batchdel",{params:{ids}})
//获取账号信息
//id 获取ID
export let tinfo=(id)=>Axios.get("/users/accountinfo",{params:{id}})

//---------------------------------密码管理------------------------------//
//原密码检测
//ldpwd 原密码
//id  id
export let ldpwd=(oldPwd,id)=>Axios.get("/users/checkoldpwd",{params:{oldPwd,id}})
//修改密码
//newPwd 新密码
//id 修改ID
export let newPwd=(newPwd,id)=>Axios.post("/users/editpwd",{newPwd,id})

//---------------------------------商品分类------------------------------//
//获取分类
//currentPage 当前页
// pageSize 每页条数
export let cate=(currentPage,pageSize)=>Axios.get("/goods/catelist",{params:{currentPage,pageSize}})
//添加分类
//cateName 名字
//state 是否开启
export let addcate=(cateName,state)=>Axios.post("/goods/addcate",{cateName,state})
//删除分类
//id 用户ID
export  let delcate=(id)=>Axios.get("/goods/delcate",{params:{id}})
//修改分类
//id 商品ID
//cateName 名称
export let cditcate=(id,cateName,state)=>Axios.post("/goods/editcate",{id,cateName,state});
//查询分类
export let categories=()=>Axios.get("/goods/categories")
//---------------------------------商品列表------------------------------//
//获取商品列表
//currentPage 页
//pageSize 条
export let Prodlist=(currentPage,pageSize)=>Axios.get("/goods/list",{params:{currentPage,pageSize}})
//删除商品
//id 删除ID
export let Prdel=(id)=>Axios.get("/goods/del",{params:{id}});
//修改商品
//name	商品名称
//category 商品分类
//price	商品价格
//imgUrl 商品图片地址
//goodsDesc	商品描述
//id 商品ID
export let Predel=(obj)=>Axios.post("/goods/edit",obj)
//添加商品
//name	商品名称
//category 商品分类
//price	商品价格
//imgUrl 商品图片地址
//goodsDesc	商品描述
export let preadd=(obj)=>Axios.post("goods/add",obj)
//---------------------------------订单管理------------------------------//
//获取订单列表 /order/list
/* currentPage	int	是	当前页码
pageSize	int	是	每页条数 */
export let Orlist=(params)=>Axios.get("/order/list",{params})
//获取订单详情
//
export let Ordeteil=(id)=>Axios.get("order/detail",{params:{id}})
//修改订单
/* id	要修改账号的id
orderNo		订单号
orderTime 下单时间
phone	电话
consignee 收货人
deliverAddress 送货地址
deliveryTime 送达时间
remarks	备注
orderAmount	订单金额
orderState	订单状态 */
export let Oredit=(params)=>Axios.post("/order/edit",params)
//获取店铺详情
export let Oreinfo=()=>Axios.get("/shop/info");
//修改资料
export let Stedit=(params)=>Axios.post("/shop/edit",params)
//首页报表
export let Ortot=()=>Axios.get("/order/totaldata")
//订单报表
export let Ordtotal=(params)=>Axios.get("/order/ordertotal",{params})

