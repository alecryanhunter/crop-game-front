import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API"

function DirectMessage({curUser}) {
    const [messageHistory, setMessageHistory] = useState([]);

    let { friend } = useParams()

    async function messageData(user,friend) {
        return await API.getDMs(user,friend)
    }

    useEffect(()=>{
        messageData(curUser,friend)
        .then(data=>{
            console.log(data);
            setMessageHistory(data);
        })
    },[])

    return (
        <section className="page">
            <h2>{friend}'s Message History</h2>
            <section className="direct subpage">
                <a href="/messages">Back to All Messages</a>
                <section className="chat">
                    {messageHistory.map(message=>{
                        return (
                        <p 
                        key={message.id} 
                        className={curUser===message.sender_name ? "msg sent" : "msg received"}>
                            {message.message}
                        </p>
                    )})}
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