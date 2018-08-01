const FNS = Symbol('used-functions')
const CTX = Symbol('ctx')

class Middleware {
  constructor () {
    this[FNS] = []
    this[CTX] = null
  }

  use (fn) {
    if (typeof fn !== 'function') {
      throw new Error('middleware must be a function')
    }
    this[FNS].push(fn)
    return this
  }

  next (fn) {
    if (this.middlewares && this.middlewares.length > 0) {
      var ware = this.middlewares.shift()
      ware.call(this, this[CTX], this.next.bind(this))
    }
  }

  start (ctx) {
    this.middlewares = this[FNS].map(function (fn) { // 复制
      return fn
    })
    this[CTX] = ctx
    this.next()
  }
}

function validate (ctx, next) {
  console.log('validate', ctx.data)
  next()// 通过验证
}
function send (ctx, next) {
  setTimeout(function () { // 模拟异步
    console.log('send', ctx.data)
    ctx.url = 'www.baidu.com'// 设置跳转的url
    next()
  }, 100)
}
function goTo (ctx, next) {
  console.log('goTo', ctx.url)
}

var submitForm = new Middleware()
submitForm.use(validate).use(send).use(goTo)
submitForm.start({data: {name: 'xiaoxiong', age: 20}})
// 结果：
// validate Object {name: "xiaoxiong", age: 20}
//
// send Object {name: "xiaoxiong", age: 20}
// goTo www.baidu.com

// submitForm.start({data: {name: 'xiaohong', age: 21}})// 触发第二次，改变数据内容
// 结果：
// validate Object {name: "xiaohong", age: 21}
//
// send Object {name: "xiaohong", age: 21}
// goTo www.baidu.com
