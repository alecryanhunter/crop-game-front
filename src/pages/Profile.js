import { useParams } from "react-router-dom";
import User from "../components/User";

function Profile() {
    let { username } = useParams()

    return (
        <section className="page">
            <h2>{username}'s Profile</h2>
            <section className="profile">
                    <section className="about">
                        <section className="profile-top">
                            <img src="https://placekitten.com/100"/>
                            <div>
                                <h3>Username</h3>
                                <p>Title</p>
                            </div>
                        </section>
                        <p>Bio is Here!</p>
                        <ul>
                            <li>Wins: 0</li>
                            <li>Losses: 500</li>
                            <li>Forfeits: 1000</li>
                        </ul>
                    </section>
                    <section className="friends subpage">
                        <h3>Friends</h3>
                        <User username="friend1" title="grainee"/>
                        <User username="friend2" title="crop king"/>
                        <User username="friend3" title="farmhand"/>
                    </section>
            </section>
        </section>
    )
}

export default Profile;