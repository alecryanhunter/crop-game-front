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
    const [friends, setFriends] =useState([]);

    let { user } = useParams();

    const curUser = localStorage.getItem("username");


    async function profileData() {
        return await API.getProfile(user);
    }

    useEffect(()=>{
        profileData()
        .then(data=>{
            setUsername(data.username)
            setTitle(data.current_title)
            setBio(data.bio)
            setWins(data.wins)
            setLosses(data.losses)
            setForfeits(data.forfeits)
        })
    },[])

    return (
        <section className="page">
            <h2>{username}'s Profile</h2>
            <section className="profile">
                    <section className="about">
                        <section className="profile-top">
                            <img src="https://placekitten.com/100"/>
                            <div>
                                <h3>{username}</h3>
                                <p>{title}</p>
                            </div>
                            <button>
                                Edit Profile
                            </button>
                        </section>
                        <p>{bio}</p>
                        <ul>
                            <li>Wins: {wins}</li>
                            <li>Losses: {losses}</li>
                            <li>Forfeits: {forfeits}</li>
                        </ul>
                    </section>
                    <section className="friends subpage">
                        <h3>Friends</h3>
                        {friends.map(friend=>{
                            return <User 
                                key={friend.id} 
                                username={friend.username} 
                                title={friend.title}
                                />
                        })}
                    </section>
            </section>
        </section>
    )
}

export default Profile;