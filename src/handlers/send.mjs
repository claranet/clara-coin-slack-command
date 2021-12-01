import sendCommandParser from './sendCommandParser.mjs'
import coinRepository from '../lib/coinRepository.mjs'

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
  if (senderCoins + coinsToSend < TOTAL_COINS) {
    return `Purtroppo non hai abbastanza Flowing Coin per ringraziare ${sendData.receivers.join(', ')}`
  }

  await coinRepository.add({
    from: sender,
    to: sendData.receivers,
    amount: sendData.value
  })

  return `Grazie, hai inviato ${sendData.value} Flowing Coin a ${sendData.receivers.join(', ')}`
}

export default {
  canHandle,
  handle
}
