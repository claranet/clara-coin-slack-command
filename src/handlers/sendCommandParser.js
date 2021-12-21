const slackUtils = require('../utils/slack')
const arrays = require('../utils/arrays')

const getMessage = (firstNotUsernameWordIndex, rest) => {
  if (firstNotUsernameWordIndex === -1) {
    return ''
  }

  return rest
    .slice(firstNotUsernameWordIndex)
    .map(word => {
      const result = slackUtils.isSlackChannel(word) ? `#${slackUtils.getSlackChannel(word)}` : word
      console.log({ word, result, b: slackUtils.isSlackChannel(word) })
      return result
    })
    .join(' ')
}

module.exports = _text => {
  const text = _text.toLowerCase()

  const parts = text.split(' ')

  const [
    ,
    value,
    ,
    receiver,
    ...rest
  ] = parts

  const firstNotUsernameWordIndex = arrays.findLastIndex(rest, word => slackUtils.isSlackUser(word)) + 1
  const maybeRemaingReceivers = firstNotUsernameWordIndex !== -1 ? rest.slice(0, firstNotUsernameWordIndex) : rest
  console.log({ firstNotUsernameWordIndex, rest, maybeRemaingReceivers })
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
