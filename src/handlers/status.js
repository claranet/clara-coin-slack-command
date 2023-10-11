import { coinRepository } from '../lib/coinRepository.js'

const VALID_COMMAND_NAMES = new Set([
  'status',
  'stato',
  'statut'
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

const sentMessage = sent => {
  const totalSent = Object.values(sent).reduce((accumulator, value) => accumulator + value, 0)
  const formattedSent = Object.entries(sent).map(([name, value]) => ` - *${name}*: ${value}`).join('\n')

  if (totalSent === 0) {
    return 'You haven\'t sent any Clara Coins.'
  }

  return `You have sent a total of ${totalSent} Clara Coins as follows: \n${formattedSent}`
}

const receivedMessage = received => {
  const totalReceived = Object.values(received).reduce((accumulator, value) => accumulator + value, 0)
  const formattedReceived = Object.entries(received).map(([name, value]) => ` - *${name}*: ${value}`).join('\n')

  if (totalReceived === 0) {
    return 'You haven\'t received any Clara Coins.'
  }

  return `You have received a total of ${totalReceived} Clara Coins as follows: \n${formattedReceived}`
}

export const handle = async (sender) => {
  const sent = await coinRepository.sent(sender)
  const received = await coinRepository.received(sender)
  const remainingCoins = await coinRepository.remainingCoins(sender)

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
