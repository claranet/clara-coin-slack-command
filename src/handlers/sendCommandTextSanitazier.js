const isStringANumber = string => {
  return !isNaN(Number(string))
}

const IRREGAULAR_WHITE_SPACE_REGEX = /\s+/ig

module.exports = _text => {
  const text = _text.replace(IRREGAULAR_WHITE_SPACE_REGEX, ' ').trim().toLowerCase()
  const [start] = text.split(' ')
  if (isStringANumber(start)) {
    return `send ${text}`
  }

  return text
}
