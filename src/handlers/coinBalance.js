const coinRepository = require('../lib/coinRepository')
const slackApiClient = require('../lib/slackApiClient')
const slackTextResponse = require('../utils/slackTextResponse')

const sendToSender = async (sender, responseUrl) => {
  const remainingCoins = await coinRepository.remainingCoins(sender)
  const message = slackTextResponse.private(`Il tuo saldo residuo è di ${remainingCoins} FlowingCoins`)
  await slackApiClient.sendMessage(message, responseUrl)
}

module.exports = {
  sendToSender
}
