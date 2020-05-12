<template>
  <div id="app">
    <router-view/>
    <!-- <vue-particles
    color="#000"
    :particleOpacity="0.7"
    :particlesNumber="150"
    shapeType="circle"
    :particleSize="4"
    linesColor="#000"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="10"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
    >
    </vue-particles> -->
  </div>
</template>

<style lang="scss">
//  #particles-js{
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index:0;
// }
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
</style>
