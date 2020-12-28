const express = require('express')
const Queue = require('bull')

const redisHost = process.env.REDIS_HOST

const app = express()
const mailQueue = new Queue('mail', {redis: {port: 6379, host: redisHost} })
const blockerQueue = new Queue('mail', {redis: {port: 6379, host: redisHost} })

app.get('/mailQueue', (req, res) => {
  mailQueue.add({from: 'me', to: 'you', body: '...'})
  res.json({status: 'pushed'})
})

app.get('/blockerQueue', (req, res) => {
  blockerQueue.add({})
  res.json({status: 'pushed'})
})

// simple route to delay on worker side
app.get('/delay', (req, res) => {
  setTimeout(() => {
    res.json({status: 'finised'})
  }, 5000)
});

app.listen(3000, '0.0.0.0', () => {
  console.log('started')
})
