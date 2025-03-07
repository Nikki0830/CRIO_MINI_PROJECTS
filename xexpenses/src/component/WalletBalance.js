import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const WalletBalance = ({ balance, onAddIncome }) => {
  const [income, setIncome] = useState("");
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    if (income > 0) {
      onAddIncome(Number(income));
      setIncome("");
      setShowForm(false); // Hide form after submission
    } else {
      alert("Enter a valid income amount!");
    }
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h4">Wallet Balance: ₹{balance}</Typography>

        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => setShowForm(!showForm)} // Toggle form
          data-testid="add-income-btn"
          sx={{ textTransform: "none", mb: 2 }} // Prevent uppercase
        >
          + Add Income
        </Button>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              type="number"
              name="income"
              placeholder="Income Amount"
              data-testid="income-input"
              variant="outlined"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              sx={{ mr: 2, mt: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-balance-btn"
              sx={{ textTransform: "none" }}
            >
              Add Balance
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletBalance;

