const VALID_COMMAND_NAMES = [
  'help',
  'aiuto',
  'aiutami'
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
          text: '*Flowing Coin*'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Invia dei coin a dei surfer: `\\coin invia [valore] a [surfers] [motivo opzionale]`'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Per conoscere il tuo status: `\\coin status`'
        }
      }
    ]
  }
}

export default {
  canHandle,
  handle
}
