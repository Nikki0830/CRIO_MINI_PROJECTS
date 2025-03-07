import React, { useState } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";

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
        <Typography variant="h6">Wallet Balance: ₹{balance}</Typography>
        <TextField
          type="number"
          label="Income Amount"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          sx={{ mr: 2, mt: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddIncome}>
          + Add Income
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletBalance;
