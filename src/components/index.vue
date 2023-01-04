<!--import "/mock/index.js"-->
<template>
  <el-container class="home-container" style="background-color: #F5F5F5">
    <!--头部区域-->
   <el-header>
       <div>
         <!--<img src="#" alt="">-->
         <span><el-button round style="background: #F5F5F5" @click="gotoindex">Corpus of Chinese-based Englishes(CCE)</el-button></span>
       </div>
       <div >
       <!--<el-button round @click="login">Sign in</el-button>-->
       <!--<el-button type="info" @click="login" style="float: right">注册</el-button>-->
       <!--<el-button type="info" @click="help" style="margin-right:10px">帮助</el-button>-->
       </div>
   </el-header>
   <!--页面主体区-->
   <el-main style="height:200px">
  <div class="main">
     <div class="img">
     <img src="./title.jpg" style="max-width: 745px;" class="img-responsive center-block" alt="COCE" title="Corpus of Chinese-based Englishes">
   </div>
   <!--<h1 class="heading" style="max-width: 1000px;font-size: 45px; ">Corpus of Chinese-based Englishes</h1>-->
   <div class="search" >
    
   <el-input  style="border-radius: 20px;box-shadow:0px 0px 15px 15px rgba(0,0,0,0.1);" placeholder="Please input a query" v-model="queryInfo.keyword" class="input3" @keyup.enter.native="drawer = true; matchCount()">
     <!--<el-select :inner-style="{height: '50px'}" v-model="queryInfo.select" slot="prepend" placeholder="请选择" >
     <el-option label="精确查询" value="match"></el-option>-->
 <!--      <el-option label="模糊查询" value="fuzzy"></el-option>-->
       <!--<el-option v-for="item in selectList" :key="item.key" :label="item.label" :value="item.value"/>
     </el-select>-->
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
     <el-table-column prop="phrase" label="phrase" width="200" align="center">
     </el-table-column>
      <el-table-column label="All" width="170" align="center" prop="all">
       <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageAllSearch (['all',scope.row.all])">{{scope.row.all}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="cn" label="Mainland" width="200" align="center">
       <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch (['cn', scope.row.cn])">{{scope.row.cn}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="hk" label="Hong Kong" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch (['hk', scope.row.hk])">{{scope.row.hk}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="mo" label="Macau" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch (['mo', scope.row.mo])">{{scope.row.mo}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="tw" label="Taiwan" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch (['tw', scope.row.tw])">{{scope.row.tw}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="sg" label="Singapore" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch (['sg', scope.row.sg])">{{scope.row.sg}}</el-link>
            </div>
       </template>
     </el-table-column>
     <el-table-column prop="my" label="Malaysia" width="200" align="center">
             <template slot-scope="scope">
            <div>
              <el-link @click="innerDrawer = true;pageSearch (['my', scope.row.my])">{{scope.row.my}}</el-link>
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
      <el-table-column label=" " width="70" align="left">
          <template slot-scope="scope">
            {{ (scope.$index+1)+(queryInfo.pageNo-1)*queryInfo.pageSize }}
          </template>
      </el-table-column>
      <el-table-column label="Variety" prop="variety" min-width="8%">
        <template slot-scope="scope">
          <el-link @click="contextdrawer = true;RowSearch(scope.row);creat()" >{{scope.row.variety}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="TextId" prop="textId" min-width="8%">
        <template slot-scope="scope">
          <el-link @click="contextdrawer = true;RowSearch(scope.row);creat()" >{{scope.row.textId}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Genre" prop="genre" min-width="8%">
        <template slot-scope="scope">
          <el-link @click="contextdrawer = true;RowSearch(scope.row);creat()" >{{scope.row.genre}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Domain" prop="domain" min-width="14%">
        <template slot-scope="scope">
          <a :href="scope.row.domain" target="_blank" class="buttonText">{{scope.row.domain}}</a>
        </template>
      </el-table-column>
      <!--<el-table-column label="单词数" prop="words" min-width="4%"></el-table-column>-->
      <el-table-column label="Words" prop="words" fit="false" min-width="55%">
        <template slot-scope="scope"> 
         <div style="font-size: 15px;"><div v-html="scope.row.words"></div></div>
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
       :total="num"
       style="text-align: center;">
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
      :data="documentListRow"
      default-expand-all="true"
    >
    <el-table-column type="expand" width="100%" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" style="margin-left:3%">
          <div style="font-size: 24px;font-weight: bold">Information</div>
          <br>
          <el-card style="width:95%">
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">variety</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.variety }}</div>
            </span>
          </el-form-item>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">TextID</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.textID }}</div>
            </span>
          </el-form-item>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">Genre</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.genre }}</div>
            </span>
          </el-form-item>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">Url</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.url }}</div>
            </span>
          </el-form-item>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">Time</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.time }}</div>
            </span>
          </el-form-item>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">Domain</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.domain }}</div>
            </span>
          </el-form-item>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 18px;float: left;font-weight: bold;width: 500px;">Words</div>
            <div style="font-size: 15px;float: right;"><el-divider direction="vertical"></el-divider>{{ props.row.words }}</div>
            </span>
          </el-form-item>
          </el-card>
          <br>
          <el-form-item class="formitem" style="width:100%;" >
            <span>
            <div style="font-size: 24px;font-weight: bold">Expanded content</div>
            <div style="font-size: 15px;"><div v-html="props.row.content"></div></div>
            </span>
          </el-form-item>
      </el-form>    
      </template>
    </el-table-column>
    <el-table-column label="Variety" prop="variety" min-width="5%"></el-table-column>
      <el-table-column label="TextId" prop="textID" min-width="5%"></el-table-column>
      <el-table-column label="Genre" prop="genre" min-width="5%"></el-table-column>
      <el-table-column label="Url" prop="url" min-width="12%"></el-table-column>
      <el-table-column label="Time" prop="time" min-width="8%"></el-table-column>
      <el-table-column label="Title" prop="title" min-width="12%"></el-table-column>
      <el-table-column label="Domain" prop="domain" min-width="12%"></el-table-column>
      <el-table-column label="Words" prop="words" min-width="6%"></el-table-column>
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
      <el-card style="height: 120px;" :body-style="{padding: '0px'}">
        <div class="item">
        <el-row>
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
        </div>
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
        prop: 'textID',
        label: 'TextId'
      },
      {
        prop: 'genre',
        label: 'Genre'
      },
      {
        prop:'title',
        label:'Title'
      },
      {
        prop:'url',
        label:'Url'
      },
      {
        prop:'time',
        label:'Time'
      },
      {
        prop: 'domain',
        label: 'Domain'
      },
      {
        prop: 'words',
        label: 'Words'
      },
      {
        prop:'content',
        label:'Expanded Content'
      }
    ],
       input3: '', // 获取搜索的值
       queryInfo: {
         keyword: '',
         variety: '',
         pageNo: 1,
         pageSize: 10
        },
       // selectList:[{ value:'match', label:'Match' }, { value:'fuzzy', label:'Fuzzy' }],
       documentList: [],
       documentListRow: [],
       originTitle: ['Variety', 'TextId', 'Genre', 'Title', 'Url', 'Time', 'Domain', 'Words', 'Expanded Content'], 
       transTitle: ['1', '2'],
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
      // const select = this.queryInfo.select
 
      // console.log('select:' + this.queryInfo.select)
       axios.get('http://39.105.116.51:8080/countPhrases/' + keyword).then(response => {
         console.log(response.data)
         this.Frequency = response.data
       })
     },
     // 对应着searchContext接口
     pageSearch ([variety, num]) {
       // window.open('./searchWeb.vue')
 
       const keyword = this.queryInfo.keyword
       this.queryInfo.variety = variety
       this.queryInfo.num = num
       const pageNo = this.queryInfo.pageNo
       const pageSize = this.queryInfo.pageSize
       // const select = this.queryInfo.select
       console.log(this.pagenum)
       console.log(num)
       axios.get('http://39.105.116.51:8080/selectContext/' + keyword + '/' + variety + '/' + pageNo + '/' + pageSize).then(response => {
         console.log(response.data)
         this.documentList = response.data
         for (var i = 0; i < this.documentList.length; i++){
         this.documentList[i].words = this.documentList[i].words.join(' ');
         let keywordArr = keyword.split(",");
         this.documentList[i].words = this.documentList[i].words + "";
         keywordArr.forEach(item => {
         if (this.documentList[i].words.indexOf(item) !== -1 && item !== "") {
         this.documentList[i].words = this.documentList[i].words.replace(
           new RegExp(item, 'g'),
           '<font color="#fe7300"><strong>' + item + "</strong></font>"
          );
         }
        });
       }
       })
       this.pagenum = Math.ceil(num / this.queryInfo.pageSize)
     },
     // 对应着searchAllContext接口，即点击all时显示的数据
     pageAllSearch ([variety, num]) {
       // window.open('./searchWeb.vue')
 
       const keyword = this.queryInfo.keyword
       const pageNo = this.queryInfo.pageNo
       const pageSize = this.queryInfo.pageSize
       this.queryInfo.variety = variety
       this.queryInfo.num = num
       // const select = this.queryInfo.select
       console.log(this.pagenum)
       axios.get('http://39.105.116.51:8080/selectAllContext/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
         console.log(response.data)
         this.documentList = response.data
         console.log(num)
         for (var i = 0; i < this.documentList.length; i++){
          this.documentList[i].words = this.documentList[i].words.join(' ');
          let keywordArr = keyword.split(",");
         this.documentList[i].words = this.documentList[i].words + "";
         keywordArr.forEach(item => {
         if (this.documentList[i].words.indexOf(item) !== -1 && item !== "") {
         this.documentList[i].words = this.documentList[i].words.replace(
           new RegExp(item, 'g'),
           '<font color="#fe7300"><strong>' + item + "</strong></font>"
          );
         }
        });
         } 
       })
       this.pagenum = Math.ceil(num / this.queryInfo.pageSize)  
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
       const variety = row.variety
       const textId = row.textId
       const keyword = this.queryInfo.keyword
       console.log(keyword)
      axios.get('http://39.105.116.51:8080/selectSource/' + variety + '/' + textId).then(response => {
         console.log(response.data)
         this.documentListRow = [response.data]
         if (keyword.length > 0) {
           let keywordArr = keyword.split(",");
           this.documentListRow[0].content = this.documentListRow[0].content + "";
           keywordArr.forEach(item => {
           if (this.documentListRow[0].content.indexOf(item) !== -1 && item !== "") {
            this.documentListRow[0].content = this.documentListRow[0].content.replace(
              new RegExp(item, 'g'),
              '<font color="#fe7300"><strong>' + item + "</strong></font>"
            );
          }
        });
        return this.documentListRow[0].content;
      } else {
        return this.documentListRow[0].content;
      }
       })
     },
     tableCellClassName({ row, column, rowIndex, columnIndex }){
      row.index = rowIndex;
      column.index = columnIndex;
    },
     handleSizeChange(newSize) {
        this.queryInfo.pageSize = newSize
        if (this.queryInfo.variety === "all") {
          this.pageAllSearch([this.queryInfo.variety, this.queryInfo.num])
        } else {
          this.pageSearch([this.queryInfo.variety, this.queryInfo.num])
        }
      },
     handleCurrentChange(newPage) {
       this.queryInfo.pageNo = newPage
       if (this.queryInfo.variety === "all") {
          this.pageAllSearch([this.queryInfo.variety, this.queryInfo.num])
        } else {
          this.pageSearch([this.queryInfo.variety, this.queryInfo.num])
        }
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

      },
      gotoindex(){
        this.$router.go(0);
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
    /deep/ .el-input__inner{
     height: 50px !important;
    }
    >.demo-table-expand {
    font-size: 0;
  }
  .el-form-item__label {
    width: 90px;
    color: #99a9bf;
  }
  >.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
      padding: 0px 0px;
      background-color: #F5F5F5;
    }
    .el-card {
       padding:0px;
    }
    >.box-card>.el-link {
      font-style: solid;
    }
    .item{
      padding:0px 20px;
    }
    .el-row {
     margin-bottom: 00px;
     &:last-child {
       margin-bottom: 0;
     }
   }
   .el-col {
     border-radius: 0px;
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
 
