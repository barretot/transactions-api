import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import {
  getTransaction,
  createTransaction,
  getTransactionById,
  getSummary,
} from './schemas'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionRoutes(app: FastifyInstance) {
  app.post('', {
    schema: createTransaction.schema,
    handler: async (request, reply) => {
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
    },
  })

  app.get('', {
    preHandler: checkSessionIdExists,
    schema: getTransaction.schema,
    handler: async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*')

      return { transactions }
    },
  })

  app.get('/summary', {
    preHandler: checkSessionIdExists,
    schema: getSummary.schema,
    handler: async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .sum('amount', { as: 'amount' })
        .where('session_id', sessionId)
        .first()

      return { summary }
    },
  })

  app.get('/:id', {
    preHandler: checkSessionIdExists,
    schema: getTransactionById.schema,
    handler: async (request) => {
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
    },
  })
}
