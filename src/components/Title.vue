<template>
  <div class="title_div">
    <span>{{ti}}</span>
  </div>
</template>

<script>
export default {
  props:["ti"]
};
</script>

<style lang="less" scoped>
.title_div {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  span {
    width: 80px;
    text-align: center;
    margin-left: 20px;
    line-height: 40px;
  }
  .el-button--primary {
    margin-right: 20px;
  }
}
</style>