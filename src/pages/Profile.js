import { useParams } from "react-router-dom";

function Profile() {
    let { username } = useParams()

    return (
        <h2>{username}'s Profile</h2>
    )
}

export default Profile;