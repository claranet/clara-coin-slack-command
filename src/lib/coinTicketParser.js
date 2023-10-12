export const coinTicketParser = (rawData) => {
  return rawData
    .flatMap(item => {
      const {
        sender,
        receiver,
        amount
      } = item

      return Array.from({ length: amount }).fill({
        sender,
        receiver
      })
    })
}
