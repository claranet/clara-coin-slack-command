const VALID_COMMAND_NAMES = [
  'help',
  'aiuto',
  'aiutami',
  'aide'
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

const handle = async (sender, text) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Clara Coin Help*
          
To learn about the principles and rules of Clara Coin, read Claranet Italy's playbook post:
(https://www.flowing.it/blog/come-si-lavora-in-flowing-feedback-mentoring-e-flowing-coin/)
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
          text: '*What you need to know about Clara Coin*:\n\n*To send coins to sailors, use the command:*\n`/coin send [value] to [person] [optiona motive]`.\n\nThe command can be used on any channel, the bot will reply in the channel where the command was launched. \n\nExample: `/coin send 10 to @gioboa for inventing Boa Coins`'
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*To get a summary of your situation, use the command:*:\n`/coin status`.\n\n The response will be a private message not visible to any other user, where the sent coins, received coins, and remaining coins will be listed.'
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*To view a list of all received Clara Coins:*:\n`/coin history`.\n\n The response will be a private message not visible to any other user, where the received coins will be listed.'
        }
      }
    ]
  }
}

module.exports = {
  canHandle,
  handle
}
