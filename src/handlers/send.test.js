import tap from 'tap'
import { canHandle } from './send.js'

tap.test('canHandle', t => {
  tap.test('a send command could contain irregular whitespaces', t => {
    const isSend = canHandle('enrico', 'invia 3 a <@U1U66VAP9|adellava> per avermi dato consigli puntuali per guidare la retrospettiva con VAS')
    t.ok(isSend)
    t.end()
  })

  tap.test('a send command should contain a number after send', t => {
    const isSend = canHandle('fosco', 'send 1 to <@U1U605T17|fosco>')
    const isNotSend = canHandle('fosco', 'send 1')
    t.ok(isSend)
    t.notOk(isNotSend)
    t.end()
  })

  tap.test('a send command should be case insensitive', t => {
    const isSend = canHandle('fosco', 'SEND 1 TO <@U1U605T17|fosco>')
    t.ok(isSend)
    t.end()
  })

  tap.test('a send command should work also in italian', t => {
    const isSend = canHandle('fosco', 'invia 1 a <@U1U605T17|fosco>')
    t.ok(isSend)
    t.end()
  })

  tap.test('a send command should work also in french', t => {
    const isSend = canHandle('fosco', 'envoie 1 à <@U1U605T17|fosco>')
    t.ok(isSend)
    t.end()
  })

  tap.test('a send command should not work with float numbers', t => {
    const isSend = canHandle('fosco', 'invia 0.6 a <@U1U605T17|fosco>')
    t.notOk(isSend)
    t.end()
  })

  tap.test('the "send" part could be omitted', t => {
    const isSend = canHandle('fosco', '1 a <@U1U605T17|adellava>')
    t.ok(isSend)
    t.end()
  })

  t.end()
})

tap.test('send should invoke coin repository if not in dry run mode', async t => {
  let calls = 0
  const sendHandler = await t.mockImport('./send.js', {
    './coinBalance.js': {
      sendToSender: () => Promise.resolve()
    },
    '../lib/coinRepository.js': {
      coinRepository: {
        countBySender: () => Promise.resolve(0),
        add: () => { calls++; return Promise.resolve() }
      }
    }
  })

  return sendHandler.handle('strazz', 'send 1 to <@U1U605T17|fosco> because he is too cool').then(() => {
    t.equal(calls, 1)
    t.end()
  })
})

tap.test('send should send balance to sender if not in dry run mode', async t => {
  let calls = 0
  const sendHandler = await t.mockImport('./send.js', {
    '../lib/coinRepository.js': {
      coinRepository: {
        countBySender: () => Promise.resolve(0),
        add: () => { return Promise.resolve() }
      }
    },
    './coinBalance.js': {
      sendToSender: () => { calls++; return Promise.resolve() }
    }
  })

  return sendHandler.handle('strazz', 'send 1 to <@U1U605T17|fosco> because he is too cool').then(() => {
    t.equal(calls, 1)
    t.end()
  })
})

tap.test('send should not invoke coin repository if in dry run mode', async t => {
  let calls = 0
  const sendHandler = await t.mockImport('./send.js', {
    '../lib/coinRepository.js': {
      coinRepository: {
        countBySender: () => Promise.resolve(0),
        add: () => { calls++; return Promise.resolve() }
      }
    },
    './coinBalance.js': {
      sendToSender: () => Promise.resolve()
    }
  })

  return sendHandler.handle('strazz', 'send 1 to <@U1U605T17|fosco> because he is too cool --dry').then(() => {
    t.equal(calls, 0)
    t.end()
  })
})
