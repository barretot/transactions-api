export const getTransaction = {
  schema: {
    description: 'Cria uma nova transação',
    tags: ['Transactions'],
    response: {
      200: {
        description: 'Resposta bem-sucedida',
        type: 'object',
        properties: {
          transactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '18a91801-7ff2-4ff9-ae49-68eeffc52438',
                },
                title: {
                  type: 'string',
                  example: 'Freelancer',
                },
                amount: {
                  type: 'number',
                  example: 2000.0,
                },
                type: {
                  type: 'string',
                  enum: ['credit', 'debit'],
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-10-01T03:19:18Z',
                },
                session_id: {
                  type: 'string',
                  nullable: true,
                },
              },
            },
          },
        },
      },
      404: {
        description: 'Transação não encontrada',
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Transaction not found',
          },
        },
      },
    },
  },
}
