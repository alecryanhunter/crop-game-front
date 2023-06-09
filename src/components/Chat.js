import React, { useEffect, useState } from "react";
import "../assets/styles/Chat.css";


export default function Chat({ socket, roomNo }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(roomNo);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const curUser = localStorage.getItem("username");
    setUsername(curUser);
  }, []);

  
    // setRoom to lobby or game here i think
  // useEffect(() => {
    // const curRoom = 1;
    // setRoom(roomNo);
  // }, []);

  
  // const joinRoom = () => {
  //   if (username !== "" && roomNo !== "") {
  //     socket.emit("join_room", roomNo);
  //   }
  // };


  socket.emit("join_room", room);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat container-fluid">
      <div className="chat-body w-100">
        <div className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                key={i}
                >
                <div>
                  <div className="author">
                    <p>{messageContent.author}</p>
                  </div>
                  <div className="message-content message-bubble">
                      <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="sendBtn" onClick={sendMessage}>
        &#8593;
        </button>
      </div>
    </div>
  );
}