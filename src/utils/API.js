// For writing and exporting our fetch requests

// const URL_PREFIX = "http://localhost:5678" // Local
const URL_PREFIX = "https://cropposition.herokuapp.com" //Deployed

const API = {
    getProfile: async (username) => {

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

    },
    getAllDMs: async (username) => {

        const data = await fetch(`${URL_PREFIX}/api/dms/${username}`,{
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
    },
    getDMs: async (username, friendName) => {

        const data = await fetch(`${URL_PREFIX}/api/dms/${username}/${friendName}`,{
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