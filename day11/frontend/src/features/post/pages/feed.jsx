import React, { useEffect } from "react";
import "../style/post.scss";
import { userPost } from "../hooks/userPost";
import Post from "../component/post";
import Nav from "../../../shared/component/nav";
import Followers from "../../user/component/followers";

export default function Feed() {
  const { feed, loading, handleGetFeed, handleUnLike, handleLike } = userPost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return <h1>feed in loading....</h1>;
  }

  console.log(feed);

  return (
    <div className="main">
      <div className="top">
        <Nav />
        {/* <Followers /> */}
      </div>
      <div className="feed">
        <div className="posts">
          {feed.map((post, ind) => {
            return (
              <Post
                post={post}
                key={ind}
                handleUnLike={handleUnLike}
                handleLike={handleLike}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
