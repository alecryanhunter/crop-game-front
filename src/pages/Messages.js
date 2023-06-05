import { useState, useEffect } from "react"
import API from "../utils/API"
import User from "../components/User"

function Messages({curUser}) {
    const [messagesList, setMessagesList] = useState([]);

    const token = localStorage.getItem("token");

    async function messagesData(query) {
        return await API.getAllDMs(query);
    }

    useEffect(()=>{
        messagesData(curUser,token)
        .then(data => {
            console.log(data)
            setMessagesList(data);
        })
    },[])

    return (
        <section className="page">
            <section className="messages subpage">
                {messagesList.map(item=>{
                    if (curUser === item.sender_name) {
                        // Current User sent most recent message
                        return <a href={`/messages/${item.receiver_name}`} key={item.FriendshipId}>
                            <User
                                username={item.receiver_name}
                                title={item.receiver_title}
                                message={item.message}
                                sender={"current"}
                            />
                        </a>
                    } else {
                        // Current User received most recent message
                        return <a href={`/messages/${item.sender_name}`} key={item.FriendshipId}>
                            <User
                                username={item.sender_name}
                                title={item.sender_title}
                                message={item.message}
                            />
                        </a>
                    } 
                })}
            </section>
        </section>
    )
}

export default Messages;