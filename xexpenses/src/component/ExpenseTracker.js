import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Button, Modal, Box, 
  TextField, List, ListItem, ListItemText, IconButton, Card 
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Styles.css"; // Import external styles

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(() => parseFloat(localStorage.getItem("walletBalance")) || 5000);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem("expenses")) || []);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newExpense, setNewExpense] = useState({ title: "", amount: "", category: "", date: "" });

  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (!newExpense.title || !amount || !newExpense.category || !newExpense.date) {
      alert("All fields are required");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }

    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      const previousAmount = parseFloat(updatedExpenses[editIndex].amount);
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setBalance(balance + previousAmount - amount);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
      setBalance(balance - amount);
    }
    setNewExpense({ title: "", amount: "", category: "", date: "" });
    setOpen(false);
  };

  const handleEditExpense = (index) => {
    setNewExpense(expenses[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteExpense = (index) => {
    const deletedAmount = parseFloat(expenses[index].amount);
    setExpenses(expenses.filter((_, i) => i !== index));
    setBalance(balance + deletedAmount);
  };

  const expenseCategories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [{
      data: Object.values(expenseCategories),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    }],
  };

  const barData = {
    labels: Object.keys(expenseCategories),
    datasets: [{
      label: "Expenses",
      data: Object.values(expenseCategories),
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    }],
  };

  return (
    <Container className="main-container">
      <Typography variant="h4" component="h1" className="header-title">
        Expense Tracker
      </Typography>

      {/* Wallet & Expenses Summary */}
      <div className="summary-container">
        <Card className="summary-card">
          <Typography variant="h6">Wallet Balance: <span className="balance-amount">₹{balance}</span></Typography>
          <Button className="income-btn" onClick={() => setOpen(true)}>+ Add Income</Button>
        </Card>

        <Card className="summary-card">
          <Typography variant="h6">Expenses: <span className="expense-amount">₹{expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0)}</span></Typography>
          <Button className="expense-btn" onClick={() => setOpen(true)}>+ Add Expense</Button>
        </Card>
      </div>

      {/* Add Expense Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <TextField fullWidth name="title" label="Title" value={newExpense.title} 
            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })} />
          <TextField fullWidth name="amount" label="Amount" type="number" value={newExpense.amount} 
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
          <TextField fullWidth name="category" label="Category" value={newExpense.category} 
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} />
          <TextField fullWidth name="date" type="date" value={newExpense.date} 
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
          <Button onClick={handleAddExpense} className="add-btn">{editIndex !== null ? "Update" : "Add"}</Button>
        </Box>
      </Modal>

      {/* Expense List */}
      <Typography variant="h6" className="sub-title">Recent Transactions</Typography>
      <List>
        {expenses.map((expense, index) => (
          <ListItem key={index} className="list-item" secondaryAction={
            <>
              <IconButton onClick={() => handleEditExpense(index)}><Edit className="edit-icon" /></IconButton>
              <IconButton onClick={() => handleDeleteExpense(index)}><Delete className="delete-icon" /></IconButton>
            </>
          }>
            <ListItemText primary={`${expense.title} - ₹${expense.amount}`} secondary={`${expense.category}, ${expense.date}`} />
          </ListItem>
        ))}
      </List>

      {/* Charts */}
      <Typography variant="h6" className="sub-title">Top Expenses</Typography>
      <div className="chart-container">
        <Pie data={pieData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
        <Bar data={barData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
      </div>
    </Container>
  );
};

export default ExpenseTracker;

