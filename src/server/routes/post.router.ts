import { createPostSchema, getSinglePostSchema } from '../../schema/post.schema'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'

export const postRouter = createRouter()
  .mutation('create-post', {
    input: createPostSchema,
    async resolve ({ ctx, input }) {
      if (!ctx.user) {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'You must be logged in to create a post'
        })
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user?.id
            }
          }
        }
      })

      return post
    }
  })
  .query('posts', {
    resolve ({ ctx }) {
      return ctx.prisma.post.findMany()
    }
  })
  .query('single-post', {
    input: getSinglePostSchema,
    resolve ({ ctx, input }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId
        }
      })
    }
  })
