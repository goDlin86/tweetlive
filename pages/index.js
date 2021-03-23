import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import Tweets from '../components/tweets'

export default function Home() {
  return (
    <>
      <Head>
        <title>tweetlive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">

          <div className="text-4xl font-bold text-pink-600 text-opacity-50">tweetlive</div>
          <div className="grid grid-cols-5 gap-4">
            <Tweets />
          </div>
          
      </div>
    </>
  )
}
