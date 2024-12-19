import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hls from "hls.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiPlayListAddLine, RiBarChartFill } from "react-icons/ri";

const AudPlayer = () => {
  const audioRef = useRef(null);
  const location = useLocation();
  const { audioUrl } = location.state || {};

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = audioRef.current;
    const hls = new Hls();

    if (Hls.isSupported() && audioUrl.endsWith(".m3u8")) {
      hls.loadSource(audioUrl);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setDuration(audio.duration);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        setError(`Error: ${data.details}`);
      });
    } else {
      audio.src = audioUrl;
    }

    const updateProgress = () => {
      if (!isNaN(audio.duration) && audio.duration !== Infinity) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      hls.destroy();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setError("Error playing audio.");
        });
    }
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleProgress = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const handleLike = () => {
    setLikeCount(likeCount === 0 ? likeCount + 1 : likeCount - 1);
  };

  const toggleDownload = () => {
    setShowDownload(!showDownload);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 h-screen relative">
      <div className="relative w-full h-96 flex flex-col items-center p-4 bg-blue-100 shadow-md">
        <div className="relative">
          <div
            className="absolute bg-red-500 w-56 h-56 rounded-full"
            style={{ top: "-13px", left: "-10px" }}
          ></div>
          <div
            className="absolute bg-green-500 w-56 h-56 rounded-full"
            style={{ top: "10px", right: "-18px" }}
          ></div>
          <div
            className="absolute bg-blue-500 w-56 h-56 rounded-full"
            style={{ bottom: "-5px", left: "-5px" }}
          ></div>
          <img
            src="https://t.ly/pObfv"
            alt="Music Studio"
            className="w-56 max-w-lg mb-4 rounded-full relative"
          />
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="absolute bottom-3 right-3 bg-blue-500 text-white p-2 rounded-full text-2xl"
          >
            {isPlaying ? (
              <i className="fa-solid fa-pause"></i>
            ) : (
              <i className="fa-solid fa-play"></i>
            )}
          </button>
        </div>

        <div className="border-2 h-32 w-full sm:w-1/2 md:w-1/3 mt-5 rounded-lg flex items-center justify-between px-4">
          <div className="flex items-center">
            <RiBarChartFill className="mr-2" />
            <p style={{ color: "orange" }}>Walking the Wire</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="bg-green-500 text-white px-4 py-1 rounded-full text-lg"
            >
              {likeCount === 0 ? <FaRegHeart /> : <FaHeart />} ({likeCount})
            </button>
            <RiPlayListAddLine className="text-2xl" />
          </div>
        </div>
      </div>

      <div className="w-full sm:w-72 h-64 my-[200px] px-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptates reprehenderit quis quam asperiores unde aspernatur
          repellat consequuntur amet atque architecto excepturi id magni
          modi cum cupiditate, perspiciatis libero. Amet laborum at modi
          quaerat quam temporibus ipsam quas fugit sapiente enim!
        </p>
      </div>

      <audio ref={audioRef} src={audioUrl} className="w-full max-w-lg" />
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center p-4 bg-white shadow-md">
        <div className="w-[100%] bg-gray-600 border-2 border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgress}
              className="w-11/12 h-2 bg-gray-150 rounded-lg"
            />
            <div className="relative">
              <button
                onClick={toggleDownload}
                className="text-gray-300 text-xl focus:outline-none"
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
              {showDownload && (
                <div className="absolute right-0 bottom-[40px] bg-white shadow-lg rounded-md p-2">
                  <a
                    href={audioUrl}
                    download
                    className="text-blue-400 hover:underline"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={handleBackward}
              className="bg-gray-500 text-white px-4 py-2 rounded text-lg"
            >
              <i className="fa-solid fa-backward"></i>
            </button>
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="bg-blue-500 text-white px-4 py-2 rounded text-lg"
            >
              {isPlaying ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </button>
            <button
              onClick={handleForward}
              className="bg-gray-500 text-white px-4 py-2 rounded text-lg"
            >
              <i className="fa-solid fa-forward"></i>
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.volume = e.target.value;
                }
              }}
              className="w-20 h-2 bg-gray-200 rounded-lg"
              title="Volume Control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudPlayer;
