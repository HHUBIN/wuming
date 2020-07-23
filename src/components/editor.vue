<template>
  <div>
    <el-input
      v-model="contentForm.title"
      class="park"
      placeholder="标题"
    ></el-input>
    <div class="park label-select">
      <el-tag
        closable
        class="el-tag-select"
        v-for="tag in contentForm.label"
        :key="tag.id"
        effect="plain"
        type="success"
        @click="select(tag)"
        @close="handleClose(tag)"
        >{{ tag.name }}</el-tag
      >
    </div>
    <el-collapse>
      <el-collapse-item title="点击选择标签" class="park">
        <div class="park">
          <button
            v-for="tag in labels"
            :key="tag.id"
            @click="select(tag)"
            class="tag-button"
          >
            <el-tag type="success" effect="plain">
              {{ tag.name }}
            </el-tag>
          </button>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 新建</el-button
          >
        </div>
      </el-collapse-item>
    </el-collapse>
    <div id="main">
      <mavon-editor
        v-model="contentForm.content"
        :ishljs="true"
        ref="md"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        codeStyle="github-gist"
      />
    </div>
    <el-button
      type="success"
      class="success-button park editor-title"
      @click="submit"
      ><h1>发 布</h1></el-button
    >
  </div>
</template>
<script>
export default {
  data () {
    return {
      labels: '',
      inputVisible: false,
      inputValue: '',
      contentForm: {
        type: '',
        token: '',
        title: '',
        label: [],
        content: ''
      }
    }
  },
  created () {
    const token = window.localStorage.getItem('token')
    this.contentForm.token = token
    if (token === '' || token === null) {
      this.open()
    }
    this.getLabel()
    this.contentForm.type = this.$route.params.type
    if (this.contentForm.type !== 'article') {
      this.getArticle()
    }
  },
  methods: {
    async getArticle () {
      const { data: res } = await this.$http.get(
        'article/' + this.contentForm.type
      )
      console.log(res)
      this.contentForm.title = res.data.title
      var i
      for (i = 0; i < res.data.labels.length; i++) {
        for (var j = 0; j < this.labels.length; j++) {
          if (res.data.labels[i].id === this.labels[j].id) {
            this.select(this.labels[j])
          }
        }
      }
      this.contentForm.content = res.data.content
    },
    async submit () {
      if (this.contentForm.title === '') {
        this.$alert('标题不能为空', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      if (this.contentForm.content === '') {
        this.$alert('内容不能为空', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      console.log(this.contentForm)
      const { data: res } = await this.$http.post('submit', this.contentForm)
      if (res.code === 200) {
        this.$message.success('发布成功')
        this.$router.push('/article/' + res.data)
      } else {
        this.$message.error('发布失败')
      }
    },
    open () {
      this.$alert('你当前未登录，确定要游客身份发布吗', '提示', {
        confirmButtonText: '确定'
      })
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        // this.labels.push(inputValue)
        const { data: res } = await this.$http.get('newlabel/' + inputValue)
        if (this.labels.length === res.data.length) {
          this.$message.error('标签已存在')
        } else {
          this.labels = res.data
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClose (tag) {
      this.contentForm.label.splice(this.contentForm.label.indexOf(tag), 1)
    },
    select (tag) {
      if (this.contentForm.label.indexOf(tag) === -1) {
        this.contentForm.label.push(tag)
      }
    },
    async getLabel () {
      const { data: res } = await this.$http.get('label')
      this.labels = res.data
    },
    $imgAdd (pos, $file) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
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
        loading.close()
      })
    },
    $imgDel (pos) {
      console.log('dfshjkhasdfgjkhjkdfg')
    }
  }
}
</script>
<style scoped>
.label-select {
  border: 2px solid gray;
}
.el-tag {
  margin: 0px;
}
.el-tag-select {
  margin: 5px;
}
.tag-button {
  margin: 5px;
  padding: 0px;
  border: 0px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.success-button {
  width: 100%;
  height: 80px;
}
.v-show-content .scroll-style .scroll-style-border-radius {
  background-color: white;
}
</style>
