import { useState } from "react";
import helpers from "../utils/API";
import circleLogo from "../assets/images/circle-logo.png";
import "../assets/styles/Home.css";

function Home({loggedIn,setLoggedIn}) {
    const [signup,setSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [samePass,setSamePass] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    
    // Toggles Signup/Login State
    function handleSignupToggle() {
        signup ? setSignup(false) : setSignup(true)
    }

    // Form Submittal Function
    function handleSubmit(e) {
        e.preventDefault();
        if (signup) {

            // Signup Processes Here
            // Checks if passwords match
            if (password !== passwordVerify) {
                setSamePass(true)
                return;
            }
            // Checks if email is of valid type
            const regex = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})$/i)
            if (!regex.test(email)) {
                setIsEmail(true)
                return;
            }
            const signupJSON = {
                username: username,
                password: password,
                email: email,
                bio: "Hey everyone! I'm a brand-new Farmer!",
                profile_pic: "https://placekitten.com/300"
            }
            helpers.postUser(signupJSON)
            .then(data=>{
                localStorage.removeItem("token");
                localStorage.setItem("token",data.token);
                localStorage.setItem("username",data.user.username);
                setLoggedIn(true);
                return;
            })

        } else {

            // Login Processes Here
            console.log("login\n"+username+"\n"+password);
            const loginJSON = {
                username: username,
                password: password
            }
            helpers.postLogin(loginJSON)
            .then(data=>{
                localStorage.setItem("token",data.token);
                localStorage.setItem("username",data.user.username);
                setLoggedIn(true);
                return;
            })

        }
    }

    // Input Control Function
    function handleInputChange(e) {
        const {name,value} = e.target
        switch (name) {
            case "username" : return setUsername(value);
            case "email" : return setEmail(value);
            case "password" : return setPassword(value);
            case "passwordVerify" : return setPasswordVerify(value);
            default : return;
        }
    }

    return (
        <section className="page home">
            <h2>Welcome!</h2>
            <div className="home-logo">
            <img src={circleLogo} alt="picture of farm with cropposition across the type" style={{width: "auto", height: "15em"}} />
            </div>
            <section className="home subpage">
                {loggedIn ? (
                    <>
                    <h3><a href="/hostGame">Host Game</a></h3>
                    <h3><a href="/joinGame">Join Game</a></h3>
                    <h3><a href="/search">Search For A User</a></h3>
                    <h3><a href="/rules">View Rules</a></h3>
                    </>
                ) : (
                    <>
                    <form className="container-fluid d-flex justify-content-center align-items-center">
                        <input 
                            name="username"
                            type="text"
                            placeholder="Username" 
                            value={username}
                            onChange={handleInputChange}
                        />
                        {signup ? <input 
                            name="email"
                            type="text"
                            placeholder="email" 
                            value={email}
                            onChange={handleInputChange}
                        /> : null}
                        <input 
                            name="password"
                            type="password"
                            placeholder="Password" 
                            value={password}
                            onChange={handleInputChange}
                        />
                        {signup ? <input 
                            name="passwordVerify"
                            type="password"
                            placeholder="password again" 
                            value={passwordVerify}
                            onChange={handleInputChange}
                        /> : null}
                        <button onClick={handleSubmit} className="loginBtn">Login</button>
                    </form>
                    {samePass ? <p>
                        Passwords Must Match!
                    </p> : null}
                    {isEmail ? <p>
                        Please Enter A Proper Email Address!
                    </p> : null}
                    <p className="signupNow text-center">Don't have an account? Click below to create one!</p>
                    <button className="signupBtn" onClick={handleSignupToggle}>{signup ? "Back to Login" : "Signup"}</button>
                    </>
                )}
            </section>
        </section>
    )
}

export default Home;