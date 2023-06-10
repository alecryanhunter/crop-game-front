import React, { useState, useEffect } from "react";
import Hamburger from 'hamburger-react';
import Navbar from "./nav/Navbar";
import NavDropdown from "./nav/NavDropdown";
import "../assets/styles/Header.css";

export default function Header({ loggedIn, setLoggedIn }) {
  const [isMobile, setIsMobile] = useState(true);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pathname = window.location.pathname;
  if (pathname === "/game") {
    return null; 
  }

  return (
    <header>
      <h1 className="cropposition-title">CROPPOSITION</h1>
      {isMobile ? (
        <Hamburger color="#fff" label="Show menu" toggled={isOpen} toggle={setOpen}/> 
      ) : (
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      )}
      {isMobile && isOpen && <NavDropdown loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> }
    </header>
  );
}