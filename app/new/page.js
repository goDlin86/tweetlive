//'use client'

//import TweetEmbed from 'react-tweet-embed'

async function fetchData() {
    const res = await fetch('https://tweetlive.vercel.app/api/new', { cache: 'no-store' })
    const data = await res.json()
    return data
}

export default async function Page() {
    const data = await fetchData()
    console.log(data)

    return (
        <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {/* {data.values.map(user => user.ids.map(id => <TweetEmbed options={{ width: "400px", theme: "dark" }} tweetId={id} />))} */}
            {data.values.map(user => user.ids.map(id => <div>{id}</div>))}
        </div>
    )
}