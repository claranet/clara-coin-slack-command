import tap from 'tap'
import { handlerFactory } from './handlerFactory.js'
import * as sendHandler from './send.js'

tap.test('handlerFactory', t => {
  tap.test('should find the right handler', t => {
    const handler = handlerFactory('bugs-bunny', 'invia 3 a <@U01R04VBMUH|betty.boop> perché è un bravo giocatore di haxball')
    t.equal(handler, sendHandler)
    t.end()
  })
  t.end()
})
