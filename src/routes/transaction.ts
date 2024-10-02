import { FastifyInstance } from 'fastify'
import {
  getTransaction,
  createTransaction,
  getTransactionById,
  getSummary,
} from './schemas'

import {
  createTransactionHandler,
  getSummaryHandler,
  getTransactionByIdHandler,
  getTransactionsHandler,
} from './handlers'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionRoutes(app: FastifyInstance) {
  app.post('', {
    schema: createTransaction.schema,
    handler: createTransactionHandler,
  })

  app.get('', {
    preHandler: checkSessionIdExists,
    schema: getTransaction.schema,
    handler: getTransactionsHandler,
  })

  app.get('/summary', {
    preHandler: checkSessionIdExists,
    schema: getSummary.schema,
    handler: getSummaryHandler,
  })

  app.get('/:id', {
    preHandler: checkSessionIdExists,
    schema: getTransactionById.schema,
    handler: getTransactionByIdHandler,
  })
}
