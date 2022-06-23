import Head from 'next/head'
import TweetsView from '../components/tweetsview'

export default function Home() {
  return (
    <>
      <Head>
        <title>tweetlive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">

            <div className="text-4xl font-bold dark:text-pink-600 text-opacity-50">tweetlive</div>
            <div className="grid my-2 grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
              <TweetsView />
            </div>
            
      </div>
    </>
  )
}
