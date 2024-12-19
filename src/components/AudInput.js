import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AudInput = () => {
  const fileInputRef = useRef(null);
  const audioRef = useRef();

  const [audioUrl, setAudioUrl] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handleSubmit = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      // console.log(fileUrl);
      navigate('/player', { state: { audioUrl: fileUrl } });
    } else if (validateUrl(audioUrl)) {
      navigate('/player', { state: { audioUrl: audioUrl } });
    } else {
      setError('Please enter a valid URL or upload an audio file.');
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl mb-4">Submit Audio URL or File</h2>

      <div className="flex items-center w-full max-w-lg mb-4">
        <input
          type="text"
          placeholder="Enter audio URL"
          value={audioUrl}
          onChange={(e) => {
            setAudioUrl(e.target.value);
            setFile(null); // Clear file if URL is entered
          }}
          disabled={file !== null}
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={() => {
            setAudioUrl('');
            handleStopAudio(); // Stop the audio when the URL is cleared
          }}
          className="ml-2 text-gray-600"
          disabled={!audioUrl}
        />
      </div>

      <div className="flex items-center w-full max-w-lg mb-4">
        <input
          ref={fileInputRef}
          type="file"
          // accept="audio/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setAudioUrl('');
          }}
          disabled={audioUrl !== ''}
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={() => {
            setFile(null);
            fileInputRef.current.value = '';
            handleStopAudio();
          }}
          className="ml-2 text-gray-600"
          // disabled={!file}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Submit
      </button>

      {error && <p className="text-red-500 mb-2">{error}</p>}
    </div>
  );
};

export default AudInput;
