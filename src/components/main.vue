<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="head">
        <el-row>
          <el-col :span="5"></el-col>
          <el-col :span="0.5">
            <el-link
              type="success"
              href="http://www.hhhbin.com"
              :underline="false"
            >
              <img class="logo" src="../assets/img/logo.jpg" />
            </el-link>
          </el-col>
            <el-col :span="4">
            <el-link
              type="success"
              href="http://www.hhhbin.com"
              :underline="false"
            >
              <h1 style="padding-top:-10px">社区</h1>
            </el-link>
          </el-col>
          <el-col :span="6">
            <!-- <div style="margin-top: 7px;" class="park">
              <el-input placeholder="请输入内容" v-model="search">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div> -->
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="1">
            <!-- <div class="el-icon-message-solid"></div> -->
          </el-col>
          <el-col :span="1" v-if="loginStatus">
            <router-link :to="'/' + userInfo.name">
              <span class="el-icon-message-solid park"></span>
            </router-link>
            <el-badge
              :value="notice"
              class="item"
              v-if="notice != 0"
            ></el-badge>
          </el-col>
          <el-col :span="1" v-if="loginStatus" class="head-img">
            <router-link :to="'/' + userInfo.name">
              <el-avatar
                shape="square"
                :size="38"
                src="https://communityimg.cn-bj.ufileos.com/16f364c5-7e6d-4c0a-b554-c77da6b758fd.jpg?UCloudPublicKey=TOKEN_28669bbe-ba15-425a-a538-a2127d75f03d&Signature=2AgLBQppxzZPlLQk3vdnF%2BTALNg%3D&Expires=1619540019"
                v-if="userInfo.imgUrl == null"
                class="park"
              ></el-avatar>
              <el-avatar
                shape="square"
                :size="38"
                :src="userInfo.imgUrl"
                class="park"
                v-else
              >
              </el-avatar>
            </router-link>
          </el-col>
          <el-col :span="3" v-else>
            <el-button
              type="primary"
              size="small"
              class="head-but park"
              @click="dialogVisible = !dialogVisible"
              >登 录</el-button
            >
            <el-button
              size="small"
              class="head-but park"
              @click="RegistDialogVisible = true"
              >注 册</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-header>
    <!-- 内容区域 -->
    <el-container>
      <!-- <el-row>
        <el-col :xs="0" :sm="1" :md="3" :lg="4" :xl="5">
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" style="align:center">
          <router-view></router-view>
        </el-col>
        <el-col :xs="0" :sm="0" :md="0" :lg="5" :xl="5" style="align:center">
        </el-col>
      </el-row> -->
      <el-aside width="400px"></el-aside>
      <el-main>
        <div width="1103px" height="100%">
          <router-view></router-view>
        </div>
      </el-main>
      <el-aside width="400px"></el-aside>
    </el-container>

    <!-- 登录对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <div class="login-input">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="name">
            <el-input
              placeholder="用户名/邮箱"
              prefix-icon="el-icon-s-custom"
              v-model="loginForm.name"
              class="login-username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-unlock"
              v-model="loginForm.password"
              class="login-username"
              type="password"
            ></el-input>
          </el-form-item>
          <div>其他方式授权登录：</div>
          <el-button class="github-button" @click="href">
            <img src="../assets/img/social_github.png" class="github-img" />
          </el-button>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>

    <!-- 注册对话框 -->
    <el-dialog
      :visible.sync="RegistDialogVisible"
      width="40%"
      :before-close="registHandleClose"
      center
      :status-icon="true"
    >
      <el-form
        :model="registForm"
        :rules="registRules"
        ref="registFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="registForm.name"
            placeholder="长度在 1 到 20 个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="registForm.gender" label="0">男</el-radio>
          <el-radio v-model="registForm.gender" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registForm.password"
            autocomplete="off"
            placeholder="长度在 6 到 20 个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registForm.checkPass"
            autocomplete="off"
            placeholder="长度在 6 到 20 个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="emailCode">
          <el-input placeholder="验证码" v-model="registForm.emailCode">
            <el-button
              slot="append"
              icon="el-icon-s-promotion"
              @click="sendEmailCode"
              type="text"
              >点击发送验证码</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="registForm.description"></el-input>
          <div>GitHub无需注册直接登录：</div>
          <el-button class="github-button" @click="href">
            <img src="../assets/img/social_github.png" class="github-img" />
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">立即注册</el-button>
          <el-button @click="resetRegistForm">重置</el-button>
          <el-button @click="RegistDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
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
      notice: 0,
      loginStatus: false,
      userInfo: {
        id: '',
        name: '',
        imgUrl: '',
        token: ''
      },
      githubUrl:
        'https://github.com/login/oauth/authorize?client_id=52787f4def1351a6ae25&state=0&redirect_uri=http://www.hhhbin.com:8888/callback',
      search: '',
      dialogVisible: false,
      RegistDialogVisible: false,
      checkPass: '',
      loginForm: {
        name: '',
        password: ''
      },
      registForm: {
        name: '',
        gender: '0',
        password: '',
        checkPass: '',
        email: '',
        emailCode: '',
        description: ''
      },
      // 这是登录表单的验证规则对象
      loginFormRules: {
        name: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
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
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        emailCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getNoticeCount () {
      const { data: res } = await this.$http.get(
        'noticecount/' + this.userInfo.id
      )
      if (res.code === 200) {
        this.notice = res.data
        console.log(res.data)
      }
    },
    async getUserInfo () {
      const token = window.localStorage.getItem('token')
      if (token !== null) {
        const { data: res } = await this.$http.get('user/' + token)
        console.log(res)
        if (res.code === 200) {
          this.userInfo = res.data
          this.loginStatus = true
          this.getNoticeCount()
        }
      }
    },
    async getUser (token) {
      if (token === '') {
        this.$message.error('登录失败，请查看你是否能查看github.com')
        this.dialogVisible = false
        this.RegistDialogVisible = false
        return
      }
      const { data: res } = await this.$http.get('user/' + token)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('登录成功')
        this.loginStatus = true
        this.dialogVisible = false
        this.RegistDialogVisible = false
        window.localStorage.setItem('token', res.data.token)
        this.userInfo = res.data
      }
    },
    href () {
      const that = this
      window.open(
        this.githubUrl,
        'newwindow',
        'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
      )
      window.addEventListener(
        'message',
        function (e) {
          console.log(e)
          if (that.loginStatus === false) {
            if (
              e.origin === 'http://127.0.0.1:8888' ||
              e.origin === 'http://localhost:8888' ||
              e.origin === 'http://www.hhhbin.com:8888'
            ) {
              that.getUser(e.data)
              console.log(e.data)
            }
          }
        },
        false
      )
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.code === 200) {
          this.$message.success('登录成功')
          this.dialogVisible = false
          this.loginStatus = true
          window.localStorage.setItem('token', res.data.token)
        } else {
          this.$message.error('账号或密码错误')
        }
        this.userInfo = res.data
        this.$router.go(0)
      })
    },
    handleClose (done) {
      this.$refs.loginFormRef.resetFields()
      done()
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
      const { data: res } = await this.$http.get(
        'emailCode/' + this.registForm.email
      )
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
        if (res.code === 200) {
          this.$message.error('用户名已经使用，请你修改用户名')
          return
        }
        const { data: result } = await this.$http.post(
          'register',
          this.registForm
        )
        if (result.code === 202) {
          this.$message.success('注册成功')
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
.head {
  height: 55px;
  box-shadow: 1px 0px 1px #999, 0 0 6px rgba(0, 0, 0, 0.04);
  size: 50px;
}
.el-header {
  padding: 0px;
}
.el-col {
  height: 55px;
}
.el-icon-message-solid {
  padding-top: 13px;
  font-size: 30px;
}
h1 {
  display: inline;
  font-size: 40px;
  color: #3f3f3f;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.head-but {
  margin-top: 13px;
}
.login-input {
  padding: 0px 35px;
}
.github-img {
  width: 50px;
}
.el-input {
  width: 350px;
}
.github-button {
  padding: 3px 5px;
}
.el-icon-message-solid {
  font-size: 35px;
  padding-top: 13px;
  color: #606266;
}
.head-img {
  padding-top: 10px;
}
.el-main {
  padding: 0px;
}
.item {
  position: absolute;
  top: 10px;
  left: 1410px;
  width: 20px;
  height: 20px;
  z-index: 1000;
}
.logo {
  padding-top: 5px;
  width: 45px;
  height: 45px;
}
</style>
