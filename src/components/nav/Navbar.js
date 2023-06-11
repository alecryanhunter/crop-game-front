import React from 'react';
import "../../assets/styles/Header.css";

export default function Nav({ loggedIn, setLoggedIn }) {
    const curUser = localStorage.getItem("username");
    const pathname = window.location.pathname

    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        return;
    }

    const navItems = [
        { label: 'HOME', url: '/', isActive: pathname === '/home' },
        { label: 'MESSAGES', url: '/messages', isActive: pathname === '/messages' },
        { label: 'PROFILE', url: `/profile/${curUser}`, isActive: pathname === `/profile/${curUser}` },
    ];
  
    return (
        <ul className="nav">
        {navItems.map((navItem, index) => (
          <li className="nav-item" key={index}>
            <a href={navItem.url} className={navItem.isActive ? 'nav-link active' : 'nav-link'}>
              {navItem.label}
            </a>
          </li>
        ))}
        <li className="nav-item login">
          {loggedIn ? (
            <a href="/" onClick={handleLogout} className="nav-link">
              LOGOUT
            </a>
          ) : (
            <a href="/" className="nav-link">
              LOGIN
            </a>
          )}
        </li>
      </ul>
    );
}
