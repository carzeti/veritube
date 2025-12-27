import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { fetchYouTubeVideos } from "../utils/youtube";

function VideoFeed({ user }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      const videosFromYouTube = await fetchYouTubeVideos("noticias"); // Cambia la búsqueda si quieres
      setVideos(videosFromYouTube);
    };

    loadVideos();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {videos.length === 0 ? (
        <p>Cargando videos...</p>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video.youtubeId}
            videoId={video.youtubeId}
            title={video.title}
            channel={video.channel}
            description={video.description}
            user={user}
          />
        ))
      )}
    </div>
  );
}

export default VideoFeed;

