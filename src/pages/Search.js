import { useParams } from "react-router-dom";

function Search() {
    let { username } = useParams()

    return (
        <h2>{username}'s Search</h2>
    )
}

export default Search;