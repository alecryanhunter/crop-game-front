// For writing and exporting our fetch requests

import { BACKEND_URL } from "../config"

const API = {
    verifyToken: async (token, username) => {
        const data = await fetch(`${BACKEND_URL}/api/users/verify`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            if (!res.ok) {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                window.location.href="/"
            }
            return res.json();
        })
        .then((json)=>{
            if (username.toLowerCase() !== json.username.toLowerCase()) {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                window.location.href="/"
            }
            return;
        })
        return true;

    },
    getProfile: async (username) => {
        const data = await fetch(`${BACKEND_URL}/api/users/${username}`,{
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
    putProfile: async (json, username, token) => {

        const data = await fetch(`${BACKEND_URL}/api/users/${username}`,{
            method: "PUT",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            console.log(res)
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;

    },
    getAllDMs: async (username,token) => {

        const data = await fetch(`${BACKEND_URL}/api/dms/${username}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            console.log(res);
            if (res.status===204) {
                const none = {
                    msg: "no messages"
                }
                return none;
            }
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;
        
    },
    getDMs: async (username, friendName,token) => {

        const data = await fetch(`${BACKEND_URL}/api/dms/${username}/${friendName}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            if (res.status===204) {
                const none = {
                    msg: "no messages"
                }
                return none;
            }
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;

    },
    // Feed a non-stringified json object, senderId, and receiverId
    postDM: async (json, sender, receiver, token) => {

        const data = await fetch(`${BACKEND_URL}/api/dms/${sender}/${receiver}`,{
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;

    },
    postUser: async (json) => {

        const data = await fetch(`${BACKEND_URL}/api/users`,{
            method: "POST",
            body: JSON.stringify(json),
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
    // JSON object needs username and password
    postLogin: async (json) => {

        const data = await fetch(`${BACKEND_URL}/api/users/login`,{
            method: "POST",
            body: JSON.stringify(json),
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
    search: async (username) => {

        const data = await fetch(`${BACKEND_URL}/api/users/search/${username}`,{
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
    // Adds a friend, and sends a default DM as well
    addFriend: async (username, friendName, token) => {

        const data = await fetch(`${BACKEND_URL}/api/users/${username}/friends/${friendName}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;

    },
    confirmFriend: async (username, friendName, token, body) => {

        const data = await fetch(`${BACKEND_URL}/api/users/${username}/friends/${friendName}`,{
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            return json;
        })
        return data;

    },
    getShop: async (token) => {

        const data = await fetch(`${BACKEND_URL}/api/shop/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
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