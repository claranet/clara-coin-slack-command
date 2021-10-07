import Fastify from 'fastify'
import fastifyFormBody from 'fastify-formbody'

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

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
