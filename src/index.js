import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import CompanyDetails from './CompanyDetails';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app*" element={<App />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
