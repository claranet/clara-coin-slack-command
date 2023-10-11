import * as slackUtils from '../utils/slack.js'
import { sendCommandTextSanitizer } from './sendCommandTextSanitizer.js'

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

export const sendCommandParser = rawText => {
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
  const maybeRemaingReceivers = firstNotUsernameWordIndex === -1 ? rest : rest.slice(0, firstNotUsernameWordIndex)
  const message = getMessage(firstNotUsernameWordIndex, rest)
  const remainingReceivers = maybeRemaingReceivers.filter((rcv) => slackUtils.isSlackUser(rcv))

  const receivers = [receiver, ...remainingReceivers]
    .map(receiver => slackUtils.getSlackUserName(receiver))

  return {
    value: Number(value),
    receivers,
    message
  }
}
