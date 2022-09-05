import "./main.css";

import React from "react";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="main">
      <nav className="navbar">
        <h1>Todo App</h1>
        <button className="white-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
