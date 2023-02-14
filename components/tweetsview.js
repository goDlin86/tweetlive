import millify from 'millify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

async function fetchData() {
    const res = await fetch('https://tweetlive.vercel.app/api/tweets', { next: { revalidate: 60 }})
    const data = await res.json()
    return data
}

export default async function TweetsView() {
    const data = await fetchData()
    console.log(data)

    return (
        <>
            {data.map(t => (
                <div className='p-3 rounded-xl border-2 border-black'>
                    <div className='grid grid-cols-[48px_1fr_24px] gap-x-2 mb-2'>
                        <div>
                            <img className='rounded-full' src={t.user.profile_image_url_https} />
                        </div>
                        <div>
                            <h2 className='truncate inline'>
                                {'@' + t.user.screen_name}
                            </h2>
                            {t.user.verified && <div className='twitter-verified' />}
                        </div>
                        <div className='twitter' />
                    </div>
                    {t.text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"')}
                    <div className='text-slate-500 my-2'>
                        {dayjs(t.created_at).fromNow()}
                    </div>
                    <div className='text-slate-500'>
                        <div className='align-middle comment inline-block' />
                        <div className='align-middle ml-1 inline-block'>{millify(t.retweet_count)}</div>
                        &nbsp;&bull;&nbsp;
                        <div className='align-middle heart inline-block' />
                        <div className='align-middle ml-1 inline-block dark:text-rose-500 text-opacity-70'>{millify(t.favorite_count)}</div>
                    </div>
                </div>
            ))}
        </>
    )
}