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
                    <div className='p-3 rounded-xl border-2 border-black'>
                        <div className='grid grid-cols-[48px_1fr_24px] gap-x-2 mb-2'>
                            <div>
                                <img className='rounded-full' src={t.user.profile_image_url_https} />
                            </div>
                            <div className='truncate'>
                                <h2>
                                    {'@' + t.user.screen_name}
                                    {t.user.verified ? <div className='twitter-verified' /> : null}
                                </h2>
                            </div>
                            <div className='twitter' />
                        </div>
                        {t.text}
                        <div>
                            {new Date(t.created_at).toLocaleDateString('ru-RU')}
                        </div>
                    </div>
                )
            })}
        </>
    )
}