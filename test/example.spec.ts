import { expect, test } from 'vitest'
import { app } from '../src/app'
import {} from 'supertest'

test(' User consegue criar uma nova transaction', () => {
  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})
