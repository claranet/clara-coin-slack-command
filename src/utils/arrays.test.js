const tap = require('tap')
const arrays = require('./arrays')

tap.test('arrays', t => {
  tap.test('should find the last index of a true predicate', t => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const predicate = n => n % 2 === 1
    const result = arrays.findLastIndex(array, predicate)
    t.equal(result, 8)
    t.end()
  })
  t.end()
})
