import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./component/pages/Home";
import SearchResults from "./component/pages/SearchResults";
import BookingPage from "./component/pages/BookingPage";
import MyBookings from "./component/pages/MyBookings";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medical Center Booking</h1>
        <div>
          <Link to="/" className="mr-6 hover:underline">
            Find Doctors
          </Link>
          <Link to="/my-bookings" className="hover:underline">
            My Bookings
          </Link>
        </div>
      </nav>
      {/* Navigation bar provides links to the homepage and My Bookings page.
      Routes define paths for different pages.
      :id in /booking/:id → Dynamic route for booking appointments. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
    // <div className='text-5xl'>app</div>
  );
}

export default App;
