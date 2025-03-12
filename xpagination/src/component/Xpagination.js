import React, { useState, useEffect } from "react";
import "./Xpagination.css"

function Xpagination() {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployee(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employee.length / rowsPerPage);
  // Example:
  // Suppose we have 53 employees.
  // 53 / 10 = 5.3, so Math.ceil(5.3) = 6.
  // This means we need 6 pages to display all employees.

  const startIndex = (currentPage - 1) * rowsPerPage;
  // Example:
  // If currentPage = 1, startIndex = (1 - 1) * 10 = 0 (Start from the first employee).
  // If currentPage = 2, startIndex = (2 - 1) * 10 = 10 (Start from the 11th employee).
  // If currentPage = 3, startIndex = (3 - 1) * 10 = 20 (Start from the 21st employee).

  const displayEmployees = employee.slice(startIndex, startIndex + rowsPerPage);
  // Example (With 20 Employees, 10 per page):
  // Page 1: employees.slice(0, 10) → Employees 0-9
  // Page 2: employees.slice(10, 20) → Employees 10-19
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {displayEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* prev - 1: Moves to the previous page.
          Math.max(prev - 1, 1): Ensures the page number does not go below 1.
          If prev = 1, then prev - 1 = 0, but Math.max(0, 1) = 1, so it stays on page 1.
          disabled={currentPage === 1}
          The button is disabled on the first page (so it can't go lower than page 1). */}

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        {/* Displays the current page number and the total pages.
         Adds horizontal margin (10px left & right) for spacing. */}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        {/* prev + 1: Moves to the next page.
         Math.min(prev + 1, totalPages): Ensures the page number does not go beyond the last page.
         If prev = totalPages, then prev + 1 would be greater than totalPages, so it stays at totalPages.
         disabled={currentPage === totalPages} 
        The button is disabled on the last page (so it can't go beyond the available pages). */}
      </div>
    </div>
  );
}

export default Xpagination;
