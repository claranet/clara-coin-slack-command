const coinRepositoryMjs = require('../lib/coinRepository')

const VALID_COMMAND_NAMES = [
  'status',
  'stato'
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

const sentMessage = sent => {
  const totalSent = Object.values(sent).reduce((acc, val) => acc + val, 0)
  const formattedSent = Object.entries(sent).map(([name, value]) => ` - *${name}*: ${value}`).join('\n')

  if (totalSent === 0) {
    return 'You haven\'t sent any Clara Coins.'
  }

  return `You have sent a total of ${totalSent} Clara Coins as follows: \n${formattedSent}`
}

const receivedMessage = received => {
  const totalReceived = Object.values(received).reduce((acc, val) => acc + val, 0)
  const formattedReceived = Object.entries(received).map(([name, value]) => ` - *${name}*: ${value}`).join('\n')

  if (totalReceived === 0) {
    return 'You haven\'t received any Clara Coins.'
  }

  return `You have received a total of ${totalReceived} Clara Coins as follows: \n${formattedReceived}`
}

const handle = async (sender, text) => {
  const sent = await coinRepositoryMjs.sent(sender)
  const received = await coinRepositoryMjs.received(sender)
  const remainingCoins = await coinRepositoryMjs.remainingCoins(sender)

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Hi ${sender}, You have ${remainingCoins} Clara Coins. Here's a summary of your situation*`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: sentMessage(sent)
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: receivedMessage(received)
        }
      }
    ]
  }
}

module.exports = {
  canHandle,
  handle
}
