const invariant = function (condition, message) {
  if (!message) {
    console.warn('invariant without message')
  }

  if (!condition) {
    throw new Error(message)
  }
}

module.exports = invariant
