module.exports = (rawData) => {
  return rawData
    .map(item => {
      const {
        sender,
        receiver,
        amount
      } = item

      return new Array(amount).fill({
        sender,
        receiver
      })
    })
    .flat()
}
