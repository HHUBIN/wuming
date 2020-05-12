<template>
  <div>
    <el-row style="width:100%">
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="18">
      <router-link :to="'/'+articleContent.authorName" v-if="articleContent.authorImg != null">
        <el-avatar shape="square" :size="40" :src="articleContent.authorImg" class="park user-avatar" ></el-avatar>
      </router-link>
      <el-avatar shape="square" :size="40" v-else src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" class="park user-avatar"></el-avatar>
      <span class="name" v-if="articleContent.authorName != null">{{articleContent.authorName}}<el-button class="edit-but" size="mini">关                         注</el-button></span>
      <span class="name" v-else>游客</span>
      <div class="info">浏览数 ：{{articleContent.view}}        点赞数：{{articleContent.like}}        评论数：{{articleContent.comment}}          创建时间：{{articleContent.createTime}}</div>
      <h1 class="title">{{articleContent.title}}</h1>
        <el-tag
          v-for="item in articleContent.labels"
          :key="item.id"
          type="success"
          effect="plain"
          style="margin:5px 5px 5px 0px">
          {{ item.name }}
        </el-tag>
        <div v-html="articleContent.content" v-highlight style="width:100%"></div>
      <el-row>
        <el-col :span="1">
          <router-link :to="'/'+userInfo.name" v-if="userInfo.name != '' || userInfo.imgUrl != ''">
          <el-avatar :size="35" :src="userInfo.imgUrl" shape="square"></el-avatar>
          </router-link>
          <el-avatar :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
        </el-col>
        <el-col :span="21">
          <el-input
          style="margin-left: 5px;"
                type="textarea"
              :autosize="{ minRows: 2, maxRows: 10}"
              :rows="2"
              placeholder="快快留下你的脚印吧"
              v-model="commentFrom.content">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="comment-button el-icon-s-promotion" type="primary" @click="submitComment" style="font-size : 25px"></el-button>
        </el-col>
      </el-row>
            <!-- 评论列表 -->
        <div v-for="(item,index) in articleContent.commentDTOS" :key="item.id" class="comment-item">
            <el-row>
              <el-col :span="1">
                <router-link :to="'/'+item.authorName" v-if="item.authorName != null && item.authorImg != null">
                <el-avatar :size="35" :src="item.authorImg" shape="square"></el-avatar>
                </router-link>
                <el-avatar :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
              </el-col>
              <el-col :span="22" style=" margin-left : 10px">
                <div class="author-name" v-if="item.authorName != null">{{item.authorName}}</div>
                <div class="author-name" v-else>游客</div>
                <div style="font-size : 13px;" class="desc">{{item.content}}</div>
                <div class="article-info">
                  <a href="javascript:void(0);"><span class="el-icon-thumb el-icon" @click="like"></span></a>    点赞数：{{item.likeCount}}    <a href="javascript:void(0);"><span class="el-icon-chat-dot-square el-icon" @click="comment(item.id,index,0)"></span></a>评论数：{{item.commentCount}}          创建时间：{{item.createTime}}
                  <transition name="el-zoom-in-top">
                  <div v-show="articleContent.commentDTOS[index].show">
                    <el-row style="margin-top:20px">
                      <el-col :span="1">
                        <el-avatar :size="35" :src="userInfo.imgUrl" shape="square" v-if="userInfo.imgUrl != null"></el-avatar>
                        <el-avatar :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
                      </el-col>
                      <el-col :span="21" style="margin-left:10px">
                        <el-input v-model="comment2From.content" placeholder="请输入内容"></el-input>
                      </el-col>
                      <el-col :span="1" style="margin-left:10px">
                        <el-button @click="submitComment2(item.id,index)">提交</el-button>
                      </el-col>
                    </el-row>
                    <!-- 二级评论 -->
                    <el-row style="margin-top:20px" v-for="item2 in articleContent.commentDTOS[index].list" :key="item2.id">
                      <el-col :span="1">
                        <router-link :to="'/'+item2.authorName" v-if="item.authorName != null || item2.authorImg != null">
                        <el-avatar :size="35" :src="item2.authorImg" shape="square"></el-avatar>
                        </router-link>
                        <el-avatar :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
                      </el-col>
                      <el-col :span="22" style="margin-left:10px">
                        <div class="author-name" v-if="item2.authorName != null">{{item2.authorName}}</div>
                        <div class="author-name" v-else>游客</div>
                          <div style="font-size : 13px" class="desc"><span><a href="">@{{item2.userName}}</a></span>     <span style="color:black">{{item2.content}}</span></div>
                          <div class="article-info">
                            <a href="javascript:void(0);"><span class="el-icon-thumb el-icon" @click="like"></span></a>    点赞数：{{item2.likeCount}}
                              <el-popover
                                placement="bottom" width="800">
                                <el-row style="margin-top:20px">
                                <el-col :span="1">
                                  <el-avatar :size="35" :src="userInfo.imgUrl" shape="square"></el-avatar>
                                </el-col>
                                <el-col :span="20" style="margin-left:10px">
                                  <el-input v-model="comment2From.content" :placeholder="'@'+item2.userName"></el-input>
                                </el-col>
                                <el-col :span="1" style="margin-left:10px">
                                  <el-button @click="submitComment2(item.id,index,item2.authorName)">提交</el-button>
                                </el-col>
                              </el-row>
                                <a href="javascript:void(0);"  slot="reference"><span class="el-icon-chat-dot-square el-icon"></span></a>
                              </el-popover>回复
                            创建时间：{{item.createTime}}
                          </div>
                      </el-col>
                    </el-row>
                  </div>
                </transition>
                </div>
              </el-col>
            </el-row>
          </div>
    </el-col>
    <el-col :span="4">
    </el-col>
    </el-row>
  </div>
