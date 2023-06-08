import { useState, useEffect } from "react";
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
        <section className="page container d-flex align-items-center justify-content-center">
            <section className="search subpage">
                <form>
                    <input 
                        name="searchField"
                        type="text"
                        value={searchField}
                        onChange={handleInputChange}
                        placeholder="search for someone by username!"
                    />
                    <button
                        onClick={handleSubmit}
                    >Submit</button>
                </form>
                {searchData.map(user=>{
                    // TODO: Add friend status to this, as well
                    return <a href={`/profile/${user.username}`} key={user.id}><User pic={user.profile_pic} username={user.username} title={user.current_title}/></a>
                })}
            </section>
        </section>
    )
}

export default Search;
