export const API_KEY = "TU_API_KEY_AQUI"; // Reemplaza con tu API Key
export const MAX_RESULTS = 10;

export async function fetchYouTubeVideos(searchQuery = "noticias") {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        searchQuery
      )}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
    );

    const data = await response.json();

    // Mapea los videos al formato que usamos en VideoCard
    return data.items.map((video) => ({
      youtubeId: video.id.videoId,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      description: video.snippet.description,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
