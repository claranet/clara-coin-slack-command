const isStringANumber = string => {
  return !Number.isNaN(Number(string))
}

const IRREGULAR_WHITE_SPACE_REGEX = /\s+/gi

export const sendCommandTextSanitizer = text => {
  const cleanText = text.replaceAll(IRREGULAR_WHITE_SPACE_REGEX, ' ').trim()
  const [start] = cleanText.split(' ')
  if (isStringANumber(start)) {
    return `send ${cleanText}`
  }

  return cleanText
}
