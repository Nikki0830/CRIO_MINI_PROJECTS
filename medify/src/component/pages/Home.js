// The home page allows users to select a state and city to find medical centers.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate(); // ✅ useNavigate should be used here
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((response) => setStates(response.data))
      .catch((error) => {
        console.error("Error fetching states:", error);
        alert("Failed to load states. Please try again later.");
      });
  }, []);

  useEffect(() => {
    if (!selectedState) return; // Don't fetch cities if no state is selected

    axios
      .get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
      .then((response) => setCities(response.data))
      .catch((error) => {
        console.error("Error fetching cities:", error);
        alert("Failed to load cities. Please try again later.");
      });
  }, [selectedState]);
  // selectedState && selectedCity
  // This checks if both a state and a city have been selected by the user.
  // If both values are present, the code navigates to the Search Results page with the selected state and city as URL parameters.
  // 🔹 navigate(/search?state=${selectedState}&city=${selectedCity})
  // Redirects the user to the SearchResults page.
  // The selected state and city are passed as query parameters (?state=XYZ&city=ABC).
  const handleSearch = () => {
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`); // ✅ Correct function usage
    } else {
      alert("Please select a state and city.");
    }
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Find a Medical Center</h2>
      <div>
        <select
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 mt-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default Home;
// export default Home;

// Why Use useNavigate Instead of <Link>?
// You're right that we can navigate using React Router's <Link> component, but useNavigate is needed for dynamic and programmatic navigation. Let’s break it down:

// 1️⃣ Navigation using <Link> (Static Navigation)
// <Link> is used for static navigation when we already know the destination URL at render time.
// Example:
// jsx
// Copy
// Edit
// <Link to="/search?state=Odisha&city=Bhubaneswar">Search</Link>
// 🔹 When to use?
// When rendering a navigation button that always leads to a known page.
// 2️⃣ Why Use useNavigate Instead?
// useNavigate() is needed when we don't know the URL beforehand and need to generate it dynamically based on user input or API data.
// Example scenario:
// A user selects a state and a city from dropdowns.
// We need to construct the URL dynamically based on their choices.
// We can't use <Link> here since the values come from user input.