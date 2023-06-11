import { useState, useEffect } from "react";
import API from "../utils/API";
import User from "../components/User";
import "../assets/styles/Messages.css";

function Messages() {
    const [messagesList, setMessagesList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);


    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("username");

    const PIC_URL_PREFIX_SM = "https://upcdn.io/12a1yJg/s"

    async function messagesData() {
        return await API.getAllDMs(curUser,token);
    }

    useEffect(() => {
        messagesData()
            .then((data) => {
                if (data.msg === "no messages") {
                console.log("No Messages");
                } else {
                if (data.confirmed_friendships) {
                    setMessagesList(data.confirmed_friendships);
                }
                if (data.pending_friendships) {
                    setFriendRequests(data.pending_friendships);
                }
                }
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    return (
        <section className="messages container">
            <section className="all-msgs w-100">
                <h2>Messages</h2>
                <hr />
                {messagesList.length === 0 ? <p>No Messages</p> : null}
                {messagesList.map(item=>{
                        if (curUser === item.sender_name) {
                            // Current User sent most recent message
                            return <a href={`/messages/${item.receiver_name}`} key={item.FriendshipId}>
                                <User
                                    username={item.receiver_name}
                                    title={item.receiver_current_title}
                                    message={item.message}
                                    sender={"current"}
                                    profile_pic={PIC_URL_PREFIX_SM + item.receiver_profile_pic}
                                />
                            </a>
                        } else {
                            // Current User received most recent message
                            return <a href={`/messages/${item.sender_name}`} key={item.FriendshipId}>
                                <User
                                    username={item.sender_name}
                                    title={item.sender_current_title}
                                    message={item.message}
                                    profile_pic={PIC_URL_PREFIX_SM + item.sender_profile_pic}
                                />
                            </a>
                        } 
                })}
                <h2>Friend Requests</h2>
                <hr />
                {friendRequests.length === 0 ? <p>No Messages</p> : null}
                {friendRequests.map(item=>{
                        if (curUser === item.sender_name) {
                            // Current User sent most recent message
                            return <a href={`/messages/${item.receiver_name}`} key={item.FriendshipId}>
                                <User
                                    username={item.receiver_name}
                                    title={item.receiver_current_title}
                                    message={item.message}
                                    sender={"current"}
                                    profile_pic={PIC_URL_PREFIX_SM + item.receiver_profile_pic}
                                    />
                            </a>
                        } else {
                            // Current User received most recent message
                            return <a href={`/messages/${item.sender_name}`} key={item.FriendshipId}>
                                <User
                                    username={item.sender_name}
                                    title={item.sender_current_title}
                                    message={item.message}
                                    profile_pic={PIC_URL_PREFIX_SM + item.sender_profile_pic}
                                    friendBtn={true}
                                />
                            </a>
                        } 
                })}
            </section>
        </section>
    )
}

export default Messages;