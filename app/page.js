import TweetsView from '../components/tweetsview'

export default function Page() {
    return (
        <div className="grid my-2 grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <TweetsView />
        </div>
    )
}