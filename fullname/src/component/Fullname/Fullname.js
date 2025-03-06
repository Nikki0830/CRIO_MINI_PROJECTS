import React, { useState } from "react";
import "./Fullname.css";

function Fullname() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [fullName, setFullName] = useState("");

  //   const handleFirstChange = (e) => {
  //     setFirstName(e.target.value);
  //   };

  //   const handleSecondChange = (e) => {
  //     setSecondName(e.target.value);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents page refresh
    if (firstName.trim() && secondName.trim()) {
      setFullName(`${firstName} ${secondName}`);
    }
    // checks if both firstName and
    // secondName contain non-empty values
    // after removing extra spaces.
  };
  return (
    <div className="fomm_div" onSubmit={handleSubmit}>
      <h1>Full Name Display</h1>
      <form className="name_form">
        <label>First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        ></input>

        <label>Last Name: </label>
        <input
          type="text"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          required
        ></input>

        <button
          type="submit"
        //   disabled={!firstName.trim() || !secondName.trim()}
        >
          Submit
        </button>
      </form>
      {/* Display full name only if both fields are filled */}
      {fullName && <p>Full Name: {fullName}</p>}
      {/* //same as */}
      {/* {fullName ? <p>Full Name: {fullName}</p> : null} */}
    </div>
  );
}

export default Fullname;
