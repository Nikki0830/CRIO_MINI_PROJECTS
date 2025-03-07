import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, Card, CardContent, Typography } from "@mui/material";

const categories = ["Food", "Entertainment", "Travel"];

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    console.log("Loaded expenses from localStorage:", savedExpenses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !category || !date) {
      alert("All fields are required!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      date,
    };

    onAddExpense(newExpense);

    // ✅ Save to localStorage with 'expenses' key
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    localStorage.setItem("expenses", JSON.stringify([...storedExpenses, newExpense]));

    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        {/* ✅ Using h2 instead of h1 to avoid multiple h1 tags */}
        <Typography variant="h2">Add Expense</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
            data-testid="expense-title"
          />

          <TextField
            name="price"
            type="number"
            label="Amount"
            placeholder="Enter Expense Amount" // ✅ Ensured placeholder
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 2 }}
            data-testid="expense-amount"
          />

          <TextField
            name="category"
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
            name="date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
            data-testid="expense-date"
          />

          {/* ✅ "+ Add Expense" button correctly set with type="submit" */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
            data-testid="submit-expense-btn"
          >
            + Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
