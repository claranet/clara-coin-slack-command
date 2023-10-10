const sendCommandParser = require('./sendCommandParser')
const coinRepository = require('../lib/coinRepository')
const coinExchangeFactory = require('../model/coinExchange')
const config = require('../model/config')

const slackUtils = require('../utils/slack')
const slackTextResponse = require('../utils/slackTextResponse')
const sendCommandTextSanitizer = require('./sendCommandTextSanitizer')

const coinBalance = require('./coinBalance')

const VALID_COMMAND_NAMES = Object.freeze([
  'send',
  'invia',
  'invio',
  'manda',
  'envoie',
  'donne',
  'dona',
  'offre'
])

const VALID_TO = Object.freeze([
  'to',
  'a',
  'à'
])

const canHandle = (_sender, rawText) => {
  if (!rawText) {
    return false
  }
  const text = sendCommandTextSanitizer(rawText)

  const parts = text.split(' ')

  const [
    command,
    value,
    to,
    receiver
  ] = parts

  if (!VALID_COMMAND_NAMES.includes(command.toLowerCase())) {
    return false
  }

  if (!Number.isInteger(Number(value))) {
    return false
  }

  if (!VALID_TO.includes(to?.toLowerCase())) {
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
    return slackTextResponse.private(`Unfortunately, you don't have enough Clara Coins (${config.TOTAL_COINS - alreadySentCoins}) to thank ${receivers.join(', ')}`)
  }

  if (validationResult === coinExchange.VALIDATION_STATUS.INVALID_AMOUNT) {
    return slackTextResponse.private(`You cannot send ${value} Clara Coins.`)
  }

  if (validationResult === coinExchange.VALIDATION_STATUS.CANNOT_SEND_TO_SELF) {
    return slackTextResponse.private('You cannot send Clara Coins to yourself.')
  }

  if (!dryRun) {
    await coinRepository.add(coinExchange.toEntity())
  }

  await coinBalance.sendToSender(sender, responseUrl)

  const parsedMessage = message ? ` ${message}` : ''

  return slackTextResponse.public(`Thanks, you sent ${value} Clara Coins to ${receivers.join(', ')}${parsedMessage}.${dryRun ? ' (DRY RUN)' : ''}`)
}

module.exports = {
  canHandle,
  handle
}
