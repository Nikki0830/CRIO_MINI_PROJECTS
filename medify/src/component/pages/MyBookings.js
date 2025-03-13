import React, { useState, useEffect } from "react";

export function MyBookings() {
   const [bookings, setBookings] = useState(() => {
      return JSON.parse(localStorage.getItem("bookings")) || [];
    });

  // Load bookings from localStorage when the component mounts
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{booking.hospital}</h3>
            <p className="text-gray-700">Date: {booking.date}</p>
            <p className="text-gray-700">Time Slot: {booking.timeSlot}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

export default MyBookings;

// Step-by-Step Explanation
// useEffect Hook
// js
// Copy code
// useEffect(() => { ... }, []);
// useEffect is a React hook that runs code after the component has rendered.
// The empty dependency array ([]) means this effect runs only once, when the component mounts.
// Fetching Data from localStorage
// js
// Copy code
// const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
// localStorage.getItem("bookings"):
// Retrieves the saved bookings from localStorage.
// localStorage stores data as strings, so we parse it back into a JavaScript object using JSON.parse().
// If localStorage is empty (null), || [] ensures storedBookings defaults to an empty array ([]) to prevent errors.
// Updating State
// js
// Copy code
// setBookings(storedBookings);
// Updates the bookings state with the retrieved data.
// This triggers a re-render of the component, showing the saved bookings.
