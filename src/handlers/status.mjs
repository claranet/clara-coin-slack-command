const VALID_COMMAND_NAMES = [
  'status',
  'stato'
]

const canHandle = (sender, _text) => {
  if (!_text) {
    return false
  }
  const text = _text.toLowerCase()

  const parts = text.split(' ')

  const [
    command
  ] = parts

  if (!VALID_COMMAND_NAMES.includes(command)) {
    return false
  }

  return true
}

const handle = async (sender, text) => {
  return `Ciao @${sender}, hai ancora disponibili 47 Flowing Coin, mentre ne hai ricevuto 12.`
}

export default {
  canHandle,
  handle
}
