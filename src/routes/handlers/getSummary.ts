import { FastifyRequest } from 'fastify'
import { knex } from '../../database'

export const getSummaryHandler = async (request: FastifyRequest) => {
  const { sessionId } = request.cookies

  const summary = await knex('transactions')
    .sum('amount', { as: 'amount' })
    .where('session_id', sessionId)
    .first()

  return { summary }
}
