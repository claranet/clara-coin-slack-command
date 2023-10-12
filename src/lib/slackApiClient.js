import * as undici from 'undici'

export const sendMessage = async (message, responseUrl) => {
  try {
    return await undici.request(
      responseUrl,
      { body: JSON.stringify(message), method: 'POST' }
    )
  } catch (error) {
    console.error(error)
  }
}
