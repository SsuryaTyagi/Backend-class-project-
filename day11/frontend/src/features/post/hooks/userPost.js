import { useContext } from "react";
import { getFeed } from "../servises/Post.api.js";
import { postContext } from "../post.context";

export const userPost = () => {
  const context = useContext(postContext);

  const { post, feed, loading, setPost, setFeed, setLoading } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data);
    setLoading(false);
  };

  return { loading, feed, post, handleGetFeed };
};
