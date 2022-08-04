const coinRepositoryMjs = require('../lib/coinRepository')

const VALID_COMMAND_NAMES = [
  'history',
  'storia'
]

const canHandle = (sender, _text) => {
  if (!_text) {
    return false
  }
  const text = _text.toLowerCase()

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
    return `Ricevuti ${coin.amount} Clara Coin da ${coin.sender} ${coin.message ? `per la seguente motivazione: "${coin.message}"` : ''}`
  }).join('\n')

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Clara Coin Ricevuti*
Ecco un piccolo recap dei Clara Coin ricevuti:
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
          text: `*Clara Coin Ricevuti*
Non hai ricevuto nessun Clara Coin.`
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
