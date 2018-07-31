const app = {
  fns: [],
  callback (ctx) {
    console.log(ctx)
  },
  use (fn) {
    this.fns.push(fn)
  },
  go (ctx) {
    let index = 0
    const next = () => {
      index++
    }
    this.fns.map((fn, i) => {
      if (index === i) fn(ctx, next)
    })
    index === this.fns.length && this.callback(ctx)
  }
}

module.exports = app
