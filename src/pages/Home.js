function Home({loggedIn,setLoggedIn}) {

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
                    <input placeholder="username"/>
                    <input placeholder="password"/>
                    <button>Submit</button>
                    <p>Forgot password?</p>
                    <p>Signup</p>
                    </>
                )}
            </section>
        </section>
    )
}

export default Home;