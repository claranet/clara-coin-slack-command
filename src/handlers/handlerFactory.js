const statusHandler = require('./status')
const boaHandler = require('./boa')
const helpHandler = require('./help')
const sendHandler = require('./send')

const HANDLERS = Object.freeze([
  statusHandler,
  boaHandler,
  helpHandler,
  sendHandler
])

module.exports = (userName, text) => {
  const handler = HANDLERS.find(handler => handler.canHandle(userName, text))

  return handler
}
