import "/mock/index.js"
<template>
<div>
 <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
  点我打开
</el-button>

<el-drawer
  title="我是外面的 Drawer"
  :visible.sync="drawer"
  size="100%">
  <div>
   <el-button @click="innerDrawer = true">打开里面的!</el-button>
   <el-drawer
     title="我是里面的"
     :append-to-body="true"
     :before-close="handleClose"
     :visible.sync="innerDrawer">
     <p>_(:зゝ∠)_</p>
   </el-drawer>
  </div>
</el-drawer>

<el-table 
   :data="userlist"
    style="width: 100%"
   max-height="550"
   stripe>
     <el-table-column type="index"></el-table-column>
     <el-table-column label="查询范围" prop="variety"></el-table-column>
     <el-table-column label="文本地址" prop="url"></el-table-column>
     <el-table-column label="文本内容" prop="content" fit="false"></el-table-column>
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
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      input3: '', // 获取搜索的值
      select: '',
      queryInfo: {
        keyword: '',
        variety: 'ALL',
        pageNo: 1,
        pageSize: 8
      },
      userlist: [],
      total: 0,
      drawer: false,
      innerDrawer: false
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
      console.log(this.input3)
      console.log(this.queryInfo)
      // const { data: res } = await this.$http.get('http://43.251.224.187:8080', {
      //   params: this.queryInfo
      // })
      axios.get('/search/match/' + variety + '/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
        console.log(response.data)
        this.userlist = response.data.DocumentList
        this.total = response.data.TotalHits
      })
      /* axios.get('http://43.251.224.187:8080/search/match/' + variety + '/' + keyword + '/' + pageNo + '/' + pageSize).then(response => {
        console.log(response.data)
      }) */
    },
    handleSizeChange(newSize) {
       console.log(newSize)
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pageNo = newPage
      this.getUserList()
    }
  }
} 
</script>

<style>
.el-pagination {
  margin-top: 15px;
}
</style>