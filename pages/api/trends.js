import Twitter from 'twitter-lite'

export default async (req, res) => {
	const consumer_key = process.env.TWITTER_CONSUMER_KEY
	const consumer_secret = process.env.TWITTER_CONSUMER_SECRET
	const access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY
	const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

	const client = new Twitter({ consumer_key, consumer_secret, access_token_key, access_token_secret })

	const data = await client.get('trends/place', { id: 2122265 })// Moscow, 23424936 }) Russia
	const trends = data[0].trends.slice(0, 5)

	const promises = trends.map(async (trend) => {
		const search = await client.get('search/tweets', { q: trend.query, lang: 'ru', /*result_type: 'popular',*/ count: 3 })
		const ids = search.statuses.map(s => s.id_str)

		return { trend, ids }
	})

	Promise.all(promises).then(values => {
		//console.log(values)
		res.status(200).json({ values })
	})

	const limit = await client.get('application/rate_limit_status', { resources: 'search' })
	console.log(limit.resources.search)

	//const url = 'https://twitter.com/' + status.user.screen_name + '/status/' + status.id_str
	//const { html } = await client.get('statuses/oembed', { url })

	//console.log(result)

  	//res.status(200).json({ result })
}
