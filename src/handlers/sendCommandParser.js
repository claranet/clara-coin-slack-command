const slackUtils = require('../utils/slack')
const arrays = require('../utils/arrays')

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
  const message = firstNotUsernameWordIndex !== -1 ? rest.slice(firstNotUsernameWordIndex).join(' ') : ''
  const remainingReceivers = maybeRemaingReceivers.filter(slackUtils.isSlackUser)

  const receivers = [receiver, ...remainingReceivers]
    .map(receiver => slackUtils.getSlackUserName(receiver))

  return {
    value: Number(value),
    receivers,
    message
  }
}
