import React, { useContext } from "react";
import { HomeContext } from "../home.context";
import { getSong } from "../service/song.api";
import toast from "react-hot-toast";

export default function useSong() {
  const { song, loading, setSong, setLoading } = useContext(HomeContext);

  const handleGetSong = async (mood) => {
    setLoading(true);
    try {
      const data = await getSong(mood);
      setSong(data.song);
      toast.success(data.message || "song fetched successfully!");
      return data.song;
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch song!");
    } finally {
      setLoading(false);
    }
  };
  return{
    handleGetSong,
    song,
    loading
  } ;
}
