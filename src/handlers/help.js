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
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Invia dei coin a dei surfer: `/coin invia [valore] a [surfers]`.\n\n Il comando può essere usato su qualsiasi canale, il bot vi risponderà nel canale in cui il comando è stato lanciato. \n\n*Esempio:* `/coin invia 10 a @gioboa per aver inventato i Boa Coin`'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Per conoscere il tuo status: `/coin status`.\n\n La risposta sarà un messaggio privato non visibile a nessun altro utente.'
        }
      }
    ]
  }
}

module.exports = {
  canHandle,
  handle
}
