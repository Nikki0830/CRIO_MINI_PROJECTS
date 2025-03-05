import React from "react";
import "./Country.css";
import { useEffect, useState } from "react";

function Country() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => response.json())
      .then((json) => setData(json))

      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className = "main_div">
      {data.map(({ name, flag, abbr }) => (
        <div key={abbr} className="flag_img_div">
          <img src={flag} alt="flag_images" className="flag_img" />
          <h3 className = "flag_name">{name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Country;
