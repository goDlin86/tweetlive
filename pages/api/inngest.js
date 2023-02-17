import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'tweetlive' })

const revalidate = inngest.createFunction(
  { name: 'Revalidate tweetlive' }, 
  { cron: '0 */3 * * *' }, 
  async ({ event, step }) => {
    const res = await fetch('https://tweetlive.vercel.app/api/revalidate?secret=' + process.env.SECRET_TOKEN)
    return await res.json()
  }
)

export default serve(inngest, [ revalidate ])