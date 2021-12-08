const slackUtils = require('../utils/slack')

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

  const firstNotUsernameWordIndex = rest.findIndex(word => !slackUtils.isSlackUser(word))
  const remainingReceivers = firstNotUsernameWordIndex !== -1 ? rest.slice(0, firstNotUsernameWordIndex) : rest
  const message = firstNotUsernameWordIndex !== -1 ? rest.slice(firstNotUsernameWordIndex).join(' ') : ''

  const receivers = [receiver, ...remainingReceivers].map(receiver => slackUtils.getSlackUserName(receiver))

  return {
    value: Number(value),
    receivers,
    message
  }
}
