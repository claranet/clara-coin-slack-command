const isStringANumber = string => {
  return !isNaN(Number(string))
}

const IRREGULAR_WHITE_SPACE_REGEX = /\s+/ig

module.exports = _text => {
  const text = _text.replace(IRREGULAR_WHITE_SPACE_REGEX, ' ').trim()
  const [start] = text.split(' ')
  if (isStringANumber(start)) {
    return `send ${text}`
  }

  return text
}
