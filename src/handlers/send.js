const sendCommandParser = require('./sendCommandParser')
const coinRepository = require('../lib/coinRepository')

const TOTAL_COINS = 35

const VALID_COMMAND_NAMES = [
  'send',
  'invia',
  'invio',
  'manda'
]

const VALID_TO = [
  'to',
  'a'
]

const canHandle = (sender, _text) => {
  if (!_text) {
    return false
  }
  const text = _text.toLowerCase()

  const parts = text.split(' ')

  const [
    command,
    value,
    to,
    receiver
  ] = parts

  if (!VALID_COMMAND_NAMES.includes(command)) {
    return false
  }

  if (!Number.isFinite(Number(value))) {
    return false
  }

  if (!VALID_TO.includes(to)) {
    return false
  }

  return receiver.startsWith('@')
}

const handle = async (sender, text) => {
  const sendData = sendCommandParser(text)

  const coinsToSend = sendData.value * sendData.receivers.length
  const senderCoins = await coinRepository.countBySender(sender)
  if (TOTAL_COINS - senderCoins < coinsToSend) {
    return `Purtroppo non hai abbastanza (${senderCoins}) Flowing Coin per ringraziare ${sendData.receivers.join(', ')}`
  }

  await coinRepository.add({
    from: sender,
    to: sendData.receivers,
    amount: sendData.value
  })

  const remaingCoins = TOTAL_COINS - senderCoins - coinsToSend

  return {
    response_type: 'in_channel',
    text: `Grazie, hai inviato ${sendData.value} Flowing Coin a ${sendData.receivers.join(', ')}. Ti rimangono ${remaingCoins} Flowing Coin.`
  }
}

module.exports = {
  canHandle,
  handle
}
