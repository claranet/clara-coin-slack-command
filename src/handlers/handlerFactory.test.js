const tap = require('tap')
const handlerFactory = require('./handlerFactory')
const sendHandler = require('./send')

tap.test('handlerFactory', t => {
  tap.test('should find the right handler', t => {
    const handler = handlerFactory('bugs-bunny', 'invia 3 a <@U01R04VBMUH|betty.boop> perché è un bravo giocatore di haxball')
    t.equal(handler, sendHandler)
    t.end()
  })
  t.end()
})
