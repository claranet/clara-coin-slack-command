
'use strict'

const parser = require('body-parser-for-serverless')
const sendHandler = require('./src/handlers/send')
const statusHandler = require('./src/handlers/status')
const helpHandler = require('./src/handlers/help')
const boaHandler = require('./src/handlers/boa')

const handlers = [
  statusHandler,
  boaHandler,
  helpHandler,
  sendHandler
]

const getResult = async body => {
  const {
    text
  } = body

  const userName = body.user_name

  const handler = handlers.find(handler => handler.canHandle(userName, text))

  if (handler) {
    const result = await handler.handle(userName, text)
    return result
  }

  return 'Scusa non ho capito, prova a scrivere `\\coin help` per chiedere aiuto'
}

module.exports.v1 = async (event) => {
  const body = await parser(event)
  const result = await getResult(body)

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}