import React from "react";
import useUserInfo from "../hooks/user";
import { useEffect } from "react";

export default function Followers() {
  const { follower,followings,loading, handleFollowers,handleFollowing } = useUserInfo();
    console.log(followings);
    
  useEffect(() => {
    handleFollowers();
    handleFollowing()
  }, []);
  return <div>follower:{follower.count} <br /> following:{followings.count}</div>;
}
