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

  const handleAddIncome = () => {
    if (income > 0) {
      onAddIncome(Number(income));
      setIncome("");
    } else {
      alert("Enter a valid income amount!");
    }
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        {/* ✅ Updated to h4 for better visibility and Cypress detection */}
        <Typography variant="h4">Wallet Balance</Typography>
        <Typography variant="h5" data-testid="wallet-balance">
          ₹{balance}
        </Typography>

        {/* ✅ Added test-friendly attributes for better Cypress detection */}
        <TextField
          type="number"
          label="Income Amount"
          data-testid="income-input"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          sx={{ mr: 2, mt: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddIncome}
          data-testid="add-income-btn"
        >
          Add Income
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletBalance;
