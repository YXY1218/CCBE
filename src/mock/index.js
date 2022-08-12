import Mock from 'mockjs'

Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false

    if (this.responseType) {
      this.custom.xhr.responseType = this.responseType
    }
  }
  this.proxy_send(...arguments)
}

Mock.mock(/\/search\/match/, 'get', function (option) {
  return Mock.mock({
    TotalHits: '@natural(1, 100)',
    'DocumentList|10': [
      {
        content: '@paragraph',
        url: '@url',
        genre: '@character',
        'variety|1': [
          'hk',
          'cn',
          'tw'
        ],
        textID: '@natural(1, 100)',
        words: '@natural(1, 1000)',
        domain: '@url',
        title: '@word'
      }
    ]
  })
})

export default Mock
