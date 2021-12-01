const VALID_COMMAND_NAMES = [
  'boa'
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
  return {
    response_type: 'in_channel',
    text: ':boa-coin: :vs: :flw-coin: chi vincerà?'
  }
}

module.exports = {
  canHandle,
  handle
}
