import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './App.css';
import { Link } from 'react-router-dom';


const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <div className="user-info">
          <span>Hello, {user?.name || user?.email || 'User'}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <p>You have successfully logged in!</p>
      
      <div className="dashboard-content">
      <div className="dashboard-card">
  <h3>Stock Market</h3>
  <p>View all available stocks</p>
  <Link to="/stocks">
    <button className="dashboard-btn">View Stocks</button>
  </Link>
</div>

<div className="dashboard-card">
  <h3>Your Portfolio</h3>
  <p>Check your purchased stocks</p>
  <Link to="/portfolio">
    <button className="dashboard-btn">View Portfolio</button>
  </Link>
</div>
        <div className="dashboard-card">
          <h3>Settings</h3>
          <p>Manage your account settings</p>
          <button className="dashboard-btn">Go to Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Home; 