import useSwr from 'swr'
import TweetEmbed from 'react-tweet-embed'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Tweets() {
    const { data, error } = useSwr('/api/trends', fetcher, { revalidateOnFocus: false })

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

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