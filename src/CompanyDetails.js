import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./CompanyDetails.css";

function CompanyDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [company, setCompany] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "82e5ea068792eb67b9f19a1580c3b49f";
      const url = `https://esgapiservice.com/api/authorization/search?q=${id}&token=${apiKey}`;
      try {
        const response = await axios.get(url);
        setCompany(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (location.state) { 
      setCompany(location.state.companyData);
    } else {
      fetchData();
    }
  }, [id, location.state]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      {company ? (
        <>
          <header>
            <img src="/tree-logo.png" alt="EcoInvest logo" />
            <h3>Home</h3>
          </header>
          <h2>{company.company_name} | {company.stock_symbol}</h2> 
          <strong>Environment Grade: </strong>
          {company.environment_grade}
          <ul>
            <li>
              <strong>Social Grade:</strong> {company.social_grade}
            </li>
            <li>
              <strong>Governance Grade:</strong> {company.governance_grade}
            </li>
            <li>
              <strong>Total Grade:</strong> {company.total_grade}
            </li>
            <DropdownButton title="ESG Rating Definitions" onClick={toggleDropdown}>
          </DropdownButton>
          {showDropdown && (
            <Dropdown.Menu show={showDropdown}>
              <Dropdown.Item eventKey="1">
                E - Environmental: Measures a company's impact on the environment and its management of natural resources
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                S - Social: Measures a company's impact on society and its relationships with stakeholders
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">
                G - Governance: Measures a company's leadership, transparency, and management of ethical issues
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
          </ul>
        </>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CompanyDetails;
