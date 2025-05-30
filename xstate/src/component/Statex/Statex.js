// import React, { useState, useEffect } from "react";
// import "./Statex.css";

// function Statex() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setselectedState] = useState("");
//   const [selectedCity, setselectedCity] = useState("");

//   const countryFetch = "https://crio-location-selector.onrender.com/countries";
//   const stateFetch = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
//   const cityFetch = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`

//   useEffect(() => {
//     fetch(countryFetch)
//       .then((response) => response.json())
//       .then((data) => setCountries(data || []))

//       .catch((error) => console.error("Error fetching countries:", error));
//   }, []);
//   //   console.log(countries);
//   //fetch states when country is selected
//   // The ! (logical NOT) operator negates the value.
//   // This condition is true when selectedCountry is empty (""), null, undefined, or false.
//   // This prevents fetching states until a country is selected.
//   //he function exits early without running the fetch request.
//   useEffect(() => {
//     if (!selectedCountry) return;
//     fetch(stateFetch)
//       .then((response) => response.json())
//       .then((data) => setStates(data || []))
//       //Add a check fo an empty response
//       .catch((error) => console.error("Error fetching states", error));
//   }, [selectedCountry]);
//   console.log(states);
//   // useEffect(() => { ... }, [selectedCountry]);
//   // Why Not Use [] Instead of [selectedCountry]?
//   // 🚫 If we used [], it would only fetch states once when the component mounts, not when selectedCountry changes.
//   // 🚫 Users selecting a new country would NOT trigger a new fetch! (Incorrect behavior)

//   useEffect(() => {
//     if (!selectedState) return;
//     fetch(cityFetch)
//       .then((response) => response.json())
//       .then((data) => setCities(data))

//       .catch((error) => console.error("Error fetching cities:", error));
//   }, [selectedState]);
//   console.log(cities);
//   return (
//     <div className="main_div">
//       <div className="select_heading">Select Location</div>
//       {/* COUNTRY SELECT */}
//       <select
//         className="country_select"
//         value={selectedCountry}
//         onChange={(e) => {
//           setSelectedCountry(e.target.value);
//           setselectedState(""); //Reset state selection
//           setselectedCity(""); //Reset city selection
//           setStates([]);
//           setCities([]);
//         }}
//       >
//         <option value="">Select Country</option>
//         {countries.map((country) => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>
//       {/* STATE SELECT */}
//       <select
//         className="state_select"
//         value={selectedState}
//         onChange={(e) => {
//           setselectedState(e.target.value);
//           setselectedCity(""); //Reset city selection
//           setCities([]);
//         }}
//         disabled={!selectedCountry}
//         // The disabled={!selectedCountry} in the <select> element ensures that the State dropdown is disabled until a country is
//         // selected. Here's why it's needed:
//         // 🔹 How it Works
//         // /!selectedCountry means if no country is selected (empty string, null, or undefined), the dropdown will be disabled.
//       >
//         <option value="">Select State</option>
//         {states.map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>
//       {/* CITY SELECT */}
//       <select
//         className="city_select"
//         value={selectedCity}
//         onChange={(e) => setselectedCity(e.target.value)}
//         disabled={!selectedState}
//       >
//         <option value="">Select City</option>

//         {/* Why value="" is Necessary?
//  Acts as a default placeholder option
// When no city is selected,
// this empty value ensures that
// the dropdown does not auto-select an
// invalid city. */}
//         {cities.map((city) => (
//           <option key={city} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>
//       {/* SHOW SLECTION TOGETHER */}
//       {selectedCity && (
//         <div className="All_thingsTogeter">
//           <span className="text_country">
//             <p>You selected</p>
//             {selectedCountry},
//           </span>
//           <p>{selectedState}, </p>
//           <p>{selectedCity}</p>
//         </div>
//       )}
//     </div>
//     // The && (logical AND) operator is
//     // used here as a conditional rendering
//     // technique in React. It ensures that the <div> block only renders when selectedCity has a value.
//   );
//   //   Why value={city} in <option>?
//   // The value attribute in <option>
//   // is necessary because it determines
//   // what value will be stored when a user
//   // selects that option. Here’s why it's important:
// }
// export default Statex;

import React, { useState, useEffect } from "react";
import "./Statex.css";

function Statex() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError("Error fetching countries");
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        if (!response.ok) throw new Error("Failed to fetch states");
        const data = await response.json();
        setStates(data);
      } catch (error) {
        setError("Error fetching states");
        console.error(error);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError("Error fetching cities");
        console.error(error);
      }
    };

    fetchCities();
  }, [selectedState]);

  return (
    <div className="main_div">
      <h2 className="select_heading">Select Location</h2>

      {error && <p className="error_message">{error}</p>}

      <div className="select_container">
        {/* Country Dropdown */}
        <select
          className="dropdown"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
            setStates([]);
            setCities([]);
            setError(null);
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          className="dropdown"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
            setCities([]);
            setError(null);
          }}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          className="dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

 
      {/* Display Selected Location - FIXED */}
      {selectedCity && selectedState && selectedCountry && (
        <div className="location_display">
          <p className="selected_label">
            You selected <span className="selected_city">{selectedCity}</span>,{" "}
            <span className="selected_state">{selectedState}</span>,{" "}
            <span className="selected_country">{selectedCountry}</span>
          </p>
        </div>
      )}
    </div>
  );
}
export default Statex;
