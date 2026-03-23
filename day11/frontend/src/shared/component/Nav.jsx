import React from "react";
import "./nav.scss";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="insta">
        Instagram
      </div>
      <button onClick={() => navigate("/create-post")}>
         Create Post
      </button>
    </div>
  );
};

export default Nav;
