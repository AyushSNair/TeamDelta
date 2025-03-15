import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Stocks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/stocks')
      .then(response => setStocks(response.data))
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  const handleBuy = async (symbol) => {
    const quantity = quantities[symbol] || 1; // Default to 1 if not specified
    try {
      await axios.post('http://localhost:8000/api/stocks/buy', {
        email: user.email,  // Assuming user authentication
        symbol,
        quantity
      });
      alert(`Successfully bought ${quantity} shares of ${symbol}`);
    } catch (error) {
      console.error('Error buying stock:', error);
      alert('Failed to buy stock');
    }
  };

  return (
    <div className="stocks-container">
      <h1>Stock Market</h1>
      <table className="stocks-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Available Quantity</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>${stock.price}</td>
              <td>{stock.quantity}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max={stock.quantity}
                  value={quantities[stock.symbol] || 1}
                  onChange={(e) => setQuantities({ ...quantities, [stock.symbol]: e.target.value })}
                />
                <button className="buy-btn" onClick={() => handleBuy(stock.symbol)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-btn" onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
};

export default Stocks;
