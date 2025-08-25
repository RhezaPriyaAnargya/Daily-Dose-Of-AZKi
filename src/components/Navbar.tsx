import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <div className="nav-container">
      <div className="logo">
        Daily Dose Of <span className="azki-pink">AZKi</span>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/playlist" className={({ isActive }) => isActive ? 'active' : ''}>Playlist</NavLink></li>
        <li><NavLink to="/mood" className={({ isActive }) => isActive ? 'active' : ''}>Mood Recommender</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About AZKi</NavLink></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;