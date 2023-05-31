import { useParams } from "react-router-dom";

function DirectMessage() {
    let { username } = useParams()

    return (
        <section className="page">
            <h2>{username}'s Message History</h2>
            <section className="direct subpage">
                <section className="chat">
                    <p className="msg sent">Hello There!</p>
                    <p className="msg received">What's up?</p>
                    <p className="msg received">Who is this?</p>
                    <p className="msg sent">It's your best friend!</p>
                </section>
                <form>
                    <input placeholder="Write your message"/>
                    <button>Send</button>
                </form>
            </section>
        </section>
    )
}

export default DirectMessage;