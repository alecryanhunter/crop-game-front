import { useState, useEffect } from "react"
import API from "../utils/API"
import User from "../components/User"

function Messages() {
    const [messagesList, setMessagesList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);


    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("username");

    const PIC_URL_PREFIX_SM = "https://upcdn.io/12a1yJg/s"

    async function messagesData() {
        return await API.getAllDMs(curUser,token);
    }

    useEffect(()=>{
        messagesData()
        .then(data => {
            console.log(data)
            console.log(data.pending_friendships)
            if (data.msg === "no messages") {
                console.log("No Messages");
            } else {
                setMessagesList(data.confirmed_friendships);
                setFriendRequests(data.pending_friendships)
            }
        })
    },[])

    return (
        <section className="page">
            <section className="messages subpage">
                <h3>Messages</h3>
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
                                    img={PIC_URL_PREFIX_SM + item.receiver_profile_pic}
                                />
                            </a>
                        } else {
                            // Current User received most recent message
                            return <a href={`/messages/${item.sender_name}`} key={item.FriendshipId}>
                                <User
                                    username={item.sender_name}
                                    title={item.sender_current_title}
                                    message={item.message}
                                    img={PIC_URL_PREFIX_SM + item.sender_profile_pic}
                                />
                            </a>
                        } 
                })}
                <h3>Friend Requests</h3>
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
                                    img={PIC_URL_PREFIX_SM + item.receiver_profile_pic}
                                    />
                            </a>
                        } else {
                            // Current User received most recent message
                            return <a href={`/messages/${item.sender_name}`} key={item.FriendshipId}>
                                <User
                                    username={item.sender_name}
                                    title={item.sender_current_title}
                                    message={item.message}
                                    img={PIC_URL_PREFIX_SM + item.sender_profile_pic}
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