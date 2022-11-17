'use client'

import TweetEmbed from 'react-tweet-embed'

async function fetchData() {
    const res = await fetch('https://tweetlive.vercel.app/api/trends', { cache: 'no-store' })
    const data = await res.json()
    return data
}

export default async function Tweets() {
    const data = await fetchData()
    console.log(data)

    return (
        <>
            {data.values.map(d => {
                return (
                    <div>
                        <h1 className="truncate">{d.trend.name}</h1>
                        {d.ids.map(id => <TweetEmbed options={{ width: "400px", theme: "dark" }} tweetId={id} />)}
                    </div>
                )
            })}
        </>
    )
}