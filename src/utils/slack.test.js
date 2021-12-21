const tap = require('tap')
const slackUtils = require('./slack')

tap.test('slackUtils', t => {
  tap.test('isSlackUser', t => {
    tap.test('should return true for escaped slack users', t => {
      t.ok(slackUtils.isSlackUser('<@U1234567|strazz>'))
      t.notOk(slackUtils.isSlackUser('strazz'))
      t.end()
    })
    t.end()
  })

  tap.test('isSlackChannel', t => {
    tap.test('should return true for escaped slack channels', t => {
      t.ok(slackUtils.isSlackChannel('<#C015G9N3J02|random>'))
      t.notOk(slackUtils.isSlackChannel('random'))
      t.end()
    })
    t.end()
  })

  tap.test('getSlackUserName', t => {
    tap.test('should return the username of the escaped slack user', t => {
      t.equal('strazz', slackUtils.getSlackUserName('<@U1234567|strazz>'))
      t.end()
    })

    tap.test('should return empty string when providing an invalid input', t => {
      t.equal('', slackUtils.getSlackUserName(''))
      t.equal('', slackUtils.getSlackUserName('<@U1234567|>'))
      t.equal('', slackUtils.getSlackUserName(0))
      t.equal('', slackUtils.getSlackUserName(undefined))
      t.end()
    })
    t.end()
  })

  tap.test('getSlackChannel', t => {
    tap.test('should return the name of the escaped slack channel', t => {
      t.equal('random', slackUtils.getSlackChannel('<#C015G9N3J02|random>'))
      t.end()
    })

    tap.test('should return empty string when providing an invalid input', t => {
      t.equal('', slackUtils.getSlackChannel(''))
      t.equal('', slackUtils.getSlackChannel('<#C1234567|>'))
      t.equal('', slackUtils.getSlackChannel(0))
      t.equal('', slackUtils.getSlackChannel(undefined))
      t.end()
    })
    t.end()
  })
  t.end()
})
