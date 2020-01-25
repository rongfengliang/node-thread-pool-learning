'use strict'

// fix (node:2381) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 26 error listeners added. Use emitter.setMaxListeners() to increase limit
require('events').EventEmitter.defaultMaxListeners = 30

const { FixedThreadPool, DynamicThreadPool } = require('poolifier')

// a fixed thread pool
const pool = new FixedThreadPool(15,
  './src/myWorker.js',
  { errorHandler: (e) => console.error(e), onlineHandler: () => console.log('worker1 is online') })

// or a dynamic thread pool
const pool2 = new DynamicThreadPool(10, 100,
  './src/myWorker.js',
  { errorHandler: (e) => console.error(e), onlineHandler: () => console.log('worker2 is online') })

pool2.emitter.on('FullPool', () => console.log('Pool is full'))

// the execute method signature is the same for both implementations,
// so you can easy switch from one to another
pool.execute({ username: 'dalong', userage: 333 }).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
pool2.execute({ username: 'dalong2', userage: 555 }).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
