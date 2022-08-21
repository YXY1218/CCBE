<!--import "/mock/index.js"-->
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
  <el-input placeholder="请输入内容" v-model="queryInfo.keyword" class="input3">
    <!-- 
      <el-select v-model="queryInfo.variety" slot="prepend" placeholder="请选择">
      <el-option label="所有" value="ALL"></el-option>
      <el-option label="中国大陆" value="cn"></el-option>
      <el-option label="中国香港" value="hk"></el-option>
      <el-option label="中国澳门" value="mo"></el-option>
      <el-option label="中国台湾" value="tw"></el-option>
      <el-option label="新加坡" value="sg"></el-option>
      <el-option label="马来西亚" value="my"></el-option>
    </el-select> 
    -->
    <el-select v-model="queryInfo.select" slot="prepend" placeholder="请选择">
      <el-option label="精确查询" value="match"></el-option>
      <el-option label="模糊查询" value="fuzzy"></el-option>
    </el-select> 
    <el-button slot="append" icon="el-icon-search" @click="drawer = true; getUserList ()" target="_blank"></el-button>
  </el-input>
  
<el-drawer
  title="统计数量"
  :visible.sync="drawer"
  size="100%">
  <div>
<el-table
    :data="Frequency"
    style="width: 100%"
    align="center"
    >
    <!--统计数量-->
    <!-- <el-table-column prop="all" label="所有" width="217" align="center" value="all">
      <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeAll()">{{scope.row.all}}</a>
           </div>
      </template> 
    </el-table-column> -->
    <el-table-column prop="cn" label="中国大陆" width="255" align="center">
      <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeCn()">{{scope.row.cn}}</a>
           </div>
      </template> 
    </el-table-column>
    <el-table-column prop="hk" label="中国香港" width="247" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeHk()">{{scope.row.hk}}</a>
           </div>
      </template> 
    </el-table-column>
    <el-table-column prop="mo" label="中国澳门" width="247" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeMo()">{{scope.row.mo}}</a>
           </div>
      </template> 
    </el-table-column>
    <el-table-column prop="tw" label="中国台湾" width="247" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeTw()">{{scope.row.tw}}</a>
           </div>
      </template> 
    </el-table-column>
    <el-table-column prop="sg" label="新加坡" width="247" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeSg()">{{scope.row.sg}}</a>
           </div>
      </template> 
    </el-table-column>
    <el-table-column prop="my" label="马来西亚" width="255" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;varietyChangeMy()">{{scope.row.my}}</a>
           </div>
      </template> 
    </el-table-column>
  </el-table>

  <el-drawer
  :visible.sync="innerDrawer"
  size="100%">
  <div>
   <el-table
   :data="userlist"
    style="width: 100%"
   max-height="500"
   stripe>
     <el-table-column type="index"></el-table-column>
     <el-table-column label="查询范围" prop="variety"></el-table-column>
     <el-table-column label="文本地址" prop="url"></el-table-column>
     <el-table-column label="文本内容" prop="content" fit="false" >
       <template slot-scope="scope">
       <!--<div v-html='scope.row.content'></div>-->
       <!--设置本列多余数据隐藏显示及高亮-->
     <el-popover placement="top-start" width="400" trigger="hover">
      <div v-html='scope.row.content'></div>
      <div slot="reference" v-html='scope.row.content.substr(1,50)'></div>
     </el-popover>
     </template>
     </el-table-column>
   </el-table>
   <!--分页区-->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryInfo.pageNo"
      :page-size="queryInfo.pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
</el-pagination>
  </div>
  </el-drawer>
  </div>
</el-drawer>
   </div>
   <!-- <el-table
   :data="userlist"
    style="width: 100%"
   max-height="550">
     <el-table-column type="index"></el-table-column>
     <el-table-column label="查询范围" prop="variety"></el-table-column>
     <el-table-column label="文本地址" prop="url"></el-table-column>
     <el-table-column label="文本内容" prop="content" fit="false"></el-table-column>
   </el-table> -->
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
const axios = require('axios')
export default {
  data () {
    return {
      input3: '', // 获取搜索的值
      queryInfo: {
        keyword: '',
        variety: '',
        pageNo: 1,
        pageSize: 10,
        select: ''
      },
      userlist: [],
      Frequency: [],
      total: 0,
      drawer: false,
      innerDrawer: false,
      disabled: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      // window.open('./searchWeb.vue')
      const keyword = this.queryInfo.keyword
      const variety = this.queryInfo.variety
      const pageNo = this.queryInfo.pageNo
      const pageSize = this.queryInfo.pageSize
      const select = this.queryInfo.select
      console.log(this.input3)
      console.log(this.queryInfo)
      // const { data: res } = await this.$http.get('http://43.251.224.187:8080', {
      //   params: this.queryInfo
      // })fuzzy
      axios.get('http://localhost:8080/search/' + select + '/' + variety + '/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
        console.log(response.data)
        this.userlist = response.data.DocumentList
        this.total = response.data.TotalHits
      })
      axios.get('http://localhost:8080/count/' + select + '/' + keyword).then(response => {
        console.log(response.data)
        this.Frequency = response.data.Frequency
      })

      /* axios.get('http://43.251.224.187:8080/search/match/' + variety + '/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
        console.log(response.data)
      }) */
    },
    handleSizeChange(newSize) {
       console.log(newSize)
       this.queryInfo.pageSize = newSize
       this.getUserList()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pageNo = newPage
      this.getUserList()
    },
    varietyChangeCn(){
      // console.log(newVariety)
      this.queryInfo.variety = 'cn';
      this.getUserList()
    },
    varietyChangeHk(){
      // console.log(newVariety)
      this.queryInfo.variety = 'hk';
      this.getUserList()
    },
    varietyChangeMo(){
      // console.log(newVariety)
      this.queryInfo.variety = 'mo';
      this.getUserList()
    },
    varietyChangeTw(){
      // console.log(newVariety)
      this.queryInfo.variety = 'tw';
      this.getUserList()
    },
    varietyChangeSg(){
      // console.log(newVariety)
      this.queryInfo.variety = 'sg';
      this.getUserList()
    },
    varietyChangeMy(){
      // console.log(newVariety)
      this.queryInfo.variety = 'my';
      this.getUserList()
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
  padding-left: 5px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-main {
  >.img>img{
    display:block;
    margin:0 auto;
  }
  .search{
    width: 100%;
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
  .el-select{
    width: 130px;
  }
  .el-pagination {
  margin-top: 15px;
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