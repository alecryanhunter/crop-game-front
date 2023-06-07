import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../components/User";
import API from "../utils/API"
import { Uploader } from "uploader"; 
import { UploadButton } from "react-uploader";


function Profile() {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [titleArr, setTitleArr] = useState([]);
    const [coins, setCoins] = useState('');
    const [pic, setPic] = useState('');
    const [bio, setBio] = useState('');
    const [wins, setWins] = useState('');
    const [losses, setLosses] = useState('');
    const [forfeits, setForfeits] = useState('');
    const [friends, setFriends] = useState([]);
    const [edit, setEdit] = useState(false);

    let { user } = useParams();

    const curUser = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    function handleEdit(e) {
        e.preventDefault();
        if (edit===true) {
            setEdit(false);
            const json = {
                current_title: title,
                bio: bio,
                profile_pic: pic,
            }
            profileUpdate(json)
        } else {
            setEdit(true);
            console.log("Edit Mode");
        }
    }

    function handleAddFriend(e) {
        e.preventDefault();
        console.log("Add Friend");
    }

    async function profileData() {
        return await API.getProfile(user);
    }

    async function profileUpdate(json) {
        return await API.putProfile(json, user, token);
    }

    useEffect(()=>{
        profileData()
        .then(data=>{
            setUsername(data.username);
            setTitle(data.current_title);
            setTitleArr(data.Bundles.filter(bundleObj => bundleObj.type === "Title"));
            setCoins(data.coins);
            setPic(data.profile_pic);
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
    
    // Uploader for profile_pic
    const uploader = Uploader({ apiKey: process.env.REACT_APP_UPLOADIO_API_KEY });
    // TODO: https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/
    const uploaderOptions = {
        multi: false,
        styles: {
            colors: {
            primary: "#377dff",
            },
        },
        editor: {
            images: {
                preview: true,
                crop:true,
                cropRatio: 1,
                cropShape: "circ"
            },
        },
    }
    const PicUploadBtn = ({setPic}) =>
    <UploadButton 
    uploader={uploader}
    options={uploaderOptions}
    onComplete={files => setPic(uploader.url(files[0].filePath, "t-s"))}
    > 
        {({onClick}) =>
            <button onClick={onClick}>
                Upload new pic...
            </button>
        }
    </UploadButton>

    return (
        <section className="page">
            <h2>{username}'s Profile</h2>
            <section className="profile">
                    <section className="about">
                        <section className="profile-top">
                            <div>
                                {edit ? (
                                    <>
                                    <img src={pic} alt="profile_pic"/>
                                    <PicUploadBtn setPic={setPic}/>
                                    </>
                                ) : (
                                    <img src={pic} alt="profile_pic"/>
                                )}
                            </div>
                            <div>
                                <h3>{username}</h3>
                                {edit ? (
                                    <select 
                                        name="title" 
                                        value={title} 
                                        onChange={handleInputChange}
                                    >
                                        {titleArr.map((titleObj) => (
                                            <option 
                                                key={titleObj.id} 
                                                value={titleObj.name}
                                            >{titleObj.name}</option>
                                        ))}
                                  </select>
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
                            <li>{coins} Coins</li>
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