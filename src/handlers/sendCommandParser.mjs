export default _text => {
  const text = _text.toLowerCase()

  const parts = text.split(' ')

  const [
    ,
    value,
    ,
    receiver,
    ...rest
  ] = parts

  const firstNotUsernameWordIndex = rest.findIndex(word => !word.startsWith('@'))
  const remainingReceivers = firstNotUsernameWordIndex !== -1 ? rest.slice(0, firstNotUsernameWordIndex) : rest
  const message = rest.slice(firstNotUsernameWordIndex).join(' ')

  const receivers = [receiver, ...remainingReceivers].map(receiver => receiver.substring(1))

  return {
    value: Number(value),
    receivers,
    message
  }
}
