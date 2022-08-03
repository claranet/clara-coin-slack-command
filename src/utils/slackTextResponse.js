const invariant = require('./invariant')

const _private = text => {
  invariant(text, 'text is required')
  invariant(typeof text === 'string', 'text must be a string')
  return {
    text,
    response_type: 'ephemeral'
  }
}

const _public = text => {
  invariant(text, 'text is required')
  invariant(typeof text === 'string', 'text must be a string')
  return {
    text,
    response_type: 'in_channel'
  }
}

module.exports = {
  private: _private,
  public: _public
}
