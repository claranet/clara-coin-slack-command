const SLACK_USER_REGEX = /<@\w+\|([.a-zA-Z0-9_-]+)>/gm

const isSlackUser = receiver => {
  const regEx = new RegExp(SLACK_USER_REGEX)
  return Boolean(regEx.exec(receiver))
}

const getSlackUserName = receiver => {
  if (!isSlackUser(receiver)) {
    return ''
  }
  const regEx = new RegExp(SLACK_USER_REGEX)
  const match = regEx.exec(receiver)
  return match[1]
}

module.exports = {
  isSlackUser,
  getSlackUserName
}
