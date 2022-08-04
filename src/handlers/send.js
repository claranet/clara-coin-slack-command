const sendCommandParser = require('./sendCommandParser')
const coinRepository = require('../lib/coinRepository')
const coinExchangeFactory = require('../model/coinExchange')
const config = require('../model/config')

const slackUtils = require('../utils/slack')
const slackTextResponse = require('../utils/slackTextResponse')
const sendCommandTextSanitazier = require('./sendCommandTextSanitazier')

const coinBalance = require('./coinBalance')

const VALID_COMMAND_NAMES = Object.freeze([
  'send',
  'invia',
  'invio',
  'manda'
])

const VALID_TO = Object.freeze([
  'to',
  'a'
])

const canHandle = (sender, _text) => {
  if (!_text) {
    return false
  }
  const text = sendCommandTextSanitazier(_text)

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

const handle = async (sender, text, responseUrl) => {
  const {
    value,
    receivers,
    message
  } = sendCommandParser(text)

  const alreadySentCoins = await coinRepository.countBySender(sender)

  const dryRun = message.toLowerCase().endsWith('--dry')

  const coinExchange = coinExchangeFactory({
    sender,
    receivers,
    amount: value,
    alreadySentCoins,
    totalCoins: config.TOTAL_COINS,
    message
  })

  const validationResult = coinExchange.validateSend()

  if (validationResult === coinExchange.VALIDATION_STATUS.NOT_ENOUGH_COINS) {
    return slackTextResponse.private(`Purtroppo non hai abbastanza Clara Coin (${config.TOTAL_COINS - alreadySentCoins}) per ringraziare ${receivers.join(', ')}`)
  }

  if (validationResult === coinExchange.VALIDATION_STATUS.INVALID_AMOUNT) {
    return slackTextResponse.private(`Non puoi inviare ${value} Clara Coin.`)
  }

  if (validationResult === coinExchange.VALIDATION_STATUS.CANNOT_SEND_TO_SELF) {
    return slackTextResponse.private('Non puoi inviare Clara Coin a te stesso.')
  }

  if (!dryRun) {
    await coinRepository.add(coinExchange.toEntity())
  }

  await coinBalance.sendToSender(sender, responseUrl)

  const parsedMessage = message ? ` ${message}` : ''

  return slackTextResponse.public(`Grazie, hai inviato ${value} Clara Coin a ${receivers.join(', ')}${parsedMessage}.${dryRun ? ' (DRY RUN)' : ''}`)
}

module.exports = {
  canHandle,
  handle
}
