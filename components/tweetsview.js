import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TweetsView() {
    const { data, error } = useSwr('/api/tweets', fetcher, { revalidateOnFocus: false })

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data)

    return (
        <>
            {data.map(t => {
                return (
                    <div>
                        <img src='twitter.svg' />
                        <img src={t.user.profile_image_url_https} />
                        {t.user.verified ? <img src='twitter-verified.svg' /> : null}
                        <h1 className='truncate'>{t.user.screen_name}</h1>
                        {t.text}
                    </div>
                )
            })}
        </>
    )
}