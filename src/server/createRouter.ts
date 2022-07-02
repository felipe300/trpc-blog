import { router } from '@trpc/server'
import superjson from 'superjson'
import { Contex } from './createContex'

export function createRouter () {
  return router<Contex>().transformer(superjson)
}
