import { Link } from "react-router-dom";

function Header({loggedIn}) {
    // Disables rendering the header if on the game path
    const pathname = window.location.pathname
    if (pathname==="/game"){
        return null;
    }

    return (
        <header>
            <h1><a href="/">Cropposition</a></h1>
            {loggedIn ? (
                <p>X</p>
            ) : (
            <nav>
                <a href="/">Login</a>
            </nav>
            )}
        </header>
    )
}

export default Header;