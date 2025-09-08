import React from "react";
import "../css/header.css";

const Header = () => {
  return (
    <header className="appHeader">
      <div className="logo">
        <h1>Quizleter</h1>
      </div>
      <nav className="navButtons">
        <button className="loginBtn">Login</button>
        <button className="signupBtn">Sign Up</button>
      </nav>
    </header>
  );
};

export default Header;
