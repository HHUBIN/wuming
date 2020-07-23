<template>
  <div class="top">
    <el-backtop>
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
      }"
      >
        UP
      </div>
    </el-backtop>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="  文章  " name="articles">
        <el-row>
          <el-col :span="18">
            <el-card
              shadow="hover"
              class="park"
              v-for="(item, index) in list"
              :key="item.id"
              :body-style="{ padding: '10px' }"
            >
              <el-row>
                <el-col :span="16" v-if="item.firstImg != null">
                  <router-link
                    :to="'/' + item.user.name"
                    v-if="item.user != null"
                  >
                    <el-avatar
                      shape="square"
                      :size="35"
                      :src="item.user.imgUrl"
                      class="park user-avatar"
                    ></el-avatar>
                  </router-link>
                  <el-avatar
                    shape="square"
                    :size="35"
                    src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019"
                    class="park user-avatar"
                    v-else
                  ></el-avatar>
                  <span class="name" v-if="item.user !== null">{{
                    item.user.name
                  }}</span>
                  <span class="name" v-else>游客</span>
                  <br />
                  <el-link
                    type="success"
                    :href="'http://www.hhhbin.com/#/article/' + item.id"
                    target="_blank"
                  >
                    <h1 class="title">
                      {{ item.title }}
                    </h1>
                  </el-link>
                  <div>
                    <!-- <el-link
                      type="success"
                      :href="'http://localhost:8080/#/article/' + item.id"
                      target="_blank"
                      >{{ item.content }}...</el-link
                    > -->
                    <el-tag
                      v-for="item1 in item.labels"
                      :key="item1.id"
                      type="success"
                      effect="plain"
                      size="small"
                      style="margin:5px 5px 5px 0px"
                    >
                      {{ item1.name }}
                    </el-tag>
                  </div>
                  <div class="article-info">
                    浏览数 ：{{ item.viewCount }} 点赞数：{{
                      item.likeCount
                    }}
                    评论数：{{ item.commentCount }} 发布于：{{
                      item.fromDate
                    }}
                    <el-tag
                      type="danger"
                      effect="plain"
                      size="mini"
                      v-if="index == 0"
                      >置顶</el-tag
                    >
                  </div>
                </el-col>
                <el-col :span="24" v-else>
                  <router-link
                    :to="'/' + item.user.name"
                    v-if="item.user != null"
                  >
                    <el-avatar
                      shape="square"
                      :size="35"
                      :src="item.user.imgUrl"
                      class="park user-avatar"
                    ></el-avatar>
                  </router-link>
                  <el-avatar
                    shape="square"
                    :size="35"
                    src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019"
                    class="park user-avatar"
                    v-else
                  ></el-avatar>
                  <span class="name" v-if="item.user !== null">{{
                    item.user.name
                  }}</span>
                  <span class="name" v-else>游客</span>
                  <br />
                  <el-link
                    type="success"
                    :href="'http://www.hhhbin.com/#/article/' + item.id"
                    target="_blank"
                  >
                    <h1 class="title">
                      {{ item.title }}
                    </h1>
                  </el-link>
                  <div>
                    <el-tag
                      v-for="item1 in item.labels"
                      :key="item1.id"
                      type="success"
                      effect="plain"
                      size="small"
                      style="margin:5px 5px 5px 0px"
                    >
                      {{ item1.name }}
                    </el-tag>
                  </div>
                  <div class="article-info">
                    浏览数 ：{{ item.viewCount }} 点赞数：{{
                      item.likeCount
                    }}
                    评论数：{{ item.commentCount }} 发布于：{{
                      item.fromDate
                    }}
                    <el-tag
                      type="danger"
                      effect="plain"
                      size="mini"
                      v-if="index == 0"
                      >置顶</el-tag
                    >
                  </div>
                </el-col>
                <el-col :span="8" v-if="item.firstImg != null">
                  <el-image
                    fit="cover"
                    class="home-img"
                    :src="item.firstImg"
                  ></el-image>
                </el-col>
                <el-col :span="0" v-else></el-col>
              </el-row>
            </el-card>
            <el-divider v-if="!pageInfo.hasNextPage"
              ><span class="article-info">我是有底线的</span></el-divider
            >
          </el-col>
          <el-col style="padding-left : 5px" class="park" :span="6">
            <el-card shadow="hover">
              <router-link to="editor/article">
                <el-tooltip content="写文章" placement="top">
                  <span class="el-icon-edit park"></span>
                </el-tooltip>
              </router-link>
              <el-tooltip content="发提问" placement="top">
                <span class="el-icon-tickets park" @click="toAsk"></span>
              </el-tooltip>
            </el-card>
            <div style="width:300px;margin:0 auto; padding:20px 0;">
              <a
                target="_blank"
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=63022202000013"
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
                ><img src="../assets/img/备案图标.png" style="float:left;" />
                <p
                  style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#909399;font-size:15px"
                >
                  青公网安备 63022202000013号
                </p></a
              >
            </div>
            <el-link
              type="info"
              href="http://www.beian.miit.gov.cn/"
              target="_blank"
              :underline="false"
              style="font-size:15px"
              >青ICP备20000478号-1</el-link
            >
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="  提问  " name="ask">
        <el-row>
          <el-col :span="18">
            <el-card
              shadow="hover"
              class="park"
              v-for="item in asks"
              :key="item.id"
              :body-style="{ padding: '10px' }"
            >
              <router-link :to="'/' + item.user.name" v-if="item.user !== null">
                <el-avatar
                  shape="square"
                  :size="35"
                  :src="item.user.imgUrl"
                  class="park user-avatar"
                ></el-avatar>
              </router-link>
              <el-avatar
                shape="square"
                :size="35"
                src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019"
                class="park user-avatar"
                v-else
              ></el-avatar>
              <span class="name" v-if="item.user !== null">{{
                item.user.name
              }}</span>
              <span class="name" v-else>游客</span>
              <br />
              <el-link
                type="success"
                :href="'http://www.hhhbin.com/#/question/' + item.id"
                target="_blank"
              >
                <h1 class="title">
                  {{ item.content }}
                </h1>
              </el-link>
              <div class="article-info">
                回答数：{{ item.commentCount }} 发布于：{{ item.fromDate }}
              </div>
            </el-card>
            <el-divider v-if="!askPageInfo.hasNextPage"
              ><span class="article-info">我是有底线的</span></el-divider
            >
          </el-col>
          <el-col style="padding-left : 5px" class="park" :span="6">
            <el-card shadow="hover">
              <router-link to="editor/article">
                <el-tooltip content="写文章" placement="top">
                  <span class="el-icon-edit park"></span>
                </el-tooltip>
              </router-link>
              <el-tooltip content="发提问" placement="top">
                <span class="el-icon-tickets park" @click="toAsk"></span>
              </el-tooltip>
            </el-card>
            <div style="width:300px;margin:0 auto; padding:20px 0;">
              <a
                target="_blank"
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=63022202000013"
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
                ><img src="../assets/img/备案图标.png" style="float:left;" />
                <p
                  style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#909399;font-size:15px"
                >
                  青公网安备 63022202000013号
                </p></a
              >
            </div>
            <el-link
              type="info"
              href="http://www.beian.miit.gov.cn/"
              target="_blank"
              :underline="false"
              style="font-size:15px"
              >青ICP备20000478号-1</el-link
            >
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="发起提问"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAsk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getScrollHeight,
  getScrollTop,
  getWindowHeight
} from '../assets/js/screen.js'
export default {
  data () {
    return {
      pageInfo: {},
      askPageInfo: {},
      askspageRequest: {
        pageNum: 1,
        pageSize: 10
      },
      pageRequest: {
        pageNum: 1,
        pageSize: 10
      },
      activeName: 'articles',
      list: [],
      textarea: '',
      centerDialogVisible: false,
      token: '',
      asks: []
    }
  },
  created () {
    this.token = window.localStorage.getItem('token')
    this.getList()
    this.getasks()
  },
  methods: {
    async getasks () {
      const { data: res } = await this.$http.post('asks', this.askspageRequest)
      if (res.code === 200) {
        this.askspageRequest.pageNum++
        console.log(res)
        if (res.data.isFirstPage) {
          this.asks = res.data.list
        } else {
          for (var j = 0; j < res.data.list.length; j++) {
            this.asks.push(res.data.list[j])
          }
        }
        this.askPageInfo = res.data
      }
    },
    async submitAsk () {
      if (this.textarea === '') {
        this.$alert('内容不能为空', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      console.log(this.token)
      const { data: res } = await this.$http.post('ask', {
        content: this.textarea,
        token: this.token
      })
      console.log(res)
      if (res.code === 200) {
        this.$message.success('发布成功')
        this.centerDialogVisible = false
        this.$router.push('/question/' + res.data.id)
      } else {
        this.$message.error('发布失败')
      }
    },
    toAsk () {
      if (this.token === null || this.token === '') {
        const that = this
        this.$confirm('你当前未登录，你确定匿名发布吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            that.centerDialogVisible = true
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.centerDialogVisible = true
      }
    },
    load () {
      if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
        if (this.activeName === 'articles') {
          if (this.pageInfo.hasNextPage) {
            // 先判断下一页是否有数据
            this.getList()
          }
        } else {
          if (this.askPageInfo.hasNextPage) {
            // 先判断下一页是否有数据
            this.getasks()
          }
        }
      }
    },
    async getList () {
      const { data: res } = await this.$http.post(
        this.activeName,
        this.pageRequest
      )
      if (res.code === 200) {
        console.log(res)
        this.pageRequest.pageNum++
        if (res.data.isFirstPage) {
          this.list = res.data.list
        } else {
          for (var j = 0; j < res.data.list.length; j++) {
            this.list.push(res.data.list[j])
          }
        }
        this.pageInfo = res.data
      }
    },
    handleClick () {
      // if (this.activeName === 'articles') {
      //   this.getList()
      // } else {
      //   this.getasks()
      // }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.load)
  },
  destroyed () {
    window.removeEventListener('scroll', this.load, false)
  }
}
</script>
<style scoped>
.home-img {
  width: auto;
  height: auto;
  max-height: 172px;
}
.question-row {
  width: 2000px;
}
.el-card {
  margin: 8px 0px;
}
.el-icon-edit {
  font-size: 50px;
  margin-left: 40px;
  color: #000;
}
.el-icon-tickets {
  font-size: 50px;
  margin-left: 50px;
  color: #000;
}
.article-info {
  margin-top: 8px;
  font-size: 13px;
  color: #76839b;
}
.title {
  margin: 5px 0;
  font-size: 20px;
}
.name {
  margin-left: 10px;
  font-size: px;
}
.view-content {
  min-height: 0px;
}
.el-tag {
  margin: 5px;
}
.user-avatar {
  margin-bottom: -4px;
}
/* .el-card:hover{
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 0 10px #999;
    box-shadow: 0 0 3px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    color:#999;
} */
</style>
