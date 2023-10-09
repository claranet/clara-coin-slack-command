const assert = require('node:assert')

const _private = text => {
  assert(text, 'text is required')
  assert(typeof text === 'string', 'text must be a string')
  return {
    text,
    response_type: 'ephemeral'
  }
}

const _public = text => {
  assert(text, 'text is required')
  assert(typeof text === 'string', 'text must be a string')
  return {
    text,
    response_type: 'in_channel'
  }
}

module.exports = {
  private: _private,
  public: _public
}
