import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './App.css';

const BuyStock = () => {
  const { symbol } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');

  const handleBuy = () => {
    axios.post('http://localhost:8000/api/stocks/buy', { email: user.email, symbol, quantity })
      .then(() => {
        alert('Stock purchased successfully!');
        navigate('/portfolio');
      })
      .catch(err => alert(err.response?.data?.message || "Error buying stock"));
  };

  return (
    <div className="container">
      <h2>Buy {symbol}</h2>
      <input 
        type="number" 
        placeholder="Quantity" 
        value={quantity} 
        onChange={e => setQuantity(e.target.value)} 
      />
      <button className="buy-btn" onClick={handleBuy}>Confirm Purchase</button>
    </div>
  );
};

export default BuyStock;
