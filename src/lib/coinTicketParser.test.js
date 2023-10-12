import tap from 'tap'
import { coinTicketParser } from './coinTicketParser.js'

tap.test('coinTicketParser', t => {
  tap.test('should extract receiver and value', t => {
    const data = [
      {
        receiver: 'bugs.bunny',
        sender: 'bruce.wayne',
        amount: 3
      },
      {
        receiver: 'minnie.mouse',
        sender: 'harry.potter',
        amount: 1
      }
    ]

    const result = coinTicketParser(data)

    t.match(result, [
      {
        receiver: 'bugs.bunny',
        sender: 'bruce.wayne'
      },
      {
        receiver: 'bugs.bunny',
        sender: 'bruce.wayne'
      },
      {
        receiver: 'bugs.bunny',
        sender: 'bruce.wayne'
      },
      {
        receiver: 'minnie.mouse',
        sender: 'harry.potter'
      }
    ])

    t.end()
  })

  t.end()
})
