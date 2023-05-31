function Header() {
    return (
        <header>
            <h1>Cropposition</h1>
            {/* Persistent Nav Element For Production Purposes */}
            <nav>
                <a href="/">Home Page</a>
                <a href="/game">The Game</a>
                <a href="/profile/test_username">A Profile</a>
                <a href="/shop">The Shop</a>
                <a href="/messages">All Messages</a>
                <a href="/messages/test_username">A Direct Message</a>
            </nav>
        </header>
    )
}

export default Header;