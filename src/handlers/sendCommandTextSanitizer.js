const isStringANumber = string => {
  return !isNaN(Number(string))
}

const IRREGULAR_WHITE_SPACE_REGEX = /\s+/ig

module.exports = text => {
  const cleanText = text.replace(IRREGULAR_WHITE_SPACE_REGEX, ' ').trim()
  const [start] = cleanText.split(' ')
  if (isStringANumber(start)) {
    return `send ${cleanText}`
  }

  return cleanText
}
