import Twitter from 'twitter-lite'

export default async (req, res) => {
	const consumer_key = process.env.TWITTER_CONSUMER_KEY
	const consumer_secret = process.env.TWITTER_CONSUMER_SECRET
	const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY
	const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

	const client = new Twitter({ consumer_key, consumer_secret, access_token_key, access_token_secret })

    const data = await client.get('friends/list', { count: 10 })
    const users = data.users.filter(u => u.followers_count > 1000)

    const promises = users.map(async (u) => {
        try {
            const timeline = await client.get('statuses/user_timeline', { user_id: u.id, count: 20 })
            return {name: u.screen_name, ids: timeline.filter(t => t.favorite_count > 1000).map(t => t.id_str)}
        } catch (error) {
            console.error(error)
            return {name: u.screen_name, ids: []}
        }
    })

    Promise.all(promises).then(values => {
		//console.log(values)
		res.status(200).json({ values })
	})
}
