import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import "../assets/styles/Messages.css";

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
            if (data.msg === "no messages") {
                console.log("No Messages");
                // TODO: Add logic for sending a friend request instead of sending message
            } else {
            setMessageHistory(data);
            }
        })
    },[])

    return (
        <section className="messages">
            <div className="dm-top w-100">
                <a className="justify-content-start" href="/messages">Back</a>
                <h2>{friend}</h2>
            </div>
            <section className="chat w-100">
                <section className="msg-container">
                    {messageHistory.map(message=>{
                        return (
                        <div 
                        key={message.id} 
                        className={curUser===message.sender_name ? "msg sent" : "msg received"}>
                            <div className="message-content message-bubble">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )})}
                </section>
                <form className="send-msg">
                    <input
                        name="message"
                        value={message}
                        placeholder="Hey..."
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            e.key === "Enter" && messageSend();
                        }}
                    />
                    <button
                        onClick={handleSend}
                    > &#8593;</button>
                </form>
            </section>
        </section>
    )
}

export default DirectMessage;