
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Movies from "./pages/Movies";
import Theatres from "./pages/Theatres";
import SeatSelection from "./pages/SeatSelection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/seats" element={<SeatSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
