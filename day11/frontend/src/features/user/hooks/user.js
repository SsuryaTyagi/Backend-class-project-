import React from "react";
import { followers, following } from "../servises/user";
import { useContext } from "react";
import { UserContext } from "../user.context";

export default function useUserInfo() {
  const context = useContext(UserContext);
  const {
    follower,
    followings,
    loading,
    setFollower,
    setLoading,
    setFollowings,
  } = context;

  const handleFollowers = async () => {
    try {
      setLoading(true);

      const res = await followers();

      setFollower(res);
    } catch (error) {
      console.error("Error fetching followers:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFollowing = async () => {
    try {
      setLoading(true);

      const res = await following();

      setFollowings(res);
    } catch (error) {
      console.error("Error fetching following:", error);
    } finally {
      setLoading(false);
    }
  };
  return { handleFollowers, handleFollowing, follower, loading, followings };
}
