'use strict'
const { ThreadWorker } = require('poolifier')
function myFunction (data) {
  return { ok: 1, data }
}
module.exports = new ThreadWorker(myFunction, { maxInactiveTime: 60000 })
