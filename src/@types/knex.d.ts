// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    trasactions: {
      id: string
      title: string
      amount: number
      type: 'credit' | 'debit'
      created_at: Date
      session_id?: string
    }
  }
}
