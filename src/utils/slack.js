const SLACK_USER_REGEX = /<@\w+\|([\w.-]+)>/gm
const SLACK_CHANNEL_REGEX = /<#\w+\|([\w.-]+)>/gm

export const isSlackUser = receiver => {
  const regEx = new RegExp(SLACK_USER_REGEX)
  return regEx.test(receiver)
}

export const isSlackChannel = maybeChannel => {
  const regEx = new RegExp(SLACK_CHANNEL_REGEX)
  return regEx.test(maybeChannel)
}

export const getSlackUserName = receiver => {
  if (!isSlackUser(receiver)) {
    return ''
  }
  const regEx = new RegExp(SLACK_USER_REGEX)
  const match = regEx.exec(receiver)
  return match[1]
}

export const getSlackChannel = maybeChannel => {
  if (!isSlackChannel(maybeChannel)) {
    return ''
  }
  const regEx = new RegExp(SLACK_CHANNEL_REGEX)
  const match = regEx.exec(maybeChannel)
  return match[1]
}
