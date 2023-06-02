// For writing and exporting our fetch requests
const URL_PREFIX = "http://localhost:5678"

const API = {
    getProfile: async (username)=>{

        const data = await fetch(`${URL_PREFIX}/api/users/${username}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
        }})
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;

    }
}

export default API;