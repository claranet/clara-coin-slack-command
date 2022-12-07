
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
    Scusa non ho capito, prova a scrivere \`/coin help\` per chiedere aiuto.
    _Messaggio Originale:_ \`/coin ${text}\`
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

const tickets = async (event) => {
  try {
    if (event.headers.authorization !== process.env.SLACK_TOKEN) {
      return {
        statusCode: 401
      }
    }

    const results = await coinRepository.listAll()
    const tickets = coinTicketParser(results)

    return {
      statusCode: 200,
      body: JSON.stringify(tickets),
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

const getMultipleRandom = (array, n) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const extract = async (event) => {
  try {
    if (event.headers.authorization !== process.env.SLACK_TOKEN) {
      return {
        statusCode: 401
      }
    }

    const results = await coinRepository.listAll()
    const tickets = coinTicketParser(results)

    const winners = getMultipleRandom(tickets, 3)
    const winningIndex = randomInRange(0, 2)
    const mappedWinners = winners.map((winner, index) => {
      return {
        ...winner,
        prize: index === winningIndex ? 'Money' : 'Toy'
      }
    }
    )

    return {
      statusCode: 200,
      body: JSON.stringify(mappedWinners),
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

module.exports.v1 = {
  send,
  tickets,
  health,
  extract
}
