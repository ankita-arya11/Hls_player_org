import React, { useState } from "react";
import HomePage from "./components/HomePage";
import AudPlayer from "./components/AudPlayer";
import VidPlayer from "./components/VidPlayer";

const App = () => {
  const [option, setOption] = useState(null);

  return (
    <div>
      {option === null && <HomePage setOption={setOption} />}
      {option === "audio" && <AudPlayer />}
      {option === "video" && <VidPlayer />}
    </div>
  );
};

export default App;


// https://files.topmediai.com/aimusic/api/6cb43343-a1ec-4479-aa4b-411c3db4db24-audio.mp3