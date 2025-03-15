import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './App.css';

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
          <h3>Your Profile</h3>
          <p>View and edit your profile information</p>
          <button className="dashboard-btn">View Profile</button>
        </div>
        <div className="dashboard-card">
          <h3>Your Activities</h3>
          <p>Check your recent activities</p>
          <button className="dashboard-btn">View Activities</button>
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