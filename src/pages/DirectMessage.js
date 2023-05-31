import { useParams } from "react-router-dom";

function DirectMessage() {
    let { username } = useParams()

    return (
        <h2>{username}'s Message History</h2>
    )
}

export default DirectMessage;