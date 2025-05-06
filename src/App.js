import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageGenerator from "./component/imageGenerator";
import ImageEditor from "./component/ImageEditer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageGenerator />} />
        <Route path="/edit" element={<ImageEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
