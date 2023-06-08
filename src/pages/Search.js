import { useState } from "react";
import API from "../utils/API";
import User from "../components/User";
import "../assets/styles/Search.css";

function Search() {
    const [searchData, setSearchData] = useState([]);
    const [searchField, setSearchField] = useState("");
    
    function handleInputChange(e) {
        const { name, value } = e.target
        if (name==="searchField") {
            return setSearchField(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        search(searchField)
        .then(data=>{
            console.log(data);
            setSearchData(data);
        })
    }

    async function search(query) {
        return await API.search(query)
    }

    return (
        <section className="search container d-flex justify-content-center align-items-center">
            <h2>Search Users</h2>
            <form className="w-75 d-flex">
                <input 
                    name="searchField"
                    type="text"
                    value={searchField}
                    onChange={handleInputChange}
                    placeholder="username"
                />
                <button
                    onClick={handleSubmit}
                >Search</button>
            </form>
            {searchData.map(user=>{
                // TODO: Add friend status to this, as well
                return <div className="results"> 
                    <a href={`/profile/${user.username}`} key={user.id}>
                        <User pic={user.profile_pic} username={user.username} title={user.current_title}/>
                    </a>
                </div>
            })}
        </section>
    )
}

export default Search;
