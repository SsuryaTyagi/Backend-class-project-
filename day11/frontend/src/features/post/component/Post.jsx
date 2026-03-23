import React from "react";
import "../style/post.scss";
import {
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaBookmark,
  FaHeart,
} from "react-icons/fa";

export default function Post({ post }) {
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

      {/* Image */}
      <div className="post__image">
        <img src={post.imageUrl} alt="post" />
      </div>

      {/* Actions */}
      <div className="post__actions">
        <div className="left">
          {post.isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
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
