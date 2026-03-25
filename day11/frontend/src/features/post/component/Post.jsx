import React from "react";
import "../style/post.scss";
import {
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaBookmark,
  FaHeart,
} from "react-icons/fa";


export default function Post({ post, handleUnLike, handleLike }) {
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__profileWrapper">
          <img
            src={post.user?.profile_img}
            alt="profile"
            className="post__profile"
          />
        </div>
        <span className="post__username">{post.user?.username}</span>
      </div>

      <div className="post__image">
        <img src={post.imageUrl} alt="post" />
      </div>


      <div className="post__actions">
        <div className="left">
          <button
          className="like"
            onClick={() => {
              post.isLiked ? handleUnLike(post._id) : handleLike(post._id);
            }}
          >
            {post.isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
          </button>
          <FaRegComment />
          <FaShare />
        </div>
        <div className="right">
          <FaBookmark />
        </div>
      </div>

      {/* Caption */}
      <div className="post__caption">{post.caption}</div>
    </div>
  );
}
