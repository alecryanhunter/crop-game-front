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
    const testFriends = [
        {
            username: "Friend One",
            title: "Grainee"
        },
        {
            username: "Friend Two",
            title: "Farmhand"
        },
        {
            username: "Friend Three",
            title: "Crop King"
        },
    ]
    const [friends, setFriends] =useState(testFriends);


    let { user } = useParams();

    async function profileData(user) {
        return await API.getProfile(user);
    }

    useEffect(()=>{
        const data = profileData(user)
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
                            return <User username={friend.username} title={friend.title}/>
                        })}
                    </section>
            </section>
        </section>
    )
}

export default Profile;