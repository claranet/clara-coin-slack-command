import sendCommandParser from './sendCommandParser.mjs'

const canHandle = (sender, _text) => {
  if (!_text) {
    return false
  }
  const text = _text.toLowerCase()

  const parts = text.split(' ')

  const [
    command,
    value,
    to,
    receiver
  ] = parts

  if (command !== 'send') {
    return false
  }

  if (!Number.isFinite(Number(value))) {
    return false
  }

  if (to !== 'to') {
    return false
  }

  return receiver.startsWith('@')
}

const handle = async (sender, text) => {
  const sendData = sendCommandParser(text)
  return `Grazie, abbiamo inviato ${sendData.value} a ${sendData.receivers.join(', ')}`
}

export default {
  canHandle,
  handle
}
