import React, { useState, useSyncExternalStore } from "react";
import "./App.css";

const Modal = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });  
  
  const [modalON, setModalON] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let error = false;
    if (formData.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      error = true;
    }
    if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in future.");
      error = true;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      alert("Invalid email. Please check your email address.");
      error = true;
    }

    if (error) return;

    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
    setModalON(false);
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="Xmodal">
      <h1>User Details Modal</h1>
      <button onClick={() => setModalON(true)}>Open Form</button>
      {modalON ? (
        <div className="modal" onClick={() => setModalON((prev) => !prev)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                onChange={handleChange}
                required
                value={formData.username}
                name="username"
                id="username"
                type="text"
              />
              <label htmlFor="email">Email Address:</label>
              <input
                onChange={handleChange}
                required
                value={formData.email}
                name="email"
                id="email"
                type="email"
              />
              <label htmlFor="phone">Phone Number:</label>
              <input
                onChange={handleChange}
                required
                value={formData.phone}
                name="phone"
                id="phone"
                type="number"
              />
              <label htmlFor="dob">Date of birth:</label>
              <input
                onChange={handleChange}
                required
                value={formData.dob}
                name="dob"
                id="dob"
                type="date"
              />
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
