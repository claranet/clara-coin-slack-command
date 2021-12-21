const tap = require('tap')
const sendHandler = require('./send')

const {
  canHandle
} = sendHandler

tap.test('a send command should contain a number after send', t => {
  const isSend = canHandle('fosco', 'send 1 to <@U1U605T17|fosco>')
  const isNotSend = canHandle('fosco', 'send 1')
  t.ok(isSend)
  t.notOk(isNotSend)
  t.end()
})

tap.test('a send command should work also in italian', t => {
  const isSend = canHandle('fosco', 'invia 1 a <@U1U605T17|fosco>')
  t.ok(isSend)
  t.end()
})

tap.test('a send command should not work with float numbers', t => {
  const isSend = canHandle('fosco', 'invia 0.6 a <@U1U605T17|fosco>')
  t.notOk(isSend)
  t.end()
})

tap.test('send should invoke coin repository if not in dry run mode', t => {
  let calls = 0
  const sendHandler = t.mock('./send', {
    '../lib/coinRepository': {
      countBySender: () => Promise.resolve(0),
      add: () => { calls++; return Promise.resolve() }
    }
  })

  sendHandler.handle('strazz', 'send 1 to <@U1U605T17|fosco> because he is too cool').then(() => {
    t.equal(calls, 1)
    t.end()
  })
})

tap.test('send should not invoke coin repository if in dry run mode', t => {
  let calls = 0
  const sendHandler = t.mock('./send', {
    '../lib/coinRepository': {
      countBySender: () => Promise.resolve(0),
      add: () => { calls++; return Promise.resolve() }
    }
  })

  sendHandler.handle('strazz', 'send 1 to <@U1U605T17|fosco> because he is too cool --dry').then(() => {
    t.equal(calls, 0)
    t.end()
  })
})
