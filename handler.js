'use strict'

const parser = require('body-parser-for-serverless')

const handlerFactory = require('./src/handlers/handlerFactory')

const slackTextResponse = require('./src/utils/slackTextResponse')
const coinRepository = require('./src/lib/coinRepository')
const coinTicketParser = require('./src/lib/coinTicketParser')

const health = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(process.env.COINS_TABLE),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

const getResult = async body => {
  const {
    text
  } = body

  const userName = body.user_name
  const responseUrl = body.response_url

  const handler = handlerFactory(userName, text)

  if (handler) {
    const result = await handler.handle(userName, text, responseUrl)
    return result
  }

  return slackTextResponse.private(`
    Sorry I did not understand your command, try \`/coin help\` to get some help.
    _Original Message:_ \`/coin ${text}\`
  `)
}

const send = async (event) => {
  try {
    const body = await parser(event)
    if (body.token !== process.env.SLACK_TOKEN) {
      throw new Error('Invalid token')
    }
    const result = await getResult(body)

    console.log({
      body,
      result
    })
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

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5)
}

const csv = async (event) => {
  try {
    if (event.headers.authorization !== process.env.SLACK_TOKEN) {
      return {
        statusCode: 401
      }
    }

    const results = await coinRepository.listAll()
    const tickets = coinTicketParser(results)

    const ticketsAsCsv = shuffle(tickets).map(ticket => {
      return `${ticket.sender} --> ${ticket.receiver}`
    }).join('\n')

    return {
      statusCode: 200,
      body: ticketsAsCsv,
      headers: {
        'Content-Type': 'text/csv'
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}

module.exports.v1 = {
  send,
  health,
  csv
}
