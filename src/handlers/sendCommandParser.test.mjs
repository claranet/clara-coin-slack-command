import sendCommandParser from './sendCommandParser.mjs'
import tap from 'tap'

tap.test('sendCommandParser should extract receiver and value', t => {
  const message = sendCommandParser('send 1 to @Strazz')
  t.match(message, {
    value: 1,
    receivers: ['strazz']
  })
  t.end()
})

tap.test('sendCommandParser should extract receiver and value', t => {
  const message = sendCommandParser('send 1 to @Strazz Grazie per il feedback')
  t.match(message, {
    value: 1,
    receivers: ['strazz'],
    message: 'grazie per il feedback'
  })
  t.end()
})

tap.test('sendCommandParser should extract all the receivers', t => {
  const message = sendCommandParser('send 1 to @Strazz @Fosco Grazie per il feedback')
  t.match(message, {
    value: 1,
    receivers: ['strazz', 'fosco'],
    message: 'grazie per il feedback'
  })
  t.end()
})
