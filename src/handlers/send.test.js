const tap = require('tap')
const sendHandler = require('./send')

const {
  canHandle
} = sendHandler

tap.test('a send command should contain a number after send', t => {
  const isSend = canHandle('fosco', 'send 1 to @Strazz')
  const isNotSend = canHandle('fosco', 'send 1')
  t.ok(isSend)
  t.notOk(isNotSend)
  t.end()
})

tap.test('a send command should work also in italian', t => {
  const isSend = canHandle('fosco', 'invia 1 a @Strazz')
  t.ok(isSend)
  t.end()
})

tap.test('a send command should not work with float numbers', t => {
  const isSend = canHandle('fosco', 'invia 0.6 a @Strazz')
  t.notOk(isSend)
  t.end()
})
