import "../styles/Header.css";

function Header({loggedIn,setLoggedIn}) {
    // Disables rendering the header if on the game path
    const pathname = window.location.pathname
    if (pathname==="/game"){
        return null;
    }

    const curUser = localStorage.getItem("username");

    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        return;
    }

    return (
        <header>
            <h1 className="cropposition-title">CROPPOSITION</h1>
            <ul className="nav">
                <li className="nav-item">
                    <a
                    href="/"
                    className={pathname === '/home' ? 'nav-link active' : 'nav-link'}
                    >
                    HOME
                    </a>
                </li>
                <li className="nav-item">
                    <a
                    href="/shop"
                    className={pathname === '/shop' ? 'nav-link active' : 'nav-link'}
                    >
                    SHOP
                    </a>
                </li>
                <li className="nav-item">
                    <a
                    href="/messages"
                    className={pathname === '/messages' ? 'nav-link active' : 'nav-link'}
                    >
                    MESSAGES
                    </a>
                </li>
                <li className="nav-item nav-profile">
                    <a
                    href={`/profile/${curUser}`}
                    className={pathname === `/profile/${curUser}` ? 'nav-link active' : 'nav-link'}
                    >
                    PROFILE
                    </a>
                </li>
                <li className="nav-time login">
                {loggedIn ? (
                    <a href="/" onClick={handleLogout}>LOGOUT</a>
                ) : (
                    <a href="/">LOGIN</a>
                    
                )}
                </li>
            </ul>
        </header>
    )
}

export default Header;