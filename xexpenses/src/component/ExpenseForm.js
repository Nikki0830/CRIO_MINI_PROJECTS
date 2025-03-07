import React, { useState } from "react";
import { Button, TextField, MenuItem, Card, CardContent } from "@mui/material";

const categories = ["Food", "Entertainment", "Travel"];

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Ensures default form behavior doesn't interfere

    if (!title || !price || !category || !date) {
      alert("All fields are required!");
      return;
    }

    onAddExpense({
      id: Date.now(),
      title,
      price: Number(price),
      category,
      date,
    });

    // ✅ Clear form after submission
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          data-testid="expense-title"
        />
        
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
          data-testid="expense-amount"
        />
        
        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
          data-testid="expense-category"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
          data-testid="expense-date"
        />
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          data-testid="add-expense-btn"
        >
          + Add Expense
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;