</template>
<script>
import marked from 'marked'
import 'highlight.js/styles/darcula.css'

export default {
  data () {
    return {
      input: '',
      id: '',
      articleContent: {},
      commentFrom: {
        content: '',
        id: '',
        authorId: ''
      },
      comment2From: {
        comment: '',
        id: '',
        authorId: '',
        targetName: ''
      },
      userInfo: {
        id: '',
        name: '',
        imgUrl: '',
        token: ''
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    this.commentFrom.authorId = window.localStorage.getItem('token')
    this.comment2From.authorId = window.localStorage.getItem('token')
    this.getArticle()
    this.getUserInfo()
    console.log(this.userInfo)
  },
  methods: {
    async getUserInfo () {
      const token = window.localStorage.getItem('token')
      if (token !== null) {
        const { data: res } = await this.$http.get('user/' + token)
        if (res.code === 200) {
          this.userInfo = res.data
          this.loginStatus = true
        }
      }
    },
    async comment (id, index, flag) {
      if (flag === 0) {
        this.articleContent.commentDTOS[index].show = !this.articleContent.commentDTOS[index].show
      }
      console.log(index)
      if (this.articleContent.commentDTOS[index].show === true) {
        const { data: res } = await this.$http.get('comment/' + id)
        console.log(res)
        if (res.code === 200) {
          this.articleContent.commentDTOS[index].list = res.data
        }
      }
    },
    like () {
      console.log('hello')
    },
    async submitComment2 (id, index, name) {
      if (this.comment2From.content === '') {
        this.$message.error('内容不能为空')
        return
      }
      this.comment2From.id = id
      this.comment2From.targetName = name
      const { data: res } = await this.$http.post('submitComment', this.comment2From)
      if (res.code === 200) {
        this.$message.success('评论成功')
        this.comment2From.content = ''
        this.comment(id, index, 1)
      }
    },
    async submitComment () {
      if (this.commentFrom.content === '') {
        this.$message.error('内容不能为空')
        return
      }
      this.commentFrom.id = this.id
      const { data: res } = await this.$http.post('submitComment', this.commentFrom)
      if (res.code === 200) {
        this.$message.success('评论成功')
        this.commentFrom.content = ''
        this.getArticle()
      }
    },
    async getArticle () {
      const { data: res } = await this.$http.get('article/' + this.id)
      console.log(res)
      this.articleContent = res.data
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
      this.articleContent.content = marked(this.articleContent.content)
    }
  },
  mounted () {
    // document.getElementsByTagName('pre').classList.add('hljs')
    // document.getElementsByClassName('jj').classList.add('hljs')
  }
}
</script>
<style scoped>
a {color:#76839b;}
.el-icon:hover
{
    font-size:200%;
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999;
    box-shadow: 0 0 6px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    color:rgb(2, 2, 2);
}
.el-icon-thumb
{
font-size : 20px;
}
.el-icon-chat-dot-square {
  font-size : 20px;
}
.article-info {
  margin-top: 8px;
  font-size: 13px;
  color: #76839b;
}
.name {
  margin-left: 20px;
  padding-top:30px;
  font-size: 15px;
}
.desc-ouder {
  word-wrap:break-word ;
}
.user-avatar {
  margin-top: 10px;
  margin-bottom: -26px;
}
.info {
  margin-left: 60px;
  margin-top: 4px;
  font-size: 13px;
  color: gray;
}
.edit-but {
  float: right;
  margin: 15px 0px 0px 0px;
}
.title {
  font-size: 30px;
}
.view-content {
  min-height: 0px;
  background-color: white;
}
.hljs {
  padding: 0px;
}
#editor {
  font-size: 20px;
}
.comment-button {
  margin-left: 10px;
  height: 54px;
}
.comment-item {
  padding: 15px 0px;
}
.author-name {
  font-size : 12px;
  color: #76839b;
}
.desc {
  word-wrap:break-word ;
}
</style>
