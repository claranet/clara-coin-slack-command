const coinRepositoryMjs = require('../lib/coinRepository')

const VALID_COMMAND_NAMES = [
  'history',
  'storia',
  'historique'
]

const canHandle = (_sender, rawText) => {
  if (!rawText) {
    return false
  }
  const text = rawText.toLowerCase()

  const parts = text.split(' ')

  const [
    command
  ] = parts

  if (!VALID_COMMAND_NAMES.includes(command)) {
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

const handle = async (sender, text) => {
  const coins = await coinRepositoryMjs.listCoinReceivedBy(sender)
  return receivedMessage(coins)
}

module.exports = {
  canHandle,
  handle
}
