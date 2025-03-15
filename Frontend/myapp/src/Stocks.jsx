import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/stocks')
      .then(res => setStocks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Available Stocks</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity Available</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock._id}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.price}</td>
              <td>{stock.quantity}</td>
              <td>
                <Link to={`/buy/${stock.symbol}`}>
                  <button className="buy-btn">Buy</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
