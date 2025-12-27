function VideoCard({ videoId, title, channel }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{title}</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      ></iframe>
      <p>Video de {channel}</p>
    </div>
  );
}

export default VideoCard;
