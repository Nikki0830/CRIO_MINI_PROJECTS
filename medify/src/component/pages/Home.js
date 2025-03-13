// The home page allows users to select a state and city to find medical centers.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false); // Loading state for cities

  // Fetch states on component mount
  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((response) => setStates(response.data))
      .catch((error) => {
        console.error("Error fetching states:", error);
        alert("Failed to load states. Please try again later.");
      });
  }, []);

  // Fetch cities when state is selected (with a delay to allow state update)
  useEffect(() => {
    if (!selectedState) return;

    setLoadingCities(true); // Start loading
    axios
      .get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
      .then((response) => {
        setCities(response.data);
        setShowCities(true); // Open dropdown when cities are available
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        alert("Failed to load cities. Please try again later.");
      })
      .finally(() => setLoadingCities(false)); // Stop loading
  }, [selectedState]);

  const handleSearch = () => {
    console.log("State:", selectedState);
    console.log("City:", selectedCity);

    if (selectedState && selectedCity) {
      navigate(`/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    } else {
      alert("Please select a state and city.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Find a Medical Center</h2>

      {/* State Dropdown */}
      <div id="state" className="relative">
        <button
          onClick={() => setShowStates(!showStates)}
          className="w-full p-2 border rounded bg-white text-left"
        >
          {selectedState || "Select State"}
        </button>
        {showStates && (
          <ul className="absolute w-full bg-white border rounded shadow-md mt-1 z-50 max-h-48 overflow-y-auto">
            {states.map((state) => (
              <li
                key={state}
                onClick={() => {
                  setSelectedState(state);
                  setSelectedCity(""); // Reset city when state changes
                  setShowStates(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* City Dropdown */}
      <div id="city" className="relative mt-4">
        <button
          onClick={() => setShowCities(!showCities)}
          className="w-full p-2 border rounded bg-white text-left"
          disabled={!selectedState || loadingCities} // Disable if no state or loading
        >
          {loadingCities ? "Loading..." : selectedCity || "Select City"}
        </button>
        {showCities && (
          <ul className="absolute w-full bg-white border rounded shadow-md mt-1 z-50 max-h-48 overflow-y-auto">
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setShowCities(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 mt-4 rounded disabled:bg-gray-400"
        onClick={handleSearch}
        disabled={!selectedState || !selectedCity} // Disable button if selection is incomplete
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
