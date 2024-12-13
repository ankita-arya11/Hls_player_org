import React, { useRef, useState } from "react";
import Hls from "hls.js";

const AudPlayer = () => {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState("");

  const toggleMenu = () => setShowMenu(!showMenu);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAudioPlay = () => {
    if (!validateUrl(audioUrl)) {
      setError("Invalid URL. Please enter a valid audio URL.");
      return;
    }
    setError("");
  
    // For MP3 files (not HLS stream)
    if (audioUrl.endsWith(".mp3")) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(() => {
        setError("Error playing audio. Please check the URL or network.");
      });
    } else if (Hls.isSupported() && audioUrl) {
      const hls = new Hls();
      hls.loadSource(audioUrl);
      hls.attachMedia(audioRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audioRef.current.play().catch(() => {
          setError("Error playing audio. Please check the URL or network.");
        });
      });
      hls.on(Hls.Events.ERROR, () => {
        setError("Error loading HLS stream.");
      });
    } else {
      setError("HLS is not supported on this browser.");
    }
  };
  const frwd = () => {
    if(audioRef.current){
        audioRef.current.currentTime += 10;
    }
  };
  const bkwd = () => {
    if(audioRef.current){
        audioRef.current.currentTime -= 10;
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-2">
        <img
          src="https://media.istockphoto.com/id/1443887485/photo/young-adult-black-male-music-singer-passionately-singing-in-a-beautiful-illuminated-studio.jpg?s=612x612&w=0&k=20&c=wQp7zLdNQ72w10SaxpuvWvH8qg5rPb3r6qGeouwLD2E="
          alt="Audio Icon"
          className="w-64 h-64 rounded-full mr-3"
        />
        
      </div>
      <input
          type="text"
          placeholder="Enter audio URL"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          className="p-2 border rounded w-full max-w-lg"
        />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <br/><br/>
      <button
        onClick={handleAudioPlay}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        Play Audio
      </button>   <br/> <br/>
      <div className="flex space-x-4 mb-2">
        <button
          onClick={bkwd}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-track-prev"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /><path d="M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /></svg>
        </button>
        <button
          onClick={frwd}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-track-next"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" /><path d="M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" /></svg>
        </button>
      </div>
      <audio
        ref={audioRef}
        controls
        download
        className="w-full max-w-lg"
        onError={() => setError("Error playing audio. Please check the URL or network.")}
      ></audio>
      <div className="relative">
        <button onClick={toggleMenu} className="text-gray-600 text-2xl">
          ⋮
        </button>
        {showMenu && (
          <div className="absolute right-0 bg-white border rounded shadow-md p-2">
            {audioUrl ? (
              <a
                href={audioUrl}
                download
                className="block text-blue-500 hover:underline"
              >
                Download Audio
              </a>
            ) : (
              <span className="block text-gray-500">No audio URL</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudPlayer;