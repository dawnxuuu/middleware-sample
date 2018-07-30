const app = require('./app.js')

app.use((ctx, next) => {
  ctx.name = 'lucy'
  next()
})

app.use((ctx, next) => {
  ctx.age = 12
  next()
})

app.use((ctx, next) => {
  console.log(`${ctx.name} is ${ctx.age} years old.`)
  next()
})

app.go({})
