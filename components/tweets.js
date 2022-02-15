import useSwr from 'swr'
import { Tweet } from 'react-twitter-widgets'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Tweets() {
    const { data, error } = useSwr('/api/hello', fetcher, { revalidateOnFocus: false })

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            {data.values.map(d => {
                return (
                    <div>
                        <h1 className="truncate">{d.trend.name}</h1>
                        {d.ids.map(id => <Tweet options={{ width: "400px", theme: "dark" }} tweetId={id} />)}
                    </div>
                )
            })}
        </>
    )
}