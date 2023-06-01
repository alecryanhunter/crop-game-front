import { useState } from "react";

function Home({loggedIn,setLoggedIn}) {
    const [signup,setSignup] = useState(false)
    
    function handleSignupToggle() {
        signup ? setSignup(false) : setSignup(true)
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
                        <input placeholder="username"/>
                        <input placeholder="password"/>
                        {signup ? <input placeholder="password again"/> : null}
                        <button>Submit</button>
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