import Head from 'next/head'
import useSwr from 'swr'
import TweetEmbed from 'react-tweet-embed'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

    const { data, error } = useSwr('/api/new', fetcher, { revalidateOnFocus: false })

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
        <Head>
            <title>tweetlive</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="mx-auto px-4">

                <div className="text-4xl font-bold dark:text-pink-600 text-opacity-50">tweetlive</div>
                <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">

                    {data.values.map(user => user.ids.map(id => <TweetEmbed options={{ width: "400px", theme: "dark" }} tweetId={id} />))}

                </div>
                
        </div>
        </>
    )
}