import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const [centers, setCenters] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = params.get("state");
  const city = params.get("city");

  useEffect(() => {
    axios
      .get(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      )
      .then((response) => {
        setCenters(response.data);
      });
  }, [state, city]);
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Available Medical Center</h2>
      {centers.map((center) => (
        <div
          key={center["Hospital Name"]}
          className="mb-4 p-4 border rounded-lg shadow-md"
        >
          <h3 className="text-lg font-bold">{center["Hospital Name"]}</h3>
          <p>
            {center.Address}, {center.city}, {center.state},{" "}
            {center["ZIP Code"]}
          </p>
          <Link
            to={`/booking/${center["Hospital Name"]}`}
            className="mt-2 inline-block bg-green-500 text-white p-2 rounded"
          >
            Book FREE Center Visit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;

// 1️⃣ What is useLocation()?
// useLocation() is a React Router hook that gives access to the current URL.

// 🔹 Example:
// If the URL is:

// bash
// Copy code
// http://localhost:3000/search?state=Odisha&city=Bhubaneswar
// Then:

// jsx
// Copy code
// const location = useLocation();
// console.log(location.search); // Output: "?state=Odisha&city=Bhubaneswar"
// location.search gives us the query string (?state=Odisha&city=Bhubaneswar).
// But we still need to extract state and city from it.
// 2️⃣ What is new URLSearchParams(location.search)?
// This converts the query string (?state=Odisha&city=Bhubaneswar) into an object that lets us extract values easily.

// jsx
// Copy code
// const params = new URLSearchParams(location.search);
// This creates a params object that can fetch individual values.
// 3️⃣ How Do We Extract state and city?
// Once we have params, we use .get("key") to get specific values:

// jsx
// Copy code
// const state = params.get("state"); // "Odisha"
// const city = params.get("city"); // "Bhubaneswar"
// If the URL was:

// bash
// Copy code
// http://localhost:3000/search?state=Maharashtra&city=Mumbai
// Then:

// jsx
// Copy code
// console.log(state); // Output: "Maharashtra"
// console.log(city);  // Output: "Mumbai
// If the user clicks the "Book FREE Center Visit" button for Apollo Hospital, they will be redirected to:

// bash
// Copy code
// http://localhost:3000/booking/Apollo Hospital
// For AIIMS Delhi, the URL will be:

// bash
// Copy code
// http://localhost:3000/booking/AIIMS Delhi