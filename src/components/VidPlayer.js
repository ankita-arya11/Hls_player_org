import React, { useRef } from "react";
import Hls from "hls.js";

const VidPlayer = () => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = React.useState("");

  const handleVideoPlay = () => {
    if (Hls.isSupported() && videoUrl) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current && videoUrl && videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoUrl;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-xl mb-4">Enter Video URL</h2>
      <input
        type="url"
        placeholder="Enter video URL..."
        className="mb-4 p-2 border rounded w-80"
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button
        onClick={handleVideoPlay}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Watch Video
      </button>
      <video ref={videoRef} controls className="w-full max-w-4xl rounded-lg shadow-lg" />
    </div>
  );
};

export default VidPlayer;