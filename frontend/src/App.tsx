import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import { Calendar } from './pages/calendar';
import { Dashboard } from './pages/dashboard';
import { LoginModal } from './pages/login';
import { GuestsPage } from './pages/guests';
import { getLocalStorageItem, removeLocalStorageItem } from './funcs/storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Button } from '@mui/material';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = getLocalStorageItem('mii-jwt');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: any = jwtDecode<JwtPayload>(token);
      setUserEmail(decodedToken.email);
    }
  }, []);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
    const token = getLocalStorageItem('mii-jwt');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: any = jwtDecode<JwtPayload>(token);
      setUserEmail(decodedToken.email);
    }
  };

  const handleLogout = () => {
    removeLocalStorageItem('mii-jwt');
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  const truncateEmail = (email: string) => {
    const atIndex = email.indexOf('@');
    if (atIndex <= 5) return email;
    return `${email.slice(0, 5)}...${email.slice(atIndex)}`;
  };

  return (
    <BrowserRouter>
      <nav className="bg-blue-600 text-white py-4">
        <div className="max-w-5xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Mii-tings</h1>
          <div className="space-x-6 flex items-center">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/calendar" className="hover:underline">Calendar</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/guests" className="hover:underline">Guests</Link>
            {isLoggedIn && userEmail && (
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full">
                {truncateEmail(userEmail)}
              </span>
            )}
            {isLoggedIn ? (
              <Button onClick={handleLogout} className="hover:underline" variant='contained' color="error">
                Logout
              </Button>
            ) : (
              <Button onClick={handleLoginOpen} className="hover:underline" variant='contained' color='success'>
                Login
              </Button>
            )}
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
