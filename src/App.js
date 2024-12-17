import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudInput from "./components/AudInput"; 
import AudPlayer from "./components/AudPlayer"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudInput />} />
        <Route path="/player" element={<AudPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;


