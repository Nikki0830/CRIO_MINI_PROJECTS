import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function BookingPage() {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookings, setBookings] = useState(() => {
    return JSON.parse(localStorage.getItem("bookings")) || [];
  });

  const handleBooking = () => {
    if (date && timeSlot) {
      const newBooking = { hospital: id, date, timeSlot };
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      alert("Appointment booked successfully!");
    } else {
      alert("Please select a date and time slot.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Book Appointment at {id}</h2>
      <div className="mb-4">
        <label className="block font-medium">Date:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Time Slot:</label>
        <select 
          value={timeSlot} 
          onChange={(e) => setTimeSlot(e.target.value)} 
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Time Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>
      <button 
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" 
        onClick={handleBooking}
      >
        Book FREE Center Visit
      </button>
    </div>
  );
}

export default BookingPage;


// Explanation of handleBooking Function
// This function is responsible for handling the appointment booking process when the user clicks the "Book FREE Center Visit" button.

// Step-by-Step Breakdown
// js
// Copy code
// const handleBooking = () => {
// This defines a function called handleBooking, which will be triggered when the booking button is clicked.
// 1. Checking if the User Has Selected a Date & Time Slot
// js
// Copy code
// if (date && timeSlot) {
// This checks whether the user has selected both:
// A date (date state variable).
// A time slot (timeSlot state variable).
// If either of them is empty, the else block (explained later) will show an alert.
// 2. Creating a New Booking Entry
// js
// Copy code
// const newBooking = { hospital: id, date, timeSlot };
// A new booking object is created with:
// hospital: id → Stores the hospital's ID (retrieved from the URL using useParams).
// date: date → Stores the selected appointment date.
// timeSlot: timeSlot → Stores the selected time slot.
// Example: If a user selects March 20, 2025, at Morning for a hospital with ID CityHospital123, the newBooking object will look like this:

// js
// Copy code
// {
//   hospital: "CityHospital123",
//   date: "2025-03-20",
//   timeSlot: "Morning"
// }
// 3. Updating the Bookings List
// js
// Copy code
// const updatedBookings = [...bookings, newBooking];
// bookings is an array that holds all previous bookings (retrieved from localStorage).
// Spread Operator (...bookings) is used to copy existing bookings.
// newBooking is added to the end of the array.
// Example: If a user had a previous booking:

// js
// Copy code
// [
//   { hospital: "GeneralHospital", date: "2025-03-18", timeSlot: "Afternoon" }
// ]
// After booking a new one, updatedBookings will be:

// js
// Copy code
// [
//   { hospital: "GeneralHospital", date: "2025-03-18", timeSlot: "Afternoon" },
//   { hospital: "CityHospital123", date: "2025-03-20", timeSlot: "Morning" }
// ]
// 4. Updating State and Saving to Local Storage
// js
// Copy code
// setBookings(updatedBookings);
// localStorage.setItem("bookings", JSON.stringify(updatedBookings));
// setBookings(updatedBookings) → Updates the React state with the new list of bookings.
// localStorage.setItem("bookings", JSON.stringify(updatedBookings)) → Stores the updated bookings in localStorage, ensuring data persists even after a page refresh.
// 5. Showing a Success Message
// js
// Copy code
// alert("Appointment booked successfully!");
// Displays a pop-up alert confirming the appointment.
// 6. Handling Missing Input (Else Block)
// js
// Copy code
// } else {
//   alert("Please select a date and time slot.");
// }
// If the user hasn't selected a date or time slot, it shows an error message.
// The function stops execution here, preventing an incomplete booking.
// Final Flow Summary
// User selects a date and time slot → Clicks "Book FREE Center Visit."
// Function checks if date & time slot are filled:
// ✅ If valid, it:
// Creates a new booking.
// Adds it to existing bookings.
// Updates state & local storage.
// Shows a success message.
// ❌ If missing information, it:
// Displays an error message.
