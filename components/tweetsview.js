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
                    <div className='tweet'>
                        <img className='rounded-full' src={t.user.profile_image_url_https} />
                        <h2 className='truncate'>
                            {'@' + t.user.screen_name}
                            {t.user.verified ? <div className='twitter-verified' /> : null}
                            <div className='twitter' />
                        </h2>
                        {t.text}
                    </div>
                )
            })}
        </>
    )
}