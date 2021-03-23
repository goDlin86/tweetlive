import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Tweets from './tweets'

export default function Home() {
  return (
    <>
      <Head>
        <title>tweetlive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>

          <Tweets />
          
        </main>
      </div>
    </>
  )
}
