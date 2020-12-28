const Queue = require('bull')
const axios = require('axios')

const redisHost = process.env.REDIS_HOST
const appHost = process.env.APP_HOST

const mailQueue = new Queue('mail', {redis: {port: 6379, host: redisHost} })

// This queue handles basic events
mailQueue.process(job => console.log(job.data));

// This queue handles long running task
// 1 shows how many concurrent events will be handled
blockerQueue.process(1, async (job) => {
  const res = await axios(`${appHost}/delay`)
  console.log(res.data)
});
console.log('started')
