<!--import "/mock/index.js"-->
<template>
 <el-container class="home-container">
   <!--头部区域-->
  <el-header>
      <div>
        <img src="#" alt="">
        <span><el-button round>Corpus of Chinese-based Englishes(COCE)</el-button></span>
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
    <img src="./title.jpg" style="max-width: 545px;" class="img-responsive center-block" alt="COCE" title="Corpus of Chinese-based Englishes">
  </div>
  <div class="search">
  <el-input placeholder="Please enter the content" v-model="queryInfo.keyword" class="input3" @keyup.enter.native="drawer = true; matchCount()">
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
    <el-select v-model="queryInfo.select" slot="prepend" placeholder="请选择" >
<!--      <el-option label="精确查询" value="match"></el-option>-->
<!--      <el-option label="模糊查询" value="fuzzy"></el-option>-->
      <el-option v-for="item in selectList" :key="item.key" :label="item.label" :value="item.value"/>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="drawer = true; matchCount()" target="_blank"></el-button>
  </el-input>

<el-drawer
  title="Frequency"
  :visible.sync="drawer"
  size="100%">
  <div>
<el-table
    :data="Frequency"
    style="width: 100%"
    align="center"
    >
    <!--统计数量-->
     <el-table-column label="All" width="170" align="center" value="all">
      <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('ALL')">{{scope.row.cn+scope.row.hk+scope.row.mo+scope.row.my+scope.row.tw+scope.row.sg}}</a>
           </div>
      </template>
    </el-table-column>
    <el-table-column prop="cn" label="Mainland" width="200" align="center">
      <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('cn')">{{scope.row.cn}}</a>
           </div>
      </template>
    </el-table-column>
    <el-table-column prop="hk" label="Hong Kong" width="200" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('hk')">{{scope.row.hk}}</a>
           </div>
      </template>
    </el-table-column>
    <el-table-column prop="mo" label="Macao" width="200" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('mo')">{{scope.row.mo}}</a>
           </div>
      </template>
    </el-table-column>
    <el-table-column prop="tw" label="Taiwan" width="200" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('tw')">{{scope.row.tw}}</a>
           </div>
      </template>
    </el-table-column>
    <el-table-column prop="sg" label="Singapore" width="200" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('sg')">{{scope.row.sg}}</a>
           </div>
      </template>
    </el-table-column>
    <el-table-column prop="my" label="Malaysia" width="200" align="center">
            <template slot-scope="scope">
           <div>
             <a href="#" @click="innerDrawer = true;pageSearch ('my')">{{scope.row.my}}</a>
           </div>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer
  :visible.sync="innerDrawer"
  size="100%">
  <div>
   <el-table
   :data="documentList"
    style="width: 100%"
   max-height="500"
   stripe>
<!--     <el-table-column type="index"></el-table-column>-->
     <el-table-column label="查询范围" prop="variety" min-width="3%" ></el-table-column>
     <el-table-column label="类型" prop="genre" min-width="3%"></el-table-column>
     <el-table-column label="文本地址" prop="domain" min-width="10%">
       <template slot-scope="scope">
         <a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.domain}}</a>
       </template>
     </el-table-column>
     <el-table-column label="单词数" prop="words" min-width="4%"></el-table-column>
     <el-table-column label="标题" prop="title" min-width="20%"></el-table-column>
     <el-table-column label="文本内容" prop="content" fit="false" min-width="60%">
       <template slot-scope="scope">
       <!--<div v-html='scope.row.content'></div>-->
       <!--设置本列多余数据隐藏显示及高亮-->
         <el-popover placement="top-start" width="800" trigger="hover">
          <div style="height:300px;overflow-y:auto" v-html='scope.row.content'></div>
          <div slot="reference" v-html='scope.row.content.substr(0,300)'></div>
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
      :page-count="pagenum"
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
          <div class="item item-apps" style="width: 40%">
          <dl>
            <dt>INFORMATION</dt>
            <dd><el-link href="#" type="info">About us</el-link></dd>
            <!--友情链接-->
            <dd>
              <el-link @click="dialogVisible = true" type="info">Some Links</el-link>
              <el-dialog
                title="Some Links"
               :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
                <span>
                  <dd>
                    <a href="https://www.english-corpora.org/glowbe/">1.The corpus of Global Web-based English</a>
                  </dd>
                  <dd>
                    <a href="https://www.english-corpora.org/coca/">2.The Corpus of Contemporary American English</a>
                  </dd>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
             </el-dialog>
            </dd>
            <!--联系我们-->
            <dd>
              <el-link @click="dialogVisible2 = true" type="info">Contact us</el-link>
              <el-dialog
                title="Contact us"
               :visible.sync="dialogVisible2"
                width="50%"
                :before-close="handleClose">
                <span>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
              </span>
             </el-dialog>
            </dd>
          </dl>
        </div>
        </el-col>
        <el-col :span="6">
          <div class="item item-apps" style="width: 65%">
          <dl>
            <dt>HELP</dt>
            <!--功能介绍-->
            <dd><el-link href="#" type="info">Function introduction</el-link></dd>
            <!--检索示例-->
            <dd><el-link href="#" type="info">Search Examples</el-link></dd>
            <!--检索说明-->
            <dd><el-link href="#" type="info">Search Description</el-link></dd>
          </dl>
         </div>
        </el-col>
        <el-col :span="6">
          <div class="item item-apps" style="width: 32%">
          <dl>
            <dt>WeChat</dt>
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
      selectList:[{ value:'match', label:'Match' }, { value:'fuzzy', label:'Fuzzy' }],
      documentList: [],
      Frequency: [],
      pagenum:1,
      total: 0,
      drawer: false,
      innerDrawer: false,
      disabled: false,
      dialogVisible: false,
      dialogVisible2: false
    }
  },
  created () {
    this.queryInfo.select = this.selectList[0].value
    // this.matchCount()
    // this.pageSearch()
  },
  methods: {
    async matchCount () {
      const keyword = this.queryInfo.keyword
      const select = this.queryInfo.select

      console.log('select:' + this.queryInfo.select)
      axios.get('http://localhost:8080/count/' + select + '/' + keyword).then(response => {
        console.log(response.data)
        this.Frequency = [response.data]
      })
    },
    pageSearch (variety) {
      // window.open('./searchWeb.vue')
      
      const keyword = this.queryInfo.keyword
      this.queryInfo.variety = variety
      const pageNo = this.queryInfo.pageNo
      const pageSize = this.queryInfo.pageSize
      const select = this.queryInfo.select
      console.log(this.pagenum)
      axios.get('http://localhost:8080/search/' + select + '/' + variety + '/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
        console.log(response.data)
        this.documentList = response.data.DocumentList
        this.total = response.data.TotalHits
      })
      this.pagenum = this.total / this.queryInfo.pageSize
    },
    handleSizeChange(newSize) {
       this.queryInfo.pageSize = newSize
       this.pageSearch(this.queryInfo.variety)
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNo = newPage
      this.pageSearch(this.queryInfo.variety)
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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