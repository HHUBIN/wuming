<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="always">
      <el-image :src="registForm.bgUrl" class="head-img park" fit="cover"></el-image>
      <el-avatar shape="square" :size="150" :src="registForm.imgUrl" class="park el-avatar-user"></el-avatar>
      <h1 class="info-name">{{registForm.name}}</h1>
      <div class="desc-ouder">
        <span>个人简介：{{registForm.description}}
          <el-button class="edit-but park" @click="loginOut" v-if="registForm.id == userId">退出登录</el-button>
          <el-button class="edit-but park" @click="RegistDialogVisible = !RegistDialogVisible" v-if="registForm.id == userId">编辑个人资料</el-button>
        </span>
      </div>
    </el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知" name="first" v-if="registForm.id == userId">
        <el-card class="park">
          <div class="park">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in noticeList"
                :key="index"
                :color="activity.readStuate == 0 ? '#0bbd87' : '#8c939d'"
                :timestamp="activity.createTime">
                <el-avatar shape="square" :size="30" :src="activity.authorImg" class="park user-avatar"></el-avatar>
                <span class="article-info">{{activity.authorName}}评论了</span>
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="文章" name="second">
        <!-- 文章 -->
        <div></div>
        <el-card shadow="hover" class="park"  v-for="item in list" :key="item.id" :body-style="{ padding: '10px' }">
          <el-avatar shape="square" :size="35" :src="item.user.imgUrl" class="park user-avatar"></el-avatar>
          <span class="name" v-if="item.user !== null">{{item.user.name}}</span>
          <span class="name" v-else>游客</span>
          <br/>
          <el-link type="success" :href="'http://www.hhhbin.com/#/article/'+item.id" target="_blank">
            <h1 class="title">
                {{item.title}}
            </h1>
          </el-link>
          <div><el-link type="success" :href="'http://www.hhhbin.com/#/article/'+item.id" target="_blank">{{item.content}}...</el-link></div>
          <div class="article-info">
            浏览数 ：{{item.viewCount}}        点赞数：{{item.likeCount}}        评论数：{{item.commentCount}}          创建时间：{{item.createTime}}
            <el-popconfirm
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="你确定要删除吗？"
              @onConfirm="deleteArticle(item.id)"
              class="edit-but"
              v-if="registForm.id == userId"
            >
            <!-- <el-button slot="reference">删除</el-button> -->
              <el-button type="primary" icon="el-icon-delete" size="mini" slot="reference"></el-button>
            </el-popconfirm>
            <el-button type="primary" icon="el-icon-edit" size="mini" class="edit-but" @click="toEditor(item.id)" v-if="registForm.id == userId"></el-button>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="提问" name="third">
        <div></div>
        <el-card shadow="hover" class="park"  v-for="item in questionList" :key="item.id" :body-style="{ padding: '10px' }">
          <router-link :to="'/'+item.user.name" v-if="item.user !== null">
            <el-avatar shape="square" :size="35" :src="item.user.imgUrl" class="park user-avatar"></el-avatar>
          </router-link>
          <el-avatar shape="square" :size="35" src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019" class="park user-avatar" v-else></el-avatar>
          <span class="name" v-if="item.user !== null">{{item.user.name}}</span>
          <span class="name" v-else>游客</span>
          <br/>
            <el-link type="success" :href="'http://www.hhhbin.com:8080/#/question/'+item.id" target="_blank">
              <h1 class="title">
                  {{item.content}}
              </h1>
            </el-link>
          <div class="article-info"> 回答数：{{item.commentCount}}          创建时间：{{item.createTime}}</div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
<!-- 注册对话框 -->
    <el-dialog
      :visible.sync="RegistDialogVisible"
      width="40%"
      :before-close="registHandleClose"
      center
      :status-icon=true
      title="编辑个人资料"
    >
      <el-form :model="registForm" :rules="registRules" ref="registFormRef" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registForm.name" placeholder="长度在 1 到 20 个字符"></el-input>
        </el-form-item>
        <div style="margin-left:35px">
            头像
          <el-upload
            class="avatar-uploader "
            action="http://www.hhhbin.com:8888/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="registForm.imgUrl" :src="registForm.imgUrl" class="editor-avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="margin-left:35px">
            背景图片
          <el-upload
            class="avatar-uploader"
            action="http://www.hhhbin.com:8888/upload"
            :show-file-list="false"
            :on-success="handleSuccess">
            <img v-if="registForm.bgUrl" :src="registForm.bgUrl" class="editor-avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="性别">
          <el-radio v-model="registForm.gender" label="0">男</el-radio>
          <el-radio v-model="registForm.gender" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registForm.password" autocomplete="off" placeholder="长度在 6 到 20 个字符"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registForm.checkPass" autocomplete="off" placeholder="长度在 6 到 20 个字符"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="registForm.email"></el-input>
        </el-form-item>
         <!-- <el-form-item prop="emailCode">
          <el-input placeholder="验证码" v-model="registForm.emailCode">
            <el-button slot="append" icon="el-icon-s-promotion" @click="sendEmailCode" type="text">点击发送验证码</el-button>
          </el-input>
        </el-form-item> -->
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="registForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">提交修改</el-button>
          <el-button @click="resetRegistForm">重置</el-button>
          <el-button @click="RegistDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.checkPass !== '') {
          this.$refs.registFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userId: '',
      list: [],
      questionList: [],
      noticeList: [],
      RegistDialogVisible: false,
      activeName: 'second',
      userInfo: '',
      registForm: {
        id: '',
        name: '',
        imgUrl: '',
        bgUrl: '',
        accountId: null,
        gender: '0',
        password: '',
        checkPass: '',
        email: '',
        emailCode: '',
        description: ''
      },
      // 注册表单的验证规则
      registRules: {
        name: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        emailCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.registForm.name = this.$route.params.id
    this.editorInfo()
    this.getUser()
  },
  methods: {
    loginOut () {
      window.localStorage.setItem('token', null)
      this.$router.go(0)
    },
    async getUser () {
      const token = window.localStorage.getItem('token')
      if (token !== null) {
        const { data: res } = await this.$http.get('user/' + token)
        if (res.code === 200) {
          this.userId = res.data.id
        }
      }
    },
    async getNotice () {
      const { data: res } = await this.$http.get('comments/' + this.registForm.id)
      if (res.code === 200) {
        this.noticeList = res.data
        console.log(this.noticeList)
      }
    },
    async getQuestionList () {
      const { data: res } = await this.$http.get('questions/' + this.registForm.id)
      if (res.code === 200) {
        this.questionList = res.data
      }
    },
    toEditor (id) {
      this.$router.push('editor/' + id)
    },
    async deleteArticle (id) {
      const { data: res } = await this.$http.delete('article/' + id)
      if (res.code === 200) {
        this.$message.success('删除成功')
        const { data: result } = await this.$http.get('articles/' + this.registForm.id)
        this.list = result.data
      }
    },
    async getList () {
      const { data: res } = await this.$http.get('articles/' + this.registForm.id)
      if (res.code === 200) {
        this.list = res.data
      }
    },
    handleAvatarSuccess (res, file) {
      this.registForm.imgUrl = res.data
    },
    handleSuccess (res, file) {
      this.registForm.bgUrl = res.data
    },
    async editorInfo () {
      const { data: res } = await this.$http.post('user', this.registForm)
      if (res.code === 200) {
        this.registForm = res.data
        this.registForm.checkPass = res.data.password
        this.getList()
        this.getQuestionList()
        this.getNotice()
      }
    },
    async getUserInfo () {
      const { data: res } = await this.$http.get('user/' + this.registForm.id)
      if (res.code === 200) {
        this.userInfo = res.data
      }
    },
    handleClick () {
    },
    registHandleClose (done) {
      this.$refs.registFormRef.resetFields()
      done()
    },
    resetRegistForm () {
      this.$refs.registFormRef.resetFields()
    },
    async sendEmailCode () {
      if (this.registForm.email === '') {
        this.$alert('请输入邮箱', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      const { data: res } = await this.$http.get('emailCode/' + this.registForm.email)
      if (res.code === 201) {
        this.$alert('验证码已经发送至你的邮箱，有效期两分钟', '提示', {
          confirmButtonText: '确定'
        })
        console.log(res)
      } else {
        this.$alert('验证码发送失败', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    register () {
      this.$refs.registFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('user', this.registForm)
        if (res.code === 200 && res.data.name !== this.$route.params.id) {
          this.$message.error('用户名已经使用，请你修改用户名')
          return
        }
        const { data: result } = await this.$http.post('register', this.registForm)
        if (result.code === 202) {
          this.$message.success('修改成功')
          this.$router.push('/' + this.registForm.name)
          this.RegistDialogVisible = false
        } else {
          this.$message.error('验证码错误')
        }
        console.log(result)
      })
    }
  }
}
</script>
<style scoped>
.user-avatar {
  margin-bottom: -4px;
}
.head-img {
  width: 100%;
  height: 250px;
}
.el-avatar-user {
  border: 5px solid white;
  position: absolute;
  top: 250px;
  left: 420px;
}
.info-name {
  margin-left: 200px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 35px;
}
.desc-ouder {
  padding: 8px 0px 20px 200px;
  word-wrap:break-word ;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 50px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align-last: center;
  }
  .editor-avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.dese {
  word-wrap:break-word ;
}
.edit-but {
  float: right;
  margin: 5px;
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
</style>
