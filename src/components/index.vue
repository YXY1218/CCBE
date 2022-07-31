<template>
 <el-container class="home-container">
   <!--头部区域-->
  <el-header>
      <div>
        <img src="#" alt="logo">
        <span>网站名称</span>
      </div>
      <div >
      <el-button type="info" @click="login">登录</el-button>
      <!--<el-button type="info" @click="login" style="float: right">注册</el-button>-->
      <el-button type="info" @click="help" style="margin-right:10px">帮助</el-button>
      </div>
  </el-header>
  <!--页面主体区-->
  <el-main>
    <div class="main">
    <div class="img">
    <img src="./title.jpg" style="max-width: 545px;" class="img-responsive center-block" alt="全球中国英语共同体" title="全球中国英语共同体">
  <br>
  </div>
  <div class="search">
  <el-input placeholder="请输入内容" v-model="input3" class="input">
     <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
   </div>
   </div>
  </el-main>
  <!--尾部区-->
  <el-footer>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="copyright">
           <div class="copy-side">北京科技大学
           </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item item-apps" style="width: 32%">
          <dl>
            <dt>简介</dt>
            <dd><el-link href="#" type="info">此网站</el-link></dd>
            <dd><el-link href="#" type="info">关于我们</el-link></dd>
            <dd><el-link href="#" type="info">友情链接</el-link></dd>
            <dd><el-link href="#" type="info">联系我们</el-link></dd>
          </dl>
        </div>
        </el-col>
        <el-col :span="6">
          <div class="item item-apps" style="width: 32%">
          <dl>
            <dt>帮助</dt>
            <dd><el-link href="#" type="info">功能介绍</el-link></dd>
            <dd><el-link href="#" type="info">检索示例</el-link></dd>
            <dd><el-link href="#" type="info">检索说明</el-link></dd>
          </dl>
         </div>
        </el-col>
        <el-col :span="6">
          <div class="item item-apps" style="width: 32%">
          <dl>
            <dt>微信</dt>
              <a class="thumbnail" style="border:1px solid #FFF;">
                <img src="#" width="115">
              </a>
            </dl>
         </div>
        </el-col>
      </el-row>
    </el-card>
  <div class="footer">
   <div class="footer2">
        <p>Powered by <a href="http://www.bootcss.com/">Bootstrap</a>.</p>
        <p><a href="https://www.ustb.edu.cn/">北京科技大学</a></p>
  </div>
  </div>
  </el-footer>
</el-container>
</template>

<script>
export default {
  data () {
   return {
      input3: '',
      //获取搜索的值
      queryInfo: {
        keyword: '',
        variety: '',
        pageNo: 1,
        pageSize: 8
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const{ data: res } = await this.$http.get('http://43.251.224.187:8080',{ 
        params: this.queryInfo
        })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  text-align: center;
  background-color: #efebeb;
  border-color: #813939;
  display: flex;
  justify-content: space-between;
  padding-left: 5;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-main {
  >.img>img{
    display:block;
    margin:0 auto;
  }
  >.search{
    width: 35%;
    display: block;
    margin:0 auto;
  }
  display: flex;
  height: 100%;
  width: 100%;
  line-height: 100px;
  text-align: center;
  >.main{
    align-self: center;
    margin: 0 auto;
    text-align: center;
  }
}
.el-footer {
  >.footer{
     width: 100%;
     height: 100%;
  }
  >.footer>.footer2{
    margin: 0 auto;
    text-align: center;
  }
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  >.box-card>.el-link {
    type-style: solid;
  }
}
</style>
