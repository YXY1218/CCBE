<!--import "/mock/index.js"-->
<template>
  <el-container class="home-container" style="background-color: #F5F5F5">
    <!--头部区域-->
   <el-header>
       <div>
         <img src="#" alt="">
         <span><el-button round style="background: #F5F5F5">Corpus of Chinese-based Englishes(CCE)</el-button></span>
       </div>
       <div >
       <el-button round @click="login">Sign in</el-button>
       <!--<el-button type="info" @click="login" style="float: right">注册</el-button>-->
       <!--<el-button type="info" @click="help" style="margin-right:10px">帮助</el-button>-->
       </div>
   </el-header>
   <!--页面主体区-->
   <el-main style="height:200px">
  <div class="main">
     <!--<div class="img">
     <img src="./title.jpg" style="max-width: 745px;" class="img-responsive center-block" alt="COCE" title="Corpus of Chinese-based Englishes">
   </div>-->
   <h1 class="heading" style="max-width: 1000px;font-size: 45px; ">Corpus of Chinese-based Englishes</h1>
   <div class="search">
    
   <el-input style="box-shadow: darkgrey 0px 0px 15px 5px;" placeholder="Please input a query" v-model="queryInfo.keyword" class="input3" @keyup.enter.native="drawer = true; matchCount()">
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
              <el-link @click="innerDrawer = true;pageSearch ('ALL')">{{scope.row.cn+scope.row.hk+scope.row.mo+scope.row.my+scope.row.tw+scope.row.sg}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="cn" label="Mainland" width="200" align="center">
       <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch ('cn')">{{scope.row.cn}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="hk" label="Hong Kong" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch ('hk')">{{scope.row.hk}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="mo" label="Macau" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch ('mo')">{{scope.row.mo}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="tw" label="Taiwan" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch ('tw')">{{scope.row.tw}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="sg" label="Singapore" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch ('sg')">{{scope.row.sg}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="my" label="Malaysia" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch ('my')">{{scope.row.my}}</el-link>
            </div>
       </template>
     </el-table-column>
   </el-table>
 
   <el-drawer
   :visible.sync="innerDrawer"
   append-to-body = true
   size="100%">
   <div>
    <el-table
    :data="documentList"
     style="width: 100%"
    max-height="580px"
    :cell-class-name="tableCellClassName"
    stripe>
 <!--     <el-table-column type="index"></el-table-column>-->
 

 <!--<el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="middle" inline class="demo-table-expand">
          <dd>
          <el-row :gutter="20" style="margin-bottom: 5px;">
            <el-col :span="3">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span solt="label">
              <span style="color:black;"><strong>Variety</strong></span>
            </span>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span>{{ props.row.variety}}</span>
              </div>
            </el-col>
          </el-row>
          </dd>

          <dd>
            <el-row :gutter="20" style="margin-bottom: 5px;">
            <el-col :span="3">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span solt="label">
              <span style="color:black;"><strong>Genre</strong></span>
            </span>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span>{{ props.row.genre}}</span>
              </div>
            </el-col>
          </el-row>
          </dd>
          <dd>
            <el-row :gutter="20" style="margin-bottom: 5px;">
            <el-col :span="3">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span solt="label">
              <span style="color:black;"><strong>Source</strong></span>
            </span>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span>{{ props.row.domain}}</span>
              </div>
            </el-col>
          </el-row>
          </dd>
          <dd>
            <el-row :gutter="20" style="margin-bottom: 5px;">
            <el-col :span="3">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span solt="label">
              <span style="color:black;"><strong>Words</strong></span>
            </span>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span>{{ props.row.words}}</span>
              </div>
            </el-col>
          </el-row>
          </dd>
          <dd>
            <el-row :gutter="20" style="margin-bottom: 5px;">
            <el-col :span="3">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span solt="label">
              <span style="color:black;"><strong>Title</strong></span>
            </span>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="background-color:#DEE9F3">
                &nbsp;
            <span>{{ props.row.title}}</span>
              </div>
            </el-col>
          </el-row>
          </dd>
        </el-form>
      </template>
    </el-table-column>-->

      <el-table-column label="Variety" prop="variety" min-width="8%"></el-table-column>
      <el-table-column label="Genre" prop="genre" min-width="8%">
        <template slot-scope="scope">
          <el-link @click="contextdrawer = true;RowSearch(scope.row);creat()" >{{scope.row.genre}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Domain" prop="domain" min-width="14%">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.domain}}</a>
        </template>
      </el-table-column>
      <!--<el-table-column label="单词数" prop="words" min-width="4%"></el-table-column>-->
      <el-table-column label="Title" prop="title" min-width="15%"></el-table-column>
      <el-table-column label="Content" prop="content" fit="false" min-width="55%">
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
       layout="prev, pager, next"
       :total="total">
 </el-pagination>

 <el-drawer
  title="CONTEXT+"
  :visible.sync="contextdrawer"
  append-to-body = true
  size="100%"
  >
  <div>
    <el-table
      style="width: 100%"
      :data="getValues"
      :show-header="false"
    >
      <el-table-column
        v-for="(item, index) in getHeaders"
        :key="index"
        :prop="item"
      >
      </el-table-column>
    </el-table>
  </div>
  
</el-drawer>
   </div>
   </el-drawer>
   

   </div>
 </el-drawer>
    </div>
    </div>
   </el-main>
   <!--尾部区-->
    <el-footer>
      <el-card class="box-card" style="height: 140px;">
        <el-row :gutter="18">
          
          <el-col :span="2">
            <div class="copyright">
              <div class="copy-side"> &nbsp;
              </div>
            </div>
          </el-col>
        
          <el-col :span="8">
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
                     <a href="https://www.english-corpora.org/glowbe/">1.The corpus of Global Web-based English</a>
                     <br>
                     <a href="https://www.english-corpora.org/coca/">2.The Corpus of Contemporary American English</a>
                 </span>
                    <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">Cancel</el-button>
                   <el-button type="primary" @click="dialogVisible = false">OK</el-button>
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
                    :before-close="handleClose"
                    style="background-color: #F5F5F5">
                 <span>
                  <el-row type="flex" class="row-bg" justify="space-around" style="align: middle" >
                    <!--地址-->
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="addressPic">
                        <img src="./address.png" style="max-width: 30px;">
                        </div>
                        <h3 class="addressTitle">Address</h3>
                        <span style="color: #8e8a8a;" class="addressText"><b>30 Xueyuan Road,</b></span><br>
                        <span style="color: #8e8a8a;" class="addressText1"><b>Haidian District,</b></span><br>
                        <span style="color: #8e8a8a;" class="addressText2"><b>Beijing, China</b></span><br>
                        &nbsp;
                      </div>
                    </el-col>
                    <!--邮箱-->
                    <el-col :span="6">
                      <div class="grid-content bg-purple-light">
                        <div class="mailPic">
                        <img src="./mailBox.png" style="max-width: 30px;">
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                      <div class="telPic">
                        <img src="./tel.png" style="max-width: 30px;">
                        </div>
                    </div></el-col>
                  </el-row>
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

          <el-col :span="8">
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
                <dt>More</dt>
                <a class="thumbnail" style="border:1px solid #FFF;">
                  <!--<img src="#" width="115">-->
                </a>
              </dl>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <div class="footer">
        <div class="footer2">
          <p><a href="https://www.ustb.edu.cn/">University of Science and Technology Beijing</a></p>  
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
      headers: [
      {
        prop: 'variety',
        label: 'Variety'
      },
      {
        prop: 'genre',
        label: 'Genre'
      },
      {
        prop: 'words',
        label: 'Words'
      },
      {
        prop: 'domain',
        label: 'Domain'
      },
      {
        prop: 'content',
        label: 'Content'
      }
    ],
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
       documentListRow: [],
       originTitle: ['Variety', 'Genre', 'Domain', 'Title', 'Content'],
       transTitle: ['', ''],
       transData: [],
       Frequency: [],
       pagenum:1,
       total: 0,
       drawer: false,
       innerDrawer: false,
       contextdrawer: false,
       disabled: false,
       dialogVisible: false,
       dialogVisible2: false,
       dialogVisible3: false,
       clientWidth: document.body.clientWidth
     }
   },
   computed: {
    getHeaders() {
    return this.documentListRow.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
   },
  getValues() {
      return this.headers.map(item => {
      return this.documentListRow.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { title: item.label });
    });
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
       axios.get('/api/count/' + select + '/' + keyword).then(response => {
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
       axios.get('/api/search/' + select + '/' + variety + '/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
         console.log(response.data)
         this.documentList = response.data.DocumentList
         this.total = response.data.TotalHits
       })
       this.pagenum = this.total / this.queryInfo.pageSize
     },
     created() {
            // 数组按矩阵思路, 变成转置矩阵
            let matrixData = this.documentListRow.map((row) => {
                let arr = []
                for (let key in row) {
                    arr.push(row[key])
                }
                return arr
            })
            console.log(matrixData)
            // 加入标题拼接最终的数据
            this.transData = matrixData[0].map((col, i) => {
                return [this.originTitle[i], ...matrixData.map((row) => {
                    return row[i]
                })]
            })
            console.log(this.transData)
        },
     RowSearch (row) {
       this.documentListRow = [row];
       console.log(row)
     },
     tableCellClassName({ row, column, rowIndex, columnIndex }){
      row.index = rowIndex;
      column.index = columnIndex;
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
         this.$confirm('Colse？')
           .then(_ => {
             done();
           })
           .catch(_ => {});
       },
       mounted() {
        const that = this
        window.onresize = () => {
          return (() => {
            window.screenHeight = document.body.clientHeight
            that.clientHeight = window.screenHeight
          })()
        }
      },
      // TODO: 
      //   - Define a detailed page template firstly,
      //   - Generate href for each table row,
      //     which allows click behaviour triggering a detailed page correspondingly
      //   - Bind new click behaviour to each table row element
      generate_href_for_each_tbl_row() {

      }
   }
 }
 </script>

<style lang="less" scoped>
  @import "./font-style/font.css";
  .home-container {
    height: 100%;
  }
  .el-header {
    text-align: center;
    background-color: aliceblue;
    border-color: #813939;
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .el-table {
    position: inherit;
    .el-table__header {
      width: fit-content;
    }
    .el-table__body {
      background-color: aliceblue;
    }
  }

  .el-main {
    .main>.heading{
      font-family: 'Lora-Regular', cursive;
    }
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
    flex: 0.70;
    line-height: 100px;
    text-align: center;
    >.main{
      align-self: center;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 50px;
    }
    .el-select{
      width: 130px;
    }
    .el-pagination {
    margin-top: 15px;
  }
  }

  .el-footer {
    height: 0px !important;
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
      position: relative;
    }
    .bg-purple-light {
      background: #F5F5F5;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #F5F5F5;
    }
    >.box-card>.el-link {
      type-style: solid;
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
     background: #f8f8f9;
   }
   .bg-purple {
     background: #e3e9f1;
   }
   .bg-purple-light {
     background: #e3e9f1;
     text-align: "center";
     vertical-align: middle;
   }
   .grid-content {
     border-radius: 4px;
     min-height: 36px;
   }
   .row-bg {
     padding: 10px 0;
     background-color: #ffffff;
   }
   .bg-purple>.addressPic {
     display:block;
     padding-top: 10px;
     padding-left: 37%;
   }
   .addressTitle{
     font-size: 20px;
     padding-left: 25%;
     color: #8e8a8a;
  }
  .addressText{
    padding-left: 13%;
  }
  .addressText1{
    padding-left: 16%;
  }
  .addressText2{
    padding-left: 19%;
  }
  .mailPic{
     display:block;
     padding-top: 5px;
     padding-left: 39%;
  }
  .telPic{
     display:block;
     padding-top: 5px;
     padding-left: 39%;
  }
  }
  </style>
 
