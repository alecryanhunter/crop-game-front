import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../components/User";
import API from "../utils/API"
import helpers from "../utils/helpers";
import { Uploader } from "uploader"; 
import { UploadButton } from "react-uploader";
import "../assets/styles/Profile.css";
import "../assets/styles/Titles.css";


function Profile() {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [titleArr, setTitleArr] = useState([]);
    const [coins, setCoins] = useState('');
    const [pic, setPic] = useState('');
    const [bio, setBio] = useState('');
    const [wins, setWins] = useState('');
    const [losses, setLosses] = useState('');
    const [friends, setFriends] = useState([]);
    const [isCurFriend, setIsCurFriend] = useState(false);
    const [edit, setEdit] = useState(false);

    let { user } = useParams();

    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("username");

    const PIC_URL_PREFIX_LG = "https://upcdn.io/12a1yJg/lg"
    const PIC_URL_PREFIX_SM = "https://upcdn.io/12a1yJg/s"

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
        }
    }

    async function addFriend() {
        return await API.addFriend(curUser,user,token)
    }

    function handleAddFriend(e) {
        e.preventDefault();
        addFriend()
        .then(data=>{
        })
    }

    async function profileData(user) {
        return await API.getProfile(user);
    }

    async function profileUpdate(json) {
        return await API.putProfile(json, user, token);
    }

    useEffect(()=>{
        profileData(user).then(data=>{
            setUsername(data.username);
            setTitle(data.current_title);
            setTitleArr(data.Bundles.filter(bundleObj => bundleObj.type === "Title"));
            setCoins(data.coins);
            setPic(data.profile_pic);
            setBio(data.bio);
            setWins(data.wins);
            setLosses(data.losses);
            setFriends(data.Friendships);
        });
        profileData(curUser).then(data=>{
            setIsCurFriend(()=>{
                const myFriendsArr = data.Friendships.map(friendshipObj => {
                    return friendshipObj.Users.filter(userObj => userObj.username !== curUser)[0].username
                })
                if (myFriendsArr.includes(user)) { return true }
            })
        })
    }, []);

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
        onComplete={files => setPic(files[0].filePath)}
        > 
            {({onClick}) =>
                <button onClick={onClick}>
                    Upload new pic...
                </button>
            }
        </UploadButton>


    let multiBtn
    if (curUser===user) {
        multiBtn = <button onClick={handleEdit}>{edit ? "Save Edits" : "Edit Profile"}</button>
    } else if (isCurFriend){
        multiBtn = <button onClick={()=>window.location.href=`/messages/${user}`}>Message</button>
    } else {
        multiBtn = <button onClick={handleAddFriend}>Add Friend</button>
    }

    return (
        <section className="page profile">
            <section className="main-profile container flex-wrap">
                    <section className="about row">
                        <section className="profile-top d-flex justify-content-center">
                            <div className="profilePge-pic col col-md-4">
                                {edit ? (
                                    <>
                                    <img src={PIC_URL_PREFIX_LG + pic} alt="profile_pic"/>
                                    <PicUploadBtn setPic={setPic}/>
                                    </>
                                ) : (
                                    <img src={PIC_URL_PREFIX_LG + pic} alt="profile_pic"/>
                                )}
                            </div>
                            <div className="col col-md-4 d-flex align-self-center">
                                <h3 id={helpers.f(title)}>{username}</h3>
                                <div className="title">
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
                                    <p id={helpers.f(title)}>{title}</p>
                                )}
                                </div>
                            </div>
                            <div className="col col-md-4">
                                {multiBtn}
                            </div>
                        </section>
                        <section className="profile-bio row w-75">
                            {edit ? (
                                <textarea
                                    name="bio"
                                    value={bio}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{bio}</p>
                            )}
                        </section>
                        <section className="stats">
                            <ul>
                                <li>{coins} <b>Coins</b></li>
                                <li><b>Wins:</b> {wins}</li>
                                <li><b>Losses:</b> {losses}</li>
                            </ul>
                        </section>
                    </section>
                    <section className="friends container">
                        <h3 className="row">Friends</h3>
                        {friends.map(friend=>(
                            <>
                            {friend.status === "confirmed" ? (
                                <div className="friend" key = {friend.id}>
                            <a href={friend.Users[0].username} >
                            <User
                                username={friend.Users[0].username} 
                                title={friend.Users[0].current_title}
                                profile_pic={PIC_URL_PREFIX_SM + friend.Users[0].profile_pic}
                                /></a>
                            </div>
                            ) : null}
                            </>
                        ))}
    
                    </section>
            </section>
        </section>
    )
}

export default Profile;