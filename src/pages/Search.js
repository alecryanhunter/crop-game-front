import User from "../components/User"
import { useParams } from "react-router-dom";

function Search() {
    let { username } = useParams()
    const username1 = "test_username1"
    const username2 = "test_username2"
    const username3 = "test_username3"

    return (
        <section className="page">
            <section className="search subpage">
                <a href={`/profile/${username1}`} ><User username={username1} title="title"/></a>
                <a href={`/profile/${username2}`} ><User username={username2} title="title"/></a>
                <a href={`/profile/${username3}`} ><User username={username3} title="title"/></a>
            </section>
        </section>
    )
}

export default Search;
