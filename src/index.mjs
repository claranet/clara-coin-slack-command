import Fastify from 'fastify'
import fastifyFormBody from 'fastify-formbody'

import sendHandler from './handlers/send'
import helpHandler from './handlers/help'
import statusHandler from './handlers/status'

const handlers = [
  statusHandler,
  helpHandler,
  sendHandler
]

const PORT = process.env.PORT || 5000

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyFormBody)

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.post('/slack', async (request, reply) => {
  const {
    text
  } = request.body

  const userName = request.body.user_name

  const handler = handlers.find(handler => handler.canHandle(userName, text))

  if (handler) {
    const result = await handler.handle(userName, text)
    return reply.send(result)
  }

  reply.send('Scusa non ho capito, prova a scrivere `\\coin help` per chiedere aiuto')
})

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
