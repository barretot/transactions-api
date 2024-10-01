export const getSummary = {
  schema: {
    description: 'Resumo das transações',
    tags: ['Transactions'],
    response: {
      200: {
        description: 'Resposta bem-sucedida',
        type: 'object',
        properties: {
          summary: {
            type: 'object',
            properties: {
              amount: {
                type: 'number',
                example: 2000.0,
              },
            },
          },
        },
      },
      404: {
        description: 'Resumo não encontrado',
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Resume amount not found',
          },
        },
      },
    },
  },
}
