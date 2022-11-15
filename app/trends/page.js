import Tweets from '../../components/tweets'

export default function Page() {
    return (
        <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <Tweets />
        </div>
    )
}