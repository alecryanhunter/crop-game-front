import { useState } from "react";

function Home({loggedIn,setLoggedIn}) {
    const [signup,setSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    
    // Toggles Signup/Login State
    function handleSignupToggle() {
        signup ? setSignup(false) : setSignup(true)
    }

    // Form Submittal Function
    function handleSubmit(e) {
        e.preventDefault();
        if (signup) {
            // Signup Processes Here
            console.log("signup\n"+username+"\n"+password+"\n"+passwordVerify);
        } else {
            // Login Processes Here
            console.log("login\n"+username+"\n"+password);
        }
    }

    // Input Control Function
    function handleInputChange(e) {
        const {name,value} = e.target
        switch (name) {
            case "username" : return setUsername(value);
            case "password" : return setPassword(value);
            case "passwordVerify" : return setPasswordVerify(value);
            default : return;
        }
    }

    return (
        <section className="page">
            <h2>Home</h2>
            <section className="home subpage">
                {loggedIn ? (
                    <>
                    <h3><a href="/hostGame">Host Game</a></h3>
                    <h3><a href="/joinGame">Join Game</a></h3>
                    <h3><a href="/search/test_username">Search For A User</a></h3>
                    <h3><a href="/rules">View Rules</a></h3>
                    </>
                ) : (
                    <>
                    <form>
                        <input 
                            name="username"
                            type="text"
                            placeholder="username" 
                            value={username}
                            onChange={handleInputChange}
                        />
                        <input 
                            name="password"
                            type="password"
                            placeholder="password" 
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
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                    <p>Forgot password?</p>
                    <button onClick={handleSignupToggle}>{signup ? "Back to Login" : "Signup"}</button>
                    </>
                )}
            </section>
        </section>
    )
}

export default Home;