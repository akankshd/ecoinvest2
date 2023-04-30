import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="HomePage">
      <h1>
        <span>e</span>
        <span>c</span>
        <span>o</span>
        <span>i</span>
        <span>n</span>
        <span>v</span>
        <span>e</span>
        <span>s</span>
        <span>t</span>
      </h1>
      <Link to="/App">
        <button>go green</button>
      </Link>
    </div>
  );
}

export default HomePage;
