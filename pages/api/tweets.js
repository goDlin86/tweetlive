import Twitter from 'twitter-lite'

export default async (req, res) => {
    const consumer_key = process.env.TWITTER_CONSUMER_KEY
    const consumer_secret = process.env.TWITTER_CONSUMER_SECRET
    const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY
    const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

    const client = new Twitter({ consumer_key, consumer_secret, access_token_key, access_token_secret })

    const users = ['elonmusk', 'sommerray']

    const results = await Promise.allSettled(users.map(u => client.get(
        'statuses/user_timeline', 
        { 
            screen_name: u,
            count: 60,
            exclude_replies: true,
            include_rts: false
        }
    )))

    const timeline = results
        .filter(result => result.status === "fulfilled")
        .reduce((result, cur) => result.concat(cur.value), [])
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    // try {
    //     const timeline = await client.get(
            
    //     )
    //     res.status(200).json(timeline)
    // } catch (error) {
    //     console.error(error)
    //     res.status(500)
    // }

    res.status(200).json(timeline)
}