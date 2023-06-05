import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API"

function DirectMessage() {
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState("");

    let { friend } = useParams()
    const curUser = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    function handleInputChange(e) {
        const {name, value} = e.target
        if (name==="message") {
            setMessage(value);
        }
    }

    // Message form handler
    function handleSend(e) {
        e.preventDefault();
        const json = {
            message: message
        }
        messageSend(json)
        // This updates the page, but doesn't actually re-pull the database, since I can't get that to work
        const messageHistoryCopy = JSON.parse(JSON.stringify(messageHistory));
        const newMessage = {
            id: Math.random(Math.floor()*10000),
            sender_name: curUser,
            message: message
        }
        messageHistoryCopy.push(newMessage)
        setMessage("");
        setMessageHistory(messageHistoryCopy)
    }

    // API call to POST the message
    async function messageSend(json) {
        return await API.postDM(json,curUser,friend,token);
    }

    // API call to GET message history
    async function messageData(user,friend) {
        return await API.getDMs(user,friend,token)
    }

    // Updates message display on page load
    useEffect(()=>{
        messageData(curUser,friend)
        .then(data=>{
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
                    <input
                        name="message"
                        placeholder="Write your message"
                        value={message}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={handleSend}
                    >Send</button>
                </form>
            </section>
        </section>
    )
}

export default DirectMessage;