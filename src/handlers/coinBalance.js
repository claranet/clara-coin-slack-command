const coinRepository = require('../lib/coinRepository')
const slackApiClient = require('../lib/slackApiClient')
const slackTextResponse = require('../utils/slackTextResponse')

const sendToSender = async (sender, responseUrl) => {
  const remainingCoins = await coinRepository.remainingCoins(sender)
  const message = balanceMessage(sender, remainingCoins)
  await slackApiClient.sendMessage(message, responseUrl)
}

const balanceMessage = (sender, remainingCoins) => {
  if (remainingCoins === 0) {
    return emptyBalanceMessage(sender)
  }

  if (remainingCoins < 5) {
    return quiteEmptyBalanceMessage(sender, remainingCoins)
  }

  return avgBalanceMessage(sender, remainingCoins)
}

const avgBalanceMessage = (sender, remainingCoins) => {
  return slackTextResponse.private(`:heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:\nCiao ${sender} \necco il tuo saldo residuo: *${remainingCoins} Clara Coins* \n:heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:`)
}

const quiteEmptyBalanceMessage = (sender, remainingCoins) => {
  return slackTextResponse.private(`:eyes: Ehi ${sender} \ntieni sott'occhio il tuo saldo residuo. Restano solo *${remainingCoins} Clara Coins* :eyes:`)
}

const emptyBalanceMessage = (sender) => {
  return slackTextResponse.private(`:gratitude-thank-you: ${sender} \nhai usato tutti i tuoi Clara Coins. Ora puoi dire grazie con una :beer:`)
}

module.exports = {
  sendToSender
}
