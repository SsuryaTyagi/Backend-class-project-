import React, { useContext } from "react";
import { SongContext } from "../song.context";
import { UploadSong } from "../service/UploadSong";
import toast from "react-hot-toast";

export default function useSong() {
  const { song, loading, setLoading, setSong } = useContext(SongContext);

  const handleSongUpload = async(song, mood)=>{
    try {
        setLoading(true)
        const data = await UploadSong(song, mood)
        toast.success(data.message || "song uploaded successfully!");
        setSong(data)
        return data
    } catch (error) {
        console.log(error)   
      toast.error(error.message || "Failed to upload song!"); 
    }finally{
        setLoading(false)
    }
  }
  return {handleSongUpload,song,loading}
}
