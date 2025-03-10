import React from "react";
import "./Xcountrysearch.css";
import { useEffect, useState } from "react";

function Country() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((response) => response.json())
      .then((json) => setCountries(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredcountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main_div">
      {/* Input field */}
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />
      <div className="countries_div">
        {filteredcountries.map(({ common, png }) => (
          <div key={common} className="countryCard">
            <img src={png} alt="flag_images" className="flag_img" />
            <h2 className="flag_name">{common}</h2> {/* Changed from h3 to h2 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Country;

