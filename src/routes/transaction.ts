import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { createTransaction } from './schemas/createTransactionSchema'
import { knex } from '../database'

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

      try {
        await knex('transactions').insert({
          id: randomUUID(),
          title,
          amount: type === 'credit' ? amount : amount * -1,
        })
      } catch (err) {
        console.log(err)
      }

      return reply.status(201).send()
    },
  })
}
