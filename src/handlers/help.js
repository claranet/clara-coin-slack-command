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
          text: `*Clara Coin Help*
          
Per conoscere i principi e le regole dei Clara Coin leggi il nostro post del plyabook:
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
          text: '*Cosa devi sapere sui Clara Coin*:\n\n*Per inviare dei coin a dei surfer usa il comando:*\n`/coin invia [valore] a [persona] [motivo opzionale]`.\noppure\n`/coin [valore] a [persona] [motivo opzionale]`\n\nIl comando può essere usato su qualsiasi canale, il bot vi risponderà nel canale in cui il comando è stato lanciato. \n\nEsempio: `/coin invia 10 a @gioboa per aver inventato i Boa Coin`'
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Per conoscere il recap della tua situazione usa il comando:*:\n`/coin status`.\n\n La risposta sarà un messaggio privato non visibile a nessun altro utente in cui saranno elencati i coin inviati e i coin ricevuti e quelli residui.'
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Per avere un elenco di tutti i Clara Coin ricevuti:*:\n`/coin history`.\n\n La risposta sarà un messaggio privato non visibile a nessun altro utente in cui saranno elencati i coin ricevuti con l\'eventuale motivazione.'
        }
      }
    ]
  }
}

module.exports = {
  canHandle,
  handle
}
