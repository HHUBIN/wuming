<template>
  <div>
    <el-row>
    <el-col :span="18">
    <el-card class="box-card park" :body-style="{ padding: '10px 0px 0px 0px' }" shadow="never">
      <el-avatar shape="square" :size="40" :src="user.imgUrl" class="park user-avatar" v-if="user !== null"></el-avatar>
      <el-avatar shape="square" :size="40" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" class="park user-avatar" v-else></el-avatar>
      <span class="name" v-if="user !== null">{{user.name}}
        <!-- <el-button class="edit-but" size="mini">关                         注</el-button> -->
        </span>
      <span class="name" v-else>匿名用户
        <!-- <el-button class="edit-but" size="mini">关                         注</el-button> -->
        </span>
      <div class="info">回答数：{{questionContent.commentCount}}          发布于：{{questionContent.fromDate}}</div>
      <h1 class="title">{{questionContent.content}}</h1>
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <span class="article-info">快快点此留下你的想法吧</span>
          </template>
          <mavon-editor
            v-model="answerFrom.content"
            :ishljs="true"
            ref="md"
            @imgAdd="$imgAdd"
            class="park"
            codeStyle="androidstudio"
          />
          <el-button @click="answerCommit" class="edit-but" type="success">提交</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 回答 -->
    <el-card shadow="hover"  v-for="(item,i1) in answer" :key="item.id" :body-style="{ padding: '10px 10px 0px 10px' }">
      <router-link :to="'/'+item.user.name" v-if="item.user != null">
        <el-avatar shape="square" :size="35" :src="item.user.imgUrl" class="answer-user-avatar"></el-avatar>
      </router-link>
      <el-avatar shape="square" :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" class="answer-user-avatar" v-else></el-avatar>
      <span class="answer-name" v-if="item.user !== null">{{item.user.name}} </span>
      <span class="answer-name" v-else>匿名用户 </span>
      <br/>
        <mavon-editor
        id="editor"
          v-model="item.content"
          :subfield="false"
          :boxShadow="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          class="view-content"
          previewBackground="#ffffff"
          codeStyle="github-gist"
        />
      <el-collapse accordion @change="getComment(item.id,i1)">

        <el-collapse-item>
          <template slot="title">
            <div class="article-info">点赞数：{{item.likeCount}}        评论数：{{item.commentCount}}          发布于：{{item.fromDate}}</div>
          </template>
          <el-row>
            <el-col :span="1">
              <router-link :to="'/'+userInfo.name">
              <el-avatar :size="35" :src="userInfo.imgUrl" shape="square" v-if="userInfo.name !== ''"></el-avatar>
              <el-avatar :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
              </router-link>
            </el-col>
            <el-col :span="20">
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
              <el-button class="comment-button el-icon-s-promotion" type="primary" @click="submitComment(item.id,i1)" style="font-size : 25px"></el-button>
            </el-col>
          </el-row>
          <!-- 一级评论 -->
          <div v-for="(comment,i2) in item.comments" :key="comment.id" class="comment-item">
            <el-row>
              <el-col :span="1">
                <router-link :to="'/'+comment.authorName" v-if="comment.authorName != null">
                <el-avatar :size="35" :src="comment.authorImg" shape="square" ></el-avatar>
                </router-link>
                <el-avatar :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
              </el-col>
              <el-col :span="22" style=" margin-left : 10px">
                <div class="author-name" v-if="comment.authorName != null">{{comment.authorName}}</div>
                <div class="author-name" v-else>游客</div>
                <div style="font-size : 13px" class="desc">{{comment.content}}</div>
                <div class="article-info"><a href="javascript:void(0);"><span class="el-icon-thumb el-icon" @click="like(comment.id,i1,i2,0,1)"></span></a>    点赞数：{{comment.likeCount}}    <a href="javascript:void(0);"><span class="el-icon-chat-dot-square el-icon" @click="getcomment(comment.id,i1,i2,0)"></span></a>评论数：{{comment.commentCount}}          发布于：{{comment.fromDate}}</div>
                <transition name="el-zoom-in-top" style="margin:20px,20px,20px,20px">
                  <div v-show="answer[i1].comments[i2].show">
                    <el-row style="margin-top:20px">
                      <el-col :span="1">
                        <el-avatar :size="37" :src="userInfo.imgUrl" shape="square" v-if="userInfo.imgUrl != ''"></el-avatar>
                        <el-avatar :size="37" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
                      </el-col>
                      <el-col :span="20" style="margin-left:10px">
                        <el-input v-model="comment2From.content" placeholder="请输入内容"></el-input>
                      </el-col>
                      <el-col :span="2" style="margin-left:10px">
                        <el-button @click="submitComment2(comment.id,i1,i2)">发布
                        </el-button>
                      </el-col>
                    </el-row>
                    <!-- 二级评论 -->
                    <el-row style="margin-top:20px" v-for="(item2,i3) in comment.list" :key="item2.id">
                      <el-col :span="1">
                        <router-link :to="'/'+item2.authorName" v-if="item2.authorName != null">
                          <el-avatar :size="37" :src="item2.authorImg" shape="square"></el-avatar>
                        </router-link>
                        <el-avatar :size="37" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
                      </el-col>
                      <el-col :span="22" style="margin-left:10px">
                        <div class="author-name" v-if="item2.authorName != null">{{item2.authorName}}</div>
                        <div class="author-name" v-else>游客</div>
                          <div style="font-size : 13px"><span><a href="">@{{item2.userName}}</a></span>     <span style="color:black" >{{item2.content}}</span></div>
                          <div class="article-info">
                            <a href="javascript:void(0);"><span class="el-icon-thumb el-icon" @click="like(item2.id,i1,i2,i3,2)"></span></a>    点赞数：{{item2.likeCount}}
                              <el-popover
                                placement="bottom" width="800">
                                <el-row style="margin-top:20px">
                                <el-col :span="1">
                                  <el-avatar :size="37" :src="userInfo.imgUrl" shape="square" v-if="userInfo.imgUrl != ''"></el-avatar>
                                  <el-avatar :size="37" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" shape="square" v-else></el-avatar>
                                </el-col>
                                <el-col :span="20" style="margin-left:10px">
                                  <el-input v-model="comment2From.content" :placeholder="'@'+item2.userName"></el-input>
                                </el-col>
                                <el-col :span="1" style="margin-left:10px">
                                  <el-button @click="submitComment2(comment.id,i1,i2,item2.authorName)">提交</el-button>
                                </el-col>
                              </el-row>
                                <a href="javascript:void(0);"  slot="reference"><span class="el-icon-chat-dot-square el-icon"></span></a>
                              </el-popover>回复
                            发布于：{{item2.fromDate}}
                          </div>
                      </el-col>
                    </el-row>
                  </div>
                </transition>
              </el-col>
              </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    </el-col>
    <el-col :span="4">
    </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {
        id: '',
        name: '',
        imgUrl: '',
        token: ''
      },
      id: '',
      questionContent: '',
      answer: [],
      user: '',
      answerFrom: {
        askId: '',
        userId: '',
        content: ''
      },
      commentFrom: {
        Id: '',
        authorId: '',
        content: ''
      },
      comment2From: {
        comment: '',
        id: '',
        authorId: '',
        targetName: ''
      },
      commentList: []
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getArticle()
    this.getUserInfo()
    console.log(this.userInfo)
  },
  methods: {
    async like (id, i1, i2, i3, type) {
      const { data: res } = await this.$http.get('like/' + id)
      this.$message.success('点赞成功')
      if (res.data.type === 1) {
        this.item.comments.like = res.data.count
      } else {
        if (type === 1) {
          this.answer[i1].comments[i2].likeCount = res.data.count
        } else {
          this.answer[i1].comments[i2].list[i3].likeCount = res.data.count
        }
      }
    },
    async getcomment (id, i1, i2, flag) {
      if (flag === 0) {
        this.answer[i1].comments[i2].show = !this.answer[i1].comments[i2].show
      }
      if (this.answer[i1].comments[i2].show === true) {
        const { data: res } = await this.$http.get('comment/' + id)
        if (res.code === 200) {
          this.answer[i1].comments[i2].list = res.data
          console.log(res.data)
        }
      }
    },
    async submitComment2 (id, i1, i2, name) {
      if (this.comment2From.content === '') {
        this.$message.error('内容不能为空')
        return
      }
      this.comment2From.id = id
      this.comment2From.targetName = name
      this.comment2From.authorId = window.localStorage.getItem('token')
      const { data: res } = await this.$http.post('submitComment', this.comment2From)
      if (res.code === 200) {
        this.$message.success('评论成功')
        this.comment2From.content = ''
        this.getcomment(id, i1, i2, 1)
      }
    },
    async getComment (id, index) {
      const { data: res } = await this.$http.get('comment/' + id)
      if (res.code === 200) {
        console.log(res)
        this.answer[index].comments = res.data
      }
    },
    async submitComment (id, index) {
      if (this.commentFrom.content === '') {
        this.$message.error('内容不能为空')
        return
      }
      this.commentFrom.id = id
      this.commentFrom.authorId = window.localStorage.getItem('token')
      const { data: res } = await this.$http.post('submitComment', this.commentFrom)
      if (res.code === 200) {
        this.$message.success('评论成功')
        this.commentFrom.content = ''
        // this.getArticle()
        this.getComment(id, index)
      }
    },
    async getUserInfo () {
      const token = window.localStorage.getItem('token')
      if (token !== null) {
        const { data: res } = await this.$http.get('user/' + token)
        if (res.code === 200) {
          console.log(res)
          this.userInfo = res.data
          this.loginStatus = true
        }
      }
    },
    async answerCommit () {
      this.answerFrom.userId = window.localStorage.getItem('token')
      const { data: res } = await this.$http.post('answer', this.answerFrom)
      if (res.code === 200) {
        this.$message.success('发布成功')
        this.answerFrom = {}
        this.getArticle()
      } else {
        this.$message.error('发布失败')
      }
    },
    $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      this.$http({
        url: 'upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        const _res = res.data
        this.$refs.md.$img2Url(pos, _res.data)
        console.log(res)
      })
    },
    async getArticle () {
      const { data: res } = await this.$http.get('question/' + this.id)
      if (res.code === 200) {
        this.questionContent = res.data.askquestionsDTO
        this.answer = res.data.answerDTOS
        this.user = res.data.askquestionsDTO.user
        this.answerFrom.askId = this.questionContent.id
        console.log(this.answer)
      }
    }
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
.comment-item {
  padding: 15px 0px;
}
.comment-button {
  margin-left: 10px;
  height: 54px;
}
.author-name{
  color: #76839b;
}
.name {
  margin-left: 20px;
  padding-top:30px;
  font-size: 15px;
}
.answer-name {
  margin-left: 10px;
   font-size: 16px;
}
.answer-user-avatar {
  margin-bottom: -4px;
}
.desc-ouder {
  word-wrap:break-word ;
}
.user-avatar {
  margin-top: 10px;
  margin-bottom: -26px;
  margin-left: 10px;
}
.info {
  margin-left: 70px;
  margin-top: 5px;
  font-size: 13px;
  color: gray;
}
.edit-but {
  float: right;
  margin: 15px 20px 0px 0px;
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
.el-card {
  margin: 8px 0px;
}
.desc {
  word-wrap:break-word ;
}
</style>
