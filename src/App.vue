<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body{
  margin: 0px;
}
.park {
  z-index:1;
  position: relative;
}
.onto-park {
  z-index:999999999999999;
  position: relative;
}
#nprogress .bar {
  background: black !important; //自定义颜色
}
.el-avatar{
  width: 40px;
  height: 40px;
}
p img {
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
}
.v-show-content{
  background-color: white !important;
    padding: 10px 0px !important;
}
.v-note-wrapper{
  border: none !important;
}
pre{
  background-color: white !important;
  font-size: 110% !important;
  line-height: 1.1 !important;
  padding: 20px 0px !important;
  div{
    background-color: #f7f7f7 !important;
    border-radius: 8px !important;
  }
}
// .hljs-params{
//       color: #0f0bff  !important;
// }
// .hljs-keyword{
//   color: #d14  !important;
// }
// .markdown-body {
//   font-family: "Microsoft YaHei","黑体","宋体",sans-serif !important;
//   font-weight:545   !important;
// }
</style>
