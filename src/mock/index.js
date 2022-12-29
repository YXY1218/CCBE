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

// Mock.mock(/\/search/, 'get', function (option) {
//   return Mock.mock({
//     TotalHits: '@natural(1, 100)',
//     'DocumentList|10': [
//       {
//         content: '@paragraph',
//         url: '@url',
//         genre: '@character',
//         'variety|1': [
//           'hk',
//           'cn',
//           'tw'
//         ],
//         textID: '@natural(1, 100)',
//         words: '@natural(1, 1000)',
//         domain: '@url',
//         title: '@word'
//       }
//     ]
//   })
// })
// Mock.mock(/\/count/, 'get', function (option) {
//   return Mock.mock({
//     mo: '@natural(1, 100)',
//     hk: '@natural(1, 100)',
//     tw: '@natural(1, 100)',
//     sg: '@natural(1, 100)',
//     cn: '@natural(1, 100)',
//     my: '@natural(1, 100)'
//   })
// })


// Mock.mock(/\/search/, 'get', function (option) {
//   return Mock.mock({
//     TotalHits: '@natural(1, 100)',
//     'DocumentList|10': [
//       {
//         content: '@paragraph',
//         url: '@url',
//         genre: '@character',
//         'variety|1': [
//           'hk',
//           'cn',
//           'tw'
//         ],
//         textID: '@natural(1, 100)',
//         words: '@natural(1, 1000)',
//         domain: '@url',
//         title: '@word'
//       }
//     ]
//   })
// })
Mock.mock(/\/searchContext/, 'get', function (option) {
     return Mock.mock([{
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
    }
    ])
   })

   Mock.mock(/\/searchAllContext/, 'get', function (option) {
    return Mock.mock([{
     variety: '@word',
     textId: '@natural(1,100)',
     genre: '@word',
     domain: '@url',
     'words|21': ['@word']
    }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }, {
      variety: '@word',
      textId: '@natural(1,100)',
      genre: '@word',
      domain: '@url',
      'words|21': ['@word']
     }])
  })

  Mock.mock(/\/selectSource/, 'get', function (option) {
    return Mock.mock({
     url:'@url',
     time: '@word',
     textId: '@natural(1,100)',
     variety: '@word',
     genre: '@word',
     domain: '@url',
     words: '@natural(1,100)',
     title: '@word',
     'content|10':'@paragraph'
    })
  })

Mock.mock(/\/countPhrases/, 'get', function (option) {
  return Mock.mock([{
    all: '@natural(1, 100)',
    mo: '@natural(1, 100)',
    hk: '@natural(1, 100)',
    tw: '@natural(1, 100)',
    sg: '@natural(1, 100)',
    cn: '@natural(1, 100)',
    my: '@natural(1, 100)',
    phrase: '@word'
  },
  {
    all: '@natural(1, 100)',
    mo: '@natural(1, 100)',
    hk: '@natural(1, 100)',
    tw: '@natural(1, 100)',
    sg: '@natural(1, 100)',
    cn: '@natural(1, 100)',
    my: '@natural(1, 100)',
    phrase: '@word'
}, {
    all: '@natural(1, 100)',
    mo: '@natural(1, 100)',
    hk: '@natural(1, 100)',
    tw: '@natural(1, 100)',
    sg: '@natural(1, 100)',
    cn: '@natural(1, 100)',
    my: '@natural(1, 100)',
    phrase: '@word'
}, {
    all: '@natural(1, 100)',
    mo: '@natural(1, 100)',
    hk: '@natural(1, 100)',
    tw: '@natural(1, 100)',
    sg: '@natural(1, 100)',
    cn: '@natural(1, 100)',
    my: '@natural(1, 100)',
    phrase: '@word'
}, {
    all: '@natural(1, 100)',
    mo: '@natural(1, 100)',
    hk: '@natural(1, 100)',
    tw: '@natural(1, 100)',
    sg: '@natural(1, 100)',
    cn: '@natural(1, 100)',
    my: '@natural(1, 100)',
    phrase: '@word'
}])
})

export default Mock
