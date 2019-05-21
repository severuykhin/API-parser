import Koa from 'koa'
import Router from 'koa-router'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import responseTime from 'koa-response-time'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import favicon from 'koa-favicon'
import debug from 'debug'
import Rollbar from 'rollbar'
import path from 'path'
import WebSocket from 'ws';

const ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.NODE_ENV ? 3010 : 3000

const rollbar = new Rollbar('069343a9396048999c83895cbd8bdd43')

if (ENV === 'development') {
  debug.enable('dev,koa');
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`))
}


const app = new Koa()
const router = new Router()

require('./serverRoutes')(router)

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    rollbar.error(err, ctx.request)
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

app.use(async (ctx, next) => {
  ctx.set('X-Frame-Options', 'ALLOWALL')
  await next()
})

// add header `X-Response-Time`
app.use(convert(responseTime()))
app.use(convert(logger()))

// Secure helmet
app.use(helmet())

// Provide static content
app.use(require('koa-static')('./public', {}))

app.use(convert(favicon(path.join(__dirname, '../public/favicon.ico'))))

// Load by server routes
app.use(router.routes())

// Run server
app.listen(PORT)

// Tell parent process koa-server is started
if (process.send) process.send('online');
debug('koa')(`Application started on port ${PORT}`)

const server = new WebSocket.Server({ port: 8080 });
server.on('connection', ws => {
  ws.send('Hello from WebSocket');

  ws.on('message', message => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('recieved message');
      }
    })
  });

});
