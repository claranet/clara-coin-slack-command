const tap = require('tap')
const sendCommandParser = require('./sendCommandParser')

tap.test('sendCommandParser should extract receiver and value', t => {
  const message = sendCommandParser('send 1 to <@U1U605T16|francesco-strazzullo>')
  t.match(message, {
    value: 1,
    receivers: ['francesco-strazzullo']
  })
  t.end()
})

tap.test('sendCommandParser should extract all the receivers', t => {
  const message = sendCommandParser('send 1 to <@U1U605T16|francesco-strazzullo> <@U1U605T17|fosco>')
  t.match(message, {
    value: 1,
    receivers: ['francesco-strazzullo', 'fosco']
  })
  t.end()
})

tap.test('sendCommandParser should extract the message at the end of the command', t => {
  const message = sendCommandParser('send 1 to <@U1U605T16|francesco-strazzullo> <@U1U605T17|fosco> because they are too cool')
  t.match(message, {
    value: 1,
    receivers: ['francesco-strazzullo', 'fosco'],
    message: 'because they are too cool'
  })
  t.end()
})

tap.test('sendCommandParser should work also in italian', t => {
  const message = sendCommandParser('invia 1 a <@U1U66VAP9|adellava> <@U1Y5G64AX|g.mandolini>')
  t.match(message, {
    value: 1,
    receivers: ['adellava', 'g.mandolini']
  })
  t.end()
})
