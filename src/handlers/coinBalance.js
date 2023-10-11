import { coinRepository } from '../lib/coinRepository.js'
import { sendMessage } from '../lib/slackApiClient.js'
import { slackTextResponsePrivate } from '../utils/slackTextResponse.js'

export const sendToSender = async (sender, responseUrl) => {
  const remainingCoins = await coinRepository.remainingCoins(sender)
  const message = balanceMessage(sender, remainingCoins)
  await sendMessage(message, responseUrl)
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
  return slackTextResponsePrivate(`:heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:\nHi ${sender} \nyou have still *${remainingCoins} Clara Coins* \n:heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:`)
}

const quiteEmptyBalanceMessage = (sender, remainingCoins) => {
  return slackTextResponsePrivate(`:eyes: Ehi ${sender} \nkeep an eye on your remaining balance. There are only *${remainingCoins} Clara Coins left* :eyes:`)
}

const emptyBalanceMessage = (sender) => {
  return slackTextResponsePrivate(`:gratitude-thank-you: ${sender} \nYou used all of your Clara Coins. Now you can say thanks with a flower! :blossom:`)
}
