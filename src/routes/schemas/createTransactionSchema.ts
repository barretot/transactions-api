export const createTransaction = {
  schema: {
    description: 'Cria uma nova transação',
    tags: ['Transactions'],
    body: {
      type: 'object',
      required: ['title', 'amount', 'type'],
      properties: {
        title: { type: 'string', example: 'Freelancer' },
        amount: { type: 'number', example: 2000 },
        type: {
          type: 'string',
          enum: ['credit', 'debit'],
        },
      },
    },
    response: {
      201: {
        description: 'Transação criada com sucesso',
      },
    },
  },
}
