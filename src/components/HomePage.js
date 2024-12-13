import React from "react";

const HomePage = ({ setOption }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-6">Want to Listen to Audio or Watch Video?</h1>
      <div>
        <button
          onClick={() => setOption("audio")}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Listen to Audio
        </button>
        {' '}
        <button
          onClick={() => setOption("video")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Watch Video
        </button>
      </div>
    </div>
  );
};

export default HomePage;