import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import WalletBalance from "./component/WalletBalance";
import ExpenseForm from "./component/ExpenseForm";
import ExpenseList from "./component/ExpenseList";
import ExpenseSummary from "./component/ExpenseSummary";
import ExpenseTrends from "./component/ExpenseTrends";
import { getStoredExpenses, getStoredBalance, saveExpenses, saveBalance } from "./component/LocalStorageUtils";
import "./component/Styles.css"

const App = () => {
  const [walletBalance, setWalletBalance] = useState(() => {
    const storedBalance = getStoredBalance();
    return isNaN(storedBalance) ? 5000 : storedBalance;
  });
  
  const [expenses, setExpenses] = useState(() => {
    return getStoredExpenses() || [];
  });

  useEffect(() => {
    saveExpenses(expenses);
    saveBalance(walletBalance);
  }, [expenses, walletBalance]);

  const addIncome = (amount) => {
    setWalletBalance((prev) => prev + amount);
  };

  const addExpense = (expense) => {
    if (walletBalance >= expense.price) {
      setExpenses([...expenses, expense]);
      setWalletBalance((prev) => prev - expense.price);
    } else {
      alert("Insufficient balance!");
    }
  };

  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const deletedExpense = expenses.find((exp) => exp.id === id);
    if (deletedExpense) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
      setWalletBalance((prev) => prev + deletedExpense.price);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">Expense Tracker</Typography>
      <WalletBalance balance={walletBalance} onAddIncome={addIncome} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList expenses={expenses} onEditExpense={editExpense} onDeleteExpense={deleteExpense} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseSummary expenses={expenses} />
          <ExpenseTrends expenses={expenses} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
