import { useState, useEffect } from "react"
import API from "../utils/API"
import User from "../components/User"

function Messages() {
    const [messagesList, setMessagesList] = useState([]);
    const [curUser, setCurUser] = useState("Alec");

    async function messagesData(query) {
        return await API.getAllDMs(query);
    }

    useEffect(()=>{
        messagesData(curUser)
        .then(data => {
            setMessagesList(data);
        })
    },[])

    return (
        <section className="page">
            <section className="messages subpage">
                {messagesList.map(item=>{
                    if (curUser === item.sender_name) {
                        return <a href={`/messages/${item.receiver_name}`} key={item.FriendshipId}>
                            <>
                            <User username={item.receiver_name} title={item.receiver_title}/>
                            <p>{item.message}</p>
                            </>
                        </a>
                    } else {  
                        return <a href={`/messages/${item.sender_name}`} key={item.FriendshipId}>
                            <>
                            <User username={item.sender_name} title={item.sender_title}/>
                            <p>{item.message}</p>
                            </>
                        </a>
                    } 
                })}
            </section>
        </section>
    )
}

export default Messages;