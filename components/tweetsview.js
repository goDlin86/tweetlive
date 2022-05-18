import useSwr from 'swr'
import millify from 'millify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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
                            <div>
                                <h2 className='truncate inline'>
                                    {'@' + t.user.screen_name}
                                </h2>
                                {t.user.verified ? <div className='twitter-verified' /> : null}
                            </div>
                            <div className='twitter' />
                        </div>
                        {t.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}
                        <div className='text-slate-500 my-2'>
                            {dayjs(t.created_at).fromNow()}
                        </div>
                        <div>
                            <div className='align-middle heart inline-block' />
                            <div className='align-middle ml-1 inline-block dark:text-rose-600 text-opacity-70'>{millify(t.favorite_count)}</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}