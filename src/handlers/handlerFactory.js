const statusHandler = require('./status')
const helpHandler = require('./help')
const sendHandler = require('./send')
const historyHandler = require('./history')

const HANDLERS = Object.freeze([
  statusHandler,
  helpHandler,
  sendHandler,
  historyHandler
])

module.exports = (userName, text) => {
  const handler = HANDLERS.find(handler => handler.canHandle(userName, text))

  return handler
}
