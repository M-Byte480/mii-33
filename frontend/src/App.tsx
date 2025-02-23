import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import { Calendar } from './pages/calendar';
import { Dashboard } from './pages/dashboard';
import { LoginModal } from './pages/login';
import { GuestsPage } from './pages/guests';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

  return (
    <BrowserRouter>
      <nav className="bg-blue-600 text-white py-4">
        <div className="max-w-5xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Mii-tings</h1>
          <div className="space-x-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/calendar" className="hover:underline">Calendar</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/guests" className="hover:underline">Guests</Link>
            <button onClick={handleLoginOpen} className="hover:underline">Login</button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/guests' element={<GuestsPage />} />
      </Routes>
      <LoginModal open={isLoginOpen} onClose={handleLoginClose} />
    </BrowserRouter>
  );
}

export default App;
