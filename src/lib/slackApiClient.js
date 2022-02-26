const undici = require('undici')

const sendMessage = async (message, responseUrl) => {
  try {
    return await undici.request(
      responseUrl,
      { body: JSON.stringify(message), method: 'POST' }
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  sendMessage
}
