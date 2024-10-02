import { FastifyRequest } from 'fastify'
import { knex } from '../../database'
import { z } from 'zod'

export const getTransactionByIdHandler = async (request: FastifyRequest) => {
  const getTransactionParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getTransactionParamSchema.parse(request.params)

  const { sessionId } = request.cookies

  const transaction = await knex('transactions')
    .where({
      session_id: sessionId,
      id,
    })
    .first()

  return { transaction }
}
