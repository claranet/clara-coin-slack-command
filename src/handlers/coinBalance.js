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
  return slackTextResponse.private(`:heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:\nHi ${sender} \nyou have still *${remainingCoins} Clara Coins* \n:heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:`)
}

const quiteEmptyBalanceMessage = (sender, remainingCoins) => {
  return slackTextResponse.private(`:eyes: Ehi ${sender} \nkeep an eye on your remaining balance. There are only *${remainingCoins} Clara Coins left* :eyes:`)
}

const emptyBalanceMessage = (sender) => {
  return slackTextResponse.private(`:gratitude-thank-you: ${sender} \nYou used all of your Clara Coins. Now you can say thanks with a flower! :blossom:`)
}

module.exports = {
  sendToSender
}
