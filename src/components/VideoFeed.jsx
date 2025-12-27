import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import VideoCard from "./VideoCard";

function VideoFeed({ user }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videosCollection = collection(db, "videos");
      const q = query(videosCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const videosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videosData);
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {videos.length === 0 ? (
        <p>No hay videos aún.</p>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.youtubeId}
            title={video.title}
            channel={video.channel}
            user={user}
          />
        ))
      )}
    </div>
  );
}

export default VideoFeed;
