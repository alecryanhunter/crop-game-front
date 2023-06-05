import { Link } from "react-router-dom";

function Header({loggedIn,setLoggedIn, curUser}) {
    // Disables rendering the header if on the game path
    const pathname = window.location.pathname
    if (pathname==="/game"){
        return null;
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        return;
    }

    return (
        <header>
            <h1><a href="/">Cropposition</a></h1>
            <nav>
                <a href={`/profile/${curUser}`}>Profile</a>
                <a href="/shop">Shop</a>
                <a href="/messages">Messages</a>
                {loggedIn ? (
                    <a href="/" onClick={handleLogout}>Logout</a>
                ) : (
                    <a href="/">Login</a>
                )}
            </nav>
        </header>
    )
}

export default Header;