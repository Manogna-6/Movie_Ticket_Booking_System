
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Theatres from './pages/Theatres';
import Bookings from './pages/Bookings';
import SeatSelection from './pages/SeatSelection';

import BookingSummary from "./pages/BookingSummary";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
