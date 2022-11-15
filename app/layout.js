import '../styles/globals.css'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>tweetlive</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </head>

            <body>
                <div className="container mx-auto px-4">
                    <div className="text-4xl font-bold dark:text-pink-600 text-opacity-50">tweetlive</div>
                    {children}
                </div>
            </body>
        </html>
    )
}