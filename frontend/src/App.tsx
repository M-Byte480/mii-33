import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import { Calendar } from './pages/calendar';
import { Dashboard } from './pages/dashboard';
import { LoginPage } from './pages/login';
import { GuestsPage } from './pages/guests';

export const setSessionItem = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = (key: string) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeSessionItem = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSession = () => {
  sessionStorage.clear();
};

function App() {
  const calendarID = process.env.REACT_APP_CALENDAR_ID
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN

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
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/guests' element={<GuestsPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
