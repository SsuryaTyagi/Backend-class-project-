import React, { useEffect } from "react";
import "../style/post.scss";
import { userPost } from "../hooks/userPost";
import Post from "../component/post";


export default function Feed() {

  const {feed, loading, handleGetFeed} = userPost()


  useEffect(() => {
      handleGetFeed()
  }, [])

  if (loading || !feed) {
    return (<h1>feed in loading....</h1>)
  }

console.log(feed.posts);

  return (
    <div className="main">
      <div className="feed">
        <div className="posts">
          {feed.posts.map((post,ind)=>{
            return(<Post post={post} key={ind} />)
          })}
        </div>
      </div>
    </div>
  );
}
