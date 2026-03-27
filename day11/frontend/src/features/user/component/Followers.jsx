import React from "react";
import useUserInfo from "../hooks/user";
import { useEffect } from "react";
import "../../Profile/style/profile.scss"

export default function Followers() {
  const { follower, followings, loading, handleFollowers, handleFollowing } =
    useUserInfo();
  console.log(follower);

  useEffect(() => {
    handleFollowers();
    handleFollowing();
  }, []);
  return (
    <div className="profile__stats">
      <div>
        <h2>{follower.count}</h2>
        <p>Followers</p>
      </div>
      <div>
        <h2>{followings.count}</h2>
        <p>Following</p>
      </div>
    </div>
  );
}
