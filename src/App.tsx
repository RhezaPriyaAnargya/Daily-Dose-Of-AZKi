
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlayerBar from './components/PlayerBar';
import Dashboard from './pages/Dashboard';
import Playlist from './pages/Playlist';
import MoodRecommender from './pages/MoodRecommender';
import About from './pages/About';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/mood" element={<MoodRecommender />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <PlayerBar />
      </div>
    </Router>
  );
};

export default App;
