import coinRepositoryMjs from '../lib/coinRepository.mjs'

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

const handle = async (sender, text) => {
  const sent = await coinRepositoryMjs.sent(sender)
  const received = await coinRepositoryMjs.received(sender)

  const totalSent = Object.values(sent).reduce((acc, val) => acc + val, 0)
  const totalReceived = Object.values(received).reduce((acc, val) => acc + val, 0)

  const formattedSent = Object.entries(sent).map(([name, value]) => `* ${name}: ${value}`).join('\n')
  const formattedReceived = Object.entries(received).map(([name, value]) => `* ${name}: ${value}`).join('\n')

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Ciao ${sender}, ecco un recap della tua situazione*`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hai inviato un totale di ${totalSent} Flowing Coin così ripartiti: ${formattedSent}`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hai ricevuto un totale di ${totalReceived} Flowing Coin così ripartiti: ${formattedReceived}`
        }
      }
    ]
  }
}

export default {
  canHandle,
  handle
}
