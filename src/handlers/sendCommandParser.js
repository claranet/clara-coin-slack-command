const slackUtils = require('../utils/slack')

const findLastIndex = (array, predicate) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1
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

  const firstNotUsernameWordIndex = findLastIndex(rest, word => slackUtils.isSlackUser(word)) + 1
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
