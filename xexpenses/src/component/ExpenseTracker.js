import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Grid,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const categories = ["Food", "Entertainment", "Travel"];

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [expenseData, setExpenseData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
    const totalSpent = storedExpenses.reduce((sum, e) => sum + e.price, 0);
    setBalance(5000 - totalSpent);
  }, []);

  const handleAddExpense = () => {
    setOpen(true);
    setEditIndex(null);
    setExpenseData({ title: "", price: "", category: "", date: "" });
  };

  const handleEditExpense = (index) => {
    setOpen(true);
    setEditIndex(index);
    setExpenseData(expenses[index]);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    const totalSpent = updatedExpenses.reduce((sum, e) => sum + e.price, 0);
    setBalance(5000 - totalSpent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, category, date } = expenseData;
    if (!title || !price || !category || !date) {
      alert("All fields are required!");
      return;
    }
    const updatedBalance = balance - Number(price);
    if (updatedBalance < 0) {
      alert("Insufficient funds!");
      return;
    }
    let updatedExpenses;
    if (editIndex !== null) {
      updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = { ...expenseData, price: Number(price) };
    } else {
      updatedExpenses = [...expenses, { ...expenseData, price: Number(price) }];
    }
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    setBalance(5000 - updatedExpenses.reduce((sum, e) => sum + e.price, 0));
    setOpen(false);
  };

  const expenseChartData = {
    labels: categories,
    datasets: [
      {
        data: categories.map(
          (cat) => expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.price, 0)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" sx={{ fontSize: "2rem", marginBottom: 2, textTransform: "none" }}>
        Expense Tracker
      </Typography>
      <Card sx={{ mb: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ textTransform: "none" }}>Wallet Balance: ₹{balance}</Typography>
          <Button variant="contained" color="primary" onClick={handleAddExpense} sx={{ mt: 2, textTransform: "none" }}>
            + Add Expense
          </Button>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ mt: 2, textTransform: "none" }}>Expense Summary</Typography>
      <Pie data={expenseChartData} />

      <Typography variant="h5" sx={{ mt: 2, textTransform: "none" }}>Expense List</Typography>
      {expenses.map((expense, index) => (
        <Card key={index} sx={{ mb: 1, p: 1 }}>
          <CardContent>
            <Typography>{expense.title} - ₹{expense.price}</Typography>
            <Typography>Category: {expense.category}</Typography>
            <Typography>Date: {expense.date}</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Button variant="contained" fullWidth onClick={() => handleEditExpense(index)} sx={{ textTransform: "none" }}>
                  Edit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="error" fullWidth onClick={() => handleDeleteExpense(index)} sx={{ textTransform: "none" }}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textTransform: "none" }}>{editIndex !== null ? "Edit Expense" : "Add Expense"}</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={expenseData.title}
            onChange={(e) => setExpenseData({ ...expenseData, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="price"
            type="number"
            label="Amount"
            fullWidth
            value={expenseData.price}
            onChange={(e) => setExpenseData({ ...expenseData, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="category"
            select
            label="Category"
            fullWidth
            value={expenseData.category}
            onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
            sx={{ mb: 2 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            name="date"
            type="date"
            fullWidth
            value={expenseData.date}
            onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: "none" }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ textTransform: "none" }}>
            {editIndex !== null ? "Update Expense" : "Add Expense"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpenseTracker;



