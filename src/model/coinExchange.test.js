'use strict'
const tap = require('tap')
const coinExchangeFactory = require('./coinExchange')

tap.test('coinExchange', t => {
  tap.test('should return INVALID_AMOUNT when sending a negative amount of coins', t => {
    const coinExchange = coinExchangeFactory({
      alreadySentCoins: 10,
      amount: -1
    })

    t.equal(coinExchange.VALIDATION_STATUS.INVALID_AMOUNT, coinExchange.validateSend())
    t.end()
  })

  tap.test('should return CANNOT_SEND_TO_SELF when sending to self', t => {
    const coinExchange = coinExchangeFactory({
      alreadySentCoins: 10,
      amount: 1,
      sender: 'strazz',
      receivers: ['strazz', 'gioboa']
    })

    t.equal(coinExchange.VALIDATION_STATUS.CANNOT_SEND_TO_SELF, coinExchange.validateSend())
    t.end()
  })

  tap.test('should return NOT_ENOUGH_COINS when sending more of the aviable coins', t => {
    const coinExchange = coinExchangeFactory({
      totalCoins: 20,
      alreadySentCoins: 10,
      amount: 11,
      sender: 'strazz',
      receivers: ['gioboa']
    })

    t.equal(coinExchange.VALIDATION_STATUS.NOT_ENOUGH_COINS, coinExchange.validateSend())
    t.end()
  })

  tap.test('should return OK with a valid transaction', t => {
    const coinExchange = coinExchangeFactory({
      totalCoins: 35,
      alreadySentCoins: 10,
      amount: 11,
      sender: 'strazz',
      receivers: ['gioboa']
    })

    t.equal(coinExchange.VALIDATION_STATUS.OK, coinExchange.validateSend())
    t.end()
  })

  tap.test('shoudl return an immutable entity', t => {
    const coinExchange = coinExchangeFactory({
      totalCoins: 35,
      alreadySentCoins: 10,
      amount: 11,
      sender: 'strazz',
      receivers: ['gioboa']
    })

    t.throws(() => {
      const entity = coinExchange.toEntity()
      entity.amount = 10
    })

    t.end()
  })

  t.end()
})
