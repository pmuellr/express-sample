"use strict"

// must be first!
const newrelic =  require('newrelic')

const http = require('http')

const bodyParser    =  require('body-parser')
const compression   =  require('compression')
const express       =  require('express')
const serveFavicon  =  require('serve-favicon')
const serveIndex    =  require('serve-index')
const serveStatic   =  require('serve-static')

const redis = require('redis')

//------------------------------------------------------------------------------
const redisClient = redis.createClient()

redisClient.on("error", function(err) {
  console.log("error in redis client:", err)
  process.exit(1)
})

redisClient.set("counter", 0, function(err, reply) {
  if (err) {
    console.log("error setting request counter in redis:", err)
    process.exit(1)
  }
})

//------------------------------------------------------------------------------
const app      = express()
const server   = http.createServer(app)
let   requests = 0

app.use(updateCounter)

app.get('/', function (request, response) {
  response.send('Hello World! (for the ' + requests + 'th time)')
})

server.listen(3000, onListen)

//------------------------------------------------------------------------------
function updateCounter(request, response, next) {
  redisClient.incr("counter", function(err, reply) {
    if (err) {
      console.log("error updating request counter in redis:", err)
      return next(err)
    }

    requests = reply
    next()
  })
}

//------------------------------------------------------------------------------
function onListen() {
  let host = server.address().address
  let port = server.address().port

  if (host == "::") host = "localhost"

  console.log('http server listening at http://%s:%s', host, port)
}
