import React from "react";
import "./nav.scss";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlusSquare, FaUserCircle } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      {/* Logo */}
      <div className="nav__logo" onClick={() => navigate("/")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="logo"
        />
        <span>Instagram</span>
      </div>

      {/* Actions */}
      <div className="nav__actions">
        <FaHome onClick={() => navigate("/")} />

        {/* Highlighted Create Button */}
        <button
          className="nav__createBtn"
          onClick={() => navigate("/create-post")}
        >
          + Create
        </button>

        <FaUserCircle onClick={() => navigate("/profile")} />
      </div>
    </div>
  );
};

export default Nav;