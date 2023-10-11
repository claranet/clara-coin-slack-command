import tap from 'tap'
import { sendCommandParser } from './sendCommandParser.js'

tap.test('sendCommandParser', t => {
  tap.test('should extract receiver and value', t => {
    const message = sendCommandParser('send 1 to <@U1U605T16|bugs.bunny>')
    t.match(message, {
      value: 1,
      receivers: ['bugs.bunny']
    })
    t.end()
  })

  tap.test('should extract all the receivers', t => {
    const message = sendCommandParser('send 1 to <@U1U605T16|bugs.bunny> <@U1U605T17|fosco>')
    t.match(message, {
      value: 1,
      receivers: ['bugs.bunny', 'fosco']
    })
    t.end()
  })

  tap.test('should extract the message at the end of the command', t => {
    const message = sendCommandParser('send 1 to <@U1U605T16|bugs.bunny> <@U1U605T17|fosco> because they are too cool')
    t.match(message, {
      value: 1,
      receivers: ['bugs.bunny', 'fosco'],
      message: 'because they are too cool'
    })
    t.end()
  })

  tap.test('should preserve the message case', t => {
    const message = sendCommandParser('SEND 1 TO <@U1U605T16|bugs.bunny> <@U1U605T17|fosco> because they are TOO cool')
    t.match(message, {
      value: 1,
      receivers: ['bugs.bunny', 'fosco'],
      message: 'because they are TOO cool'
    })
    t.end()
  })

  tap.test('should escape channel names', t => {
    const message = sendCommandParser('send 1 to <@U1U605T16|bugs.bunny> <@U1U605T17|fosco> because of their work on <#C015G9N3J02|random>')
    t.match(message, {
      value: 1,
      receivers: ['bugs.bunny', 'fosco'],
      message: 'because of their work on #random'
    })
    t.end()
  })

  tap.test('should work also in italian', t => {
    const message = sendCommandParser('invia 1 a <@U1U66VAP9|adellava> <@U1Y5G64AX|g.mandolini>')
    t.match(message, {
      value: 1,
      receivers: ['adellava', 'g.mandolini']
    })
    t.end()
  })

  tap.test('send command could be omitted', t => {
    const message = sendCommandParser('1 a <@U1U66VAP9|adellava> <@U1Y5G64AX|g.mandolini>')
    t.match(message, {
      value: 1,
      receivers: ['adellava', 'g.mandolini']
    })
    t.end()
  })

  tap.test('should consider conjunctions', t => {
    const englishMessage = sendCommandParser('send 1 to <@U1U66VAP9|adellava> and <@U1Y5G64AX|g.mandolini> becasue they are too cool')
    t.match(englishMessage, {
      value: 1,
      receivers: ['adellava', 'g.mandolini'],
      message: 'becasue they are too cool'
    })
    const italianMessage = sendCommandParser('invia 1 a <@U1U66VAP9|adellava> e a <@U1Y5G64AX|g.mandolini> perché sono troppo cool')
    t.match(italianMessage, {
      value: 1,
      receivers: ['adellava', 'g.mandolini'],
      message: 'perché sono troppo cool'
    })
    t.end()
  })

  t.end()
})
