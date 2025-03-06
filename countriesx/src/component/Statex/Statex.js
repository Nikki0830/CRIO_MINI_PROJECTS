import React, { useState, useEffect } from "react";
import "./Statex.css";

function Statex() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState("");
  const [Cities, setCities] = useState("");
  const [showResult, setShowResult] = useState(false);

  const countryFetch = "https://crio-location-selector.onrender.com/countries";
  const stateFetch =
    "https://crio-location-selector.onrender.com/country={countryName}/states";
  const cityFetch =
    "https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities";

    useEffect(() => {
      fetch(countryFetch)
        .then((response) => response.json())
        .then((data) => setCountries(data))
  
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    console.log(countries)
  return (
  <div className="main_div">
      <select
        className="country_select"
        value={countries}
        onChange={(e) => {
          setCountries(e.target.value);
          setStates([]);
          setCities([]);
          setShowResult(false);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((item)=>(
            <option key = {item} value={item}>{item}</option>
        ))}
        
      </select>
    </div>  
  );
}
export default Statex;
