import User from "../components/User"

function Lobby() {

    return (
        <section className="page">
            <h2>Lobby</h2>
            <section className="subpage lobby">
                <h3>Lobby Code: 5678</h3>
                <User username="test_username" title="test_title"/>
                <User username="test_username" title="test_title"/>
                <User username="test_username" title="test_title"/>
                <User username="test_username" title="test_title"/>
                <section className="chat">
                    <p className="msg sent">Message 1</p>
                    <p className="msg received">Message 2</p>
                    <p className="msg sent">Message 3</p>
                </section>
                <h3><a href="/game">Start Game</a></h3>
            </section>
        </section>
    )
}

export default Lobby;