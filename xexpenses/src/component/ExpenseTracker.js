import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./Xexpense.css";

// Register necessary Chart.js elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(
    () => parseFloat(localStorage.getItem("walletBalance")) || 5000
  );
  const [expenses, setExpenses] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (
      !newExpense.title ||
      !amount ||
      !newExpense.category ||
      !newExpense.date
    ) {
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
    acc[expense.category] =
      (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(expenseCategories),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 3,
        textAlign: "center",
        minHeight: "100vh",
        bgcolor: "linear-gradient(to right, #141E30, #243B55)",
        color: "#fff",
      }}
    >
      {/* Wallet & Expenses Cards */}
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
        <Box
          sx={{
            bgcolor: "#3a3a3a",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: "40%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#00FF00", fontWeight: "bold" }}
          >
            Wallet Balance: ₹{balance}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#32CD32",
              "&:hover": { bgcolor: "#228B22" },
              mt: 2,
            }}
          >
            + Add Income
          </Button>
        </Box>

        <Box
          sx={{
            bgcolor: "#3a3a3a",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: "40%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#FFA500", fontWeight: "bold" }}
          >
            Expenses: ₹
            {expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0)}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FF4500",
              "&:hover": { bgcolor: "#B22222" },
              mt: 2,
            }}
          >
            + Add Expense
          </Button>
        </Box>
      </Box>

      {/* Recent Transactions */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "#FFD700" }}
      >
        Recent Transactions
      </Typography>
      <List sx={{ bgcolor: "#2E2E2E", borderRadius: 2, p: 2, boxShadow: 2 }}>
        {expenses.map((expense, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: "1px solid #555",
              "&:last-child": { borderBottom: "none" },
            }}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => handleEditExpense(index)}
                  sx={{ color: "#FFC107" }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteExpense(index)}
                  sx={{ color: "#DC3545" }}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${expense.title} - ₹${expense.amount}`}
              secondary={`${expense.category}, ${expense.date}`}
              sx={{ color: "#fff" }}
            />
          </ListItem>
        ))}
      </List>

      {/* Charts */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mt: 3, color: "#FFD700" }}
      >
        Expense Summary
      </Typography>
      <Box
        sx={{ bgcolor: "#2E2E2E", borderRadius: 2, p: 4, boxShadow: 2, mt: 1 }}
      >
        <Pie data={pieData} />
        {/* <Pie data={pieData} /> */}
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mt: 3, color: "#FFD700" }}
      >
        Top Expenses
      </Typography>
      <Box
        sx={{ bgcolor: "#2E2E2E", borderRadius: 2, p: 2, boxShadow: 2, mt: 1 }}
      >
        <Bar data={barData} />
      </Box>
    </Container>
  );
};

export default ExpenseTracker;
