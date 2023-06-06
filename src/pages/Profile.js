import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../components/User";
import API from "../utils/API"

function Profile() {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');
    const [wins, setWins] = useState('');
    const [losses, setLosses] = useState('');
    const [forfeits, setForfeits] = useState('');
    const [friends, setFriends] = useState([]);
    const [edit, setEdit] = useState(false)

    let { user } = useParams();

    const curUser = localStorage.getItem("username");

    function handleEdit(e) {
        e.preventDefault();
        console.log("Edit Mode");
        if (edit===true) {
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    function handleAddFriend(e) {
        e.preventDefault();
        console.log("Add Friend");
        
    }

    async function profileData() {
        return await API.getProfile(user);
    }

    useEffect(()=>{
        profileData()
        .then(data=>{
            setUsername(data.username);
            setTitle(data.current_title);
            setBio(data.bio);
            setWins(data.wins);
            setLosses(data.losses);
            setForfeits(data.forfeits);
            setFriends(data.Friendships);
        })
    },[])

    // Input Control Function
    function handleInputChange(e) {
        const {name,value} = e.target
        switch (name) {
            case "username" : return setUsername(value);
            case "title" : return setTitle(value);
            case "bio" : return setBio(value);
            default : return;
        }
    }

    return (
        <section className="page">
            <h2>{username}'s Profile</h2>
            <section className="profile">
                    <section className="about">
                        <section className="profile-top">
                            <img src="https://placekitten.com/100"/>
                            <div>
                                {edit ? (
                                    <input 
                                        name="username"
                                        value={username}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <h3>{username}</h3>
                                )}
                                {edit ? (
                                    // TODO: a select that autofills your bundle options?
                                    <input
                                        name="title"
                                        value={title}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>{title}</p>
                                )}
                            </div>
                            {(curUser===user) ? (
                                <button
                                    onClick={handleEdit}
                                >{edit ? "Save Edits" : "Edit Profile"}</button>
                                ) : (
                                // TODO: Add DM button and remove friend button if already friends
                                <button
                                    onClick={handleAddFriend}
                                >Add Friend</button>
                            )}
                        </section>
                        {edit ? (
                            <input
                                name="bio"
                                value={bio}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{bio}</p>
                        )}
                        <ul>
                            <li>Wins: {wins}</li>
                            <li>Losses: {losses}</li>
                            <li>Forfeits: {forfeits}</li>
                        </ul>
                    </section>
                    <section className="friends subpage">
                        <h3>Friends</h3>
                        {friends.map(friend=>{
                            return <a href={friend.Users[0].username} key={friend.id} >
                            <User
                                username={friend.Users[0].username} 
                                title={friend.Users[0].current_title}
                            /></a>
                        })}
                    </section>
            </section>
        </section>
    )
}

export default Profile;