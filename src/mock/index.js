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

Mock.mock(/\/search/, 'get', function (option) {
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
Mock.mock(/\/count/, 'get', function (option) {
  return Mock.mock({
    'Frequency|1-1':[
    {
    all: '@natural(1, 100)',
    mo: '@natural(1, 100)',
    hk: '@natural(1, 100)',
    tw: '@natural(1, 100)',
    sg: '@natural(1, 100)',
    cn: '@natural(1, 100)',
    my: '@natural(1, 100)'
    }
    ]
  })
})

export default Mock