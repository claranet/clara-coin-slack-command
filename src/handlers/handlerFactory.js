const statusHandler = require('./status')
const boaHandler = require('./boa')
const helpHandler = require('./help')
const sendHandler = require('./send')
const historyHandler = require('./history')

const HANDLERS = Object.freeze([
  statusHandler,
  boaHandler,
  helpHandler,
  sendHandler,
  historyHandler
])

module.exports = (userName, text) => {
  const handler = HANDLERS.find(handler => handler.canHandle(userName, text))

  return handler
}
