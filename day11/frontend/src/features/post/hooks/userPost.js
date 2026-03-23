import { useContext, useEffect } from "react";
import { getFeed, postCreate, like, unlike } from "../servises/Post.api.js";
import { postContext } from "../post.context";

export const userPost = () => {
  const context = useContext(postContext);

  const { post, feed, loading, setPost, setFeed, setLoading } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (caption, file) => {
    setLoading(true);
    const data = await postCreate(caption, file);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (postId) => {
    setLoading(true);
    const res = await like(postId);
    setLoading(false);
  };

  const handleUnLike = async (postId) => {
    setLoading(true);
    const res = await unlike(postId);
    setLoading(false);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);
  return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike };
};
