import React, { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [esgData, setEsgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEsgData = async () => {
    setLoading(true);
    setError(null);

    const apiKey = "82e5ea068792eb67b9f19a1580c3b49f";
    const url = `https://esgapiservice.com/api/authorization/search?q=${query}&token=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "You've reached the rate limit for the API. Please wait and try again later."
          );
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setEsgData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEsgData();
  };

  return (
    <div className="App">
      <div class="new-div">
        <div class="image-container">
          <img src="/mountains-sky.jpeg" alt="main-bg" class="appbg" />
          <h1 class="image-text">Invest Green.</h1>
          <h4 class="small-text">t</h4>
        </div>
    </div>
    <div class="bottom"> 
      <div class="logo-container">
        <img src="/tree-logo.png" alt="EcoInvest logo" class="logo" />
        <h1 class="go-green">Go Green.</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter company names or stock symbols, separated by commas"
        />
        <button type="submit" class="my-button">click</button>
      </form>
    </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {esgData && (
        <div>
          <h2>ESG Ratings:</h2>
          <ul>
            {esgData.map((company) => (
              <li key={company.esg_id}>
                <Link
                  to={{
                    pathname: `/companies/${company.company_name}`,
                    state: { companyData: company },
                  }}
                >
                  {company.company_name} ({company.exchange_symbol}:{company.stock_symbol})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Routes>
        <Route path="/companies/:id" element={<CompanyDetails />} />
      </Routes>
    </div>
  );
}

export default App;
