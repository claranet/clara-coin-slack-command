import parser from 'body-parser-for-serverless'
import { handlerFactory } from './src/handlers/handlerFactory.js'
import { slackTextResponsePrivate } from './src/utils/slackTextResponse.js'
import { coinRepository } from './src/lib/coinRepository.js'
import { coinTicketParser } from './src/lib/coinTicketParser.js'

const health = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(process.env.COINS_TABLE),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

const getResult = async ({ text, user_name: userName, response_url: responseUrl }) => {
  const handler = handlerFactory(userName, text)

  if (handler) {
    const result = await handler.handle(userName, text, responseUrl)
    return result
  }

  return slackTextResponsePrivate(`
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
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
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
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
    }
  }
}

export const v1 = {
  send,
  health,
  csv
}
