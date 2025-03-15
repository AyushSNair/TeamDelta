import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Portfolio = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/stocks/portfolio/${user.email}`)
      .then(res => setPortfolio(res.data))
      .catch(err => console.error(err));
  }, [user.email]);

  return (
    <div className="container">
      <h2>Your Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>No stocks purchased yet.</p>
      ) : (
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Current Price</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map(stock => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>${stock.currentPrice}</td>
                <td>
                  <Link to={`/sell/${stock.symbol}`}>
                    <button className="sell-btn">Sell</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Portfolio;
