import User from "../components/User"

function Messages() {
    const username1 = "test_username1"
    const username2 = "test_username2"
    const username3 = "test_username3"

    return (
        <section className="page">
            <section className="messages subpage">
                <a href={`/messages/${username1}`} ><User username={username1} title="title"/></a>
                <a href={`/messages/${username2}`} ><User username={username2} title="title"/></a>
                <a href={`/messages/${username3}`} ><User username={username3} title="title"/></a>
            </section>
        </section>
    )
}

export default Messages;