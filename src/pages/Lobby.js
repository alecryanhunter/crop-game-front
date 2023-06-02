import User from "../components/User"
import Chat from "../components/Chat"
import io from "socket.io-client";

function Lobby({socket, room, username}) {

    return (
        <section className="page">
            <h2>Lobby</h2>
            <section className="subpage lobby">
                <h3>Lobby Code: {room}</h3>
                <User username="test_username" title="test_title"/>
                <User username="test_username" title="test_title"/>
                <User username="test_username" title="test_title"/>
                <User username="test_username" title="test_title"/>
                <section className="chat">
                    <Chat socket={socket} username={username} room={room}/>
                </section>
            </section>
        </section>
    )
}

export default Lobby;