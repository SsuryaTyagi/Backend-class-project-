import React from "react";
import "../style/profile.scss";
import Followers from "../../user/component/followers";

export default function Profile() {
  return (
    <div className="profile">
      {/* Header */}
      <div className="profile__header">
        <h1 className="profile__username">username</h1>
        <div className="profile__icons">
          <span>➕</span>
          <span>☰</span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile__info">
        <img
          src="https://via.placeholder.com/100"
          alt="profile"
          className="profile__image"
        />

        <Followers/>
      </div>

      {/* Bio */}
      <div className="profile__bio">
        <h2>Your Name</h2>
        <p>This is bio... 🚀</p>
      </div>

      {/* Buttons */}
      <div className="profile__buttons">
        <button>Edit Profile</button>
        <button>Share Profile</button>
      </div>

      {/* Tabs */}
      <div className="profile__tabs">
        <span>🔳</span>
        <span>🎥</span>
        <span>👤</span>
      </div>

      {/* Posts */}
      <div className="profile__posts">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="post"></div>
        ))}
      </div>
    </div>
  );
}
