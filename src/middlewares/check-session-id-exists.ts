import { FastifyReply, FastifyRequest } from 'fastify'

export const checkSessionIdExists = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sessionId = request.cookies.sessionId
  if (!sessionId) {
    return reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
    })
  }
}
