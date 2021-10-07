import Fastify from 'fastify'
import fastifyFormBody from 'fastify-formbody'

const PORT = process.env.PORT || 5000

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyFormBody)

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.post('/', function (request, reply) {
  reply.send(JSON.stringify(request.body))
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
