import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreatePostInput } from '../../schema/post.schema'
import { trpc } from '../../utils/trpc'

function createPostPage () {
  const { handleSubmit, register } = useForm<CreatePostInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation('posts.create-post', {
    onSuccess: ({ id }) => {
      router.push(`/posts/${id}`)
    }
  })

  function onSubmit (values: CreatePostInput) {
    mutate(values)
  }

  return (<form onSubmit={handleSubmit(onSubmit)}>
    { error && error.message}

    <h1>Create post</h1>

    <input type="text" placeholder='Your post Title' {...register('title')} />
    <textarea placeholder='Your post content' {...register('body')} />
    <button type='submit'>Create Post</button>
  </form>)
}

export default createPostPage
