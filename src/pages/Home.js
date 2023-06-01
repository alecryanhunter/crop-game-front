import { useState } from "react";

function Home({loggedIn,setLoggedIn}) {
    const [signup,setSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    
    function handleSignupToggle() {
        signup ? setSignup(false) : setSignup(true)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (signup) {
            console.log("signup\n"+username+"\n"+password+"\n"+passwordVerify);
        } else {
            console.log("login\n"+username+"\n"+password);
        }
    }

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
                    <h3><a href="/lobby">Host Game</a></h3>
                    <h3><a href="/lobby">Join Game</a></h3>
                    <h3><a href="/search/test_username">Search For A User</a></h3>
                    <h3><a href="/rules">View Rules</a></h3>
                    </>
                ) : (
                    <>
                    <form>
                        <input 
                            name="username"
                            placeholder="username" 
                            value={username}
                            onChange={handleInputChange}
                        />
                        <input 
                            name="password"
                            placeholder="password" 
                            value={password}
                            onChange={handleInputChange}
                        />
                        {signup ? <input 
                            name="passwordVerify"
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