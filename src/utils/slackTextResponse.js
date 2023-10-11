import assert from 'node:assert'

export const slackTextResponsePrivate = text => {
  assert(text, 'text is required')
  assert(typeof text === 'string', 'text must be a string')
  return {
    text,
    response_type: 'ephemeral'
  }
}

export const slackTextResponsePublic = text => {
  assert(text, 'text is required')
  assert(typeof text === 'string', 'text must be a string')
  return {
    text,
    response_type: 'in_channel'
  }
}
