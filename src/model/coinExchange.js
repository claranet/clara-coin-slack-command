const config = require('./config')

const VALIDATION_STATUS = {
  OK: Symbol('OK'),
  CANNOT_SEND_TO_SELF: Symbol('CANNOT_SEND_TO_SELF'),
  INVALID_AMOUNT: Symbol('INVALID_AMOUNT'),
  NOT_ENOUGH_COINS: Symbol('NOT_ENOUGH_COINS')
}

const create = ({
  sender,
  receivers = [],
  amount = 1,
  senderCoins
}) => {
  const validateSend = () => {
    if (amount <= 0) {
      return VALIDATION_STATUS.INVALID_AMOUNT
    }

    if (receivers.some(receiver => receiver.toLowerCase() === sender.toLowerCase())) {
      return VALIDATION_STATUS.CANNOT_SEND_TO_SELF
    }

    const coinsToSend = amount * receivers.length
    if (config.TOTAL_COINS - senderCoins < coinsToSend) {
      return VALIDATION_STATUS.NOT_ENOUGH_COINS
    }

    return VALIDATION_STATUS.OK
  }

  return {
    validateSend,
    VALIDATION_STATUS
  }
}

module.exports = create
