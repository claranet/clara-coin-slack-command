const slackUtils = require('../utils/slack')
const sendCommandTextSanitizer = require('./sendCommandTextSanitizer')

const getMessage = (firstNotUsernameWordIndex, rest) => {
  if (firstNotUsernameWordIndex === -1) {
    return ''
  }

  return rest
    .slice(firstNotUsernameWordIndex)
    .map(word => {
      const result = slackUtils.isSlackChannel(word) ? `#${slackUtils.getSlackChannel(word)}` : word
      return result
    })
    .join(' ')
}

module.exports = rawText => {
  const text = sendCommandTextSanitizer(rawText)

  const parts = text.split(' ')

  const [
    ,
    value,
    ,
    receiver,
    ...rest
  ] = parts

  const firstNotUsernameWordIndex = rest?.findLastIndex(word => slackUtils.isSlackUser(word)) + 1
  const maybeRemaingReceivers = firstNotUsernameWordIndex !== -1 ? rest.slice(0, firstNotUsernameWordIndex) : rest
  const message = getMessage(firstNotUsernameWordIndex, rest)
  const remainingReceivers = maybeRemaingReceivers.filter(slackUtils.isSlackUser)

  const receivers = [receiver, ...remainingReceivers]
    .map(receiver => slackUtils.getSlackUserName(receiver))

  return {
    value: Number(value),
    receivers,
    message
  }
}
