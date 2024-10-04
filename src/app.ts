import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionRoutes } from './routes/transaction'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export const app = fastify({
  logger: true,
  ajv: {
    customOptions: {
      strict: false,
    },
  },
})

app.register(cookie)

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      description: 'API Transactions Documentation',
      version: '1.0.0',
    },
  },
})

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: (request, reply, next) => {
      next()
    },
    preHandler: (request, reply, next) => {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
})

app.register(transactionRoutes, {
  prefix: 'transactions',
})
