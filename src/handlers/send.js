const sendCommandParser = require('./sendCommandParser')
const coinRepository = require('../lib/coinRepository')
const coinExchangeFactory = require('../model/coinExchange')
const config = require('../model/config')

const slackUtils = require('../utils/slack')

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

  if (!Number.isInteger(Number(value))) {
    return false
  }

  if (!VALID_TO.includes(to)) {
    return false
  }

  return slackUtils.isSlackUser(receiver)
}

const handle = async (sender, text) => {
  const {
    value,
    receivers,
    message
  } = sendCommandParser(text)

  const alreadySentCoins = await coinRepository.countBySender(sender)

  const coinExchange = coinExchangeFactory({
    sender,
    receivers,
    amount: value,
    alreadySentCoins,
    totalCoins: config.TOTAL_COINS
  })

  const validationResult = coinExchange.validateSend()

  if (validationResult === coinExchange.VALIDATION_STATUS.NOT_ENOUGH_COINS) {
    return `Purtroppo non hai abbastanza Flowing Coin (${config.TOTAL_COINS - alreadySentCoins}) per ringraziare ${receivers.join(', ')}`
  }

  if (validationResult === coinExchange.VALIDATION_STATUS.INVALID_AMOUNT) {
    return `Non puoi inviare ${value} Flowing Coin.`
  }

  if (validationResult === coinExchange.VALIDATION_STATUS.CANNOT_SEND_TO_SELF) {
    return 'Non puoi inviare Flowing Coin a te stesso.'
  }

  await coinRepository.add(coinExchange.toEntity())

  const parsedMessage = message ? ` ${message}` : ''

  return {
    response_type: 'in_channel',
    text: `Grazie, hai inviato ${value} Flowing Coin a ${receivers.join(', ')}${parsedMessage}.`
  }
}

module.exports = {
  canHandle,
  handle
}
