import { FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export const createTransactionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
  })

  const { title, amount, type } = createTransactionBodySchema.parse(
    request.body,
  )

  let sessionId = request.cookies.sessionId

  if (!sessionId) {
    sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/', // Qualquer rota irá ter acesso ao cookie
      maxAge: 60 * 60 * 24 * 7, // 7 Days
    })
  }

  try {
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
  } catch (err) {
    console.log(err)
  }

  return reply.status(201).send()
}
