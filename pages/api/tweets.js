import Twitter from 'twitter-lite'

export default async (req, res) => {
	const consumer_key = process.env.TWITTER_CONSUMER_KEY
	const consumer_secret = process.env.TWITTER_CONSUMER_SECRET
	const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY
	const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

	const client = new Twitter({ consumer_key, consumer_secret, access_token_key, access_token_secret })

    try {
        const timeline = await client.get(
            'statuses/user_timeline', 
            { 
                screen_name: 'elonmusk',
                count: 60,
                exclude_replies: true,
                include_rts: true
            }
        )
        res.status(200).json(timeline)
    } catch (error) {
        console.error(error)
        res.status(500)
    }
}