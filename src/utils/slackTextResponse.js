const invariant = require('./invariant')

const _private = text => {
  invariant(text)
  invariant(typeof text === 'string')
  return {
    text
  }
}

const _public = text => {
  invariant(text)
  invariant(typeof text === 'string')
  return {
    text,
    response_type: 'in_channel'
  }
}

module.exports = {
  private: _private,
  public: _public
}
