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
        }).catch(err => {
            return false
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

        const res = await fetch(`${BACKEND_URL}/api/users`,{
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
        }})
        const data = await res.json();
        if (!res.ok) {
            alert(`${data.msg}: ${data.err.errors[0].message}`);
            return false
        } else {
            localStorage.removeItem("token");
            localStorage.setItem("token",data.token);
            localStorage.setItem("username",data.user.username);
            return true
        }
    },
    // JSON object needs username and password
    postLogin: async (json) => {

        const res = await fetch(`${BACKEND_URL}/api/users/login`,{
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
        }})
        if (!res.ok) {
            alert("Invalid Login");
            return false
        } else {
            const data = await res.json();
            localStorage.setItem("token",data.token);
            localStorage.setItem("username",data.user.username);
            return true
        }
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
        console.log(data)
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

    },
    postBundle: async (user, bundleId, token) => {

        const res = await fetch(`${BACKEND_URL}/api/users/${user}/bundles/${bundleId}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
        }})
        return res
    },
    updateStats: async (user, stat, coins) => {

        const res = await fetch(`${BACKEND_URL}/api/users/${user}/${stat}/${coins}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${process.env.REACT_APP_ADMIN_TOKEN}`
        }})
        return res
    },
}

export default API;