const tap = require('tap')
const sendCommandParser = require('./sendCommandParser')

tap.test('sendCommandParser should extract receiver and value', t => {
  const message = sendCommandParser('send 1 to @Strazz')
  t.match(message, {
    value: 1,
    receivers: ['strazz']
  })
  t.end()
})

tap.test('sendCommandParser should extract all the receivers', t => {
  const message = sendCommandParser('send 1 to @Strazz @Fosco')
  t.match(message, {
    value: 1,
    receivers: ['strazz', 'fosco']
  })
  t.end()
})

tap.test('sendCommandParser should extract the message at the end of the command', t => {
  const message = sendCommandParser('send 1 to @Strazz @Fosco because they are too cool')
  t.match(message, {
    value: 1,
    receivers: ['strazz', 'fosco'],
    message: 'because they are too cool'
  })
  t.end()
})
