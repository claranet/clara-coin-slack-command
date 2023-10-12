import { coinRepository } from '../lib/coinRepository.js'

const VALID_COMMAND_NAMES = new Set([
  'history',
  'storia',
  'historique'
])

export const canHandle = (_sender, rawText) => {
  if (!rawText) {
    return false
  }
  const text = rawText.toLowerCase()

  const parts = text.split(' ')

  const [
    command
  ] = parts

  if (!VALID_COMMAND_NAMES.has(command)) {
    return false
  }

  return true
}

const receivedMessage = (coins = []) => {
  if (coins.length === 0) {
    return noCoinMessage()
  }

  const message = coins.map(coin => {
    return `Received ${coin.amount} Clara Coin from ${coin.sender} ${coin.message ? `for the following reason: "${coin.message}"` : ''}`
  }).join('\n')

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Received Clara Coins*
Here's a quick summary of the received Clara Coins:
          `
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message
        }
      }
    ]
  }
}

const noCoinMessage = () => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Received Clara Coins*
You haven’t received any Clara Coins.`
        }
      }
    ]
  }
}

export const handle = async (sender, text) => {
  const coins = await coinRepository.listCoinReceivedBy(sender)
  return receivedMessage(coins)
}
