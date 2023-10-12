import * as statusHandler from './status.js'
import * as helpHandler from './help.js'
import * as sendHandler from './send.js'
import * as historyHandler from './history.js'

const HANDLERS = Object.freeze([
  statusHandler,
  helpHandler,
  sendHandler,
  historyHandler
])

export const handlerFactory = (userName, text) => {
  const handler = HANDLERS.find(handler => handler.canHandle(userName, text))

  return handler
}
