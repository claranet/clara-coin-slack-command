const axios = require('axios')

const sendMessage = async (message, responseUrl) => {
  await axios.post(
    responseUrl,
    JSON.stringify(message)
  )
}

module.exports = {
  sendMessage
}
