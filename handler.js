
'use strict'

const parser = require('body-parser-for-serverless')
const sendHandler = require('./src/handlers/send')
const statusHandler = require('./src/handlers/status')
const helpHandler = require('./src/handlers/help')
const boaHandler = require('./src/handlers/boa')

const slackTextResponse = require('./src/utils/slackTextResponse')

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

  return slackTextResponse.private('Scusa non ho capito, prova a scrivere `/coin help` per chiedere aiuto')
}

module.exports.v1 = async (event) => {
  try {
    const body = await parser(event)
    if (body.token !== process.env.SLACK_TOKEN) {
      throw new Error('Invalid token')
    }

    console.log('body', body)
    const result = await getResult(body)
    console.log('result', result)
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
