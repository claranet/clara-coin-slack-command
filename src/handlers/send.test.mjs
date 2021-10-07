import sendHandler from './send.mjs'
import tap from 'tap'

const {
  canHandle
} = sendHandler

tap.test('a send command should contain a number after send', t => {
  const isSend = canHandle('send 1 to @Strazz')
  const isNotSend = canHandle('send 1')
  t.ok(isSend)
  t.notOk(isNotSend)
  t.end()
})
