import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { SnackbarProvider, useSnackbar } from "notistack";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import { FaTrash } from "react-icons/fa";
import "./Styles.css";

Modal.setAppElement("#root");

const ExpenseTracker = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [walletBalance, setWalletBalance] = useState(() => parseFloat(localStorage.getItem("walletBalance")) || 5000);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem("expenses")) || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({ title: "", price: "", category: "", date: "" });

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!expenseData.title || !expenseData.price || !expenseData.category || !expenseData.date) {
      enqueueSnackbar("All fields are required!", { variant: "error" });
      return;
    }
    const price = parseFloat(expenseData.price);
    if (price > walletBalance) {
      enqueueSnackbar("Insufficient balance!", { variant: "error" });
      return;
    }
    setExpenses([...expenses, expenseData]);
    setWalletBalance(walletBalance - price);
    setExpenseData({ title: "", price: "", category: "", date: "" });
    setModalOpen(false);
  };

  const deleteExpense = (index) => {
    const deletedExpense = expenses[index];
    setWalletBalance(walletBalance + parseFloat(deletedExpense.price));
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleIncome = (e) => {
    e.preventDefault();
    const incomeAmount = parseFloat(e.target.income.value);
    if (!incomeAmount || incomeAmount <= 0) {
      enqueueSnackbar("Enter a valid income amount!", { variant: "error" });
      return;
    }
    setWalletBalance(walletBalance + incomeAmount);
    setIncomeModalOpen(false);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="container">
        <h1 data-testid="app-title">Expense Tracker</h1>
        <h2 data-testid="wallet-balance">Wallet Balance: ${walletBalance.toFixed(2)}</h2>
        <button data-testid="add-income-btn" onClick={() => setIncomeModalOpen(true)}>+ Add Income</button>
        <button data-testid="add-expense-btn" onClick={() => setModalOpen(true)}>+ Add Expense</button>
        
        <h2 data-testid="transactions-title">Transactions</h2>
        <ul data-testid="expense-list">
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <li key={index}>
                {expense.title} - ${expense.price} - {expense.category} - {expense.date}
                <FaTrash data-testid={`delete-expense-${index}`} onClick={() => deleteExpense(index)} />
              </li>
            ))
          ) : (
            <p>No transactions yet.</p>
          )}
        </ul>

        {modalOpen && (
          <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal">
            <h2>Add Expense</h2>
            <form onSubmit={addExpense}>
              <input data-testid="expense-title" name="title" placeholder="Expense Title" value={expenseData.title} onChange={(e) => setExpenseData({ ...expenseData, title: e.target.value })} />
              <input data-testid="expense-price" name="price" type="number" placeholder="Expense Amount" value={expenseData.price} onChange={(e) => setExpenseData({ ...expenseData, price: e.target.value })} />
              <select data-testid="expense-category" name="category" value={expenseData.category} onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <input data-testid="expense-date" name="date" type="date" value={expenseData.date} onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })} />
              <button data-testid="submit-expense" type="submit">Add Expense</button>
            </form>
          </Modal>
        )}

        <PieChart width={400} height={400}>
          <Pie data={expenses.map(expense => ({ ...expense, price: parseFloat(expense.price) || 0 }))} dataKey="price" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
        </PieChart>

        <BarChart width={400} height={300} data={expenses}>
          <XAxis dataKey="category" />
          <YAxis />
          <Legend />
          <Bar dataKey="price" fill="#82ca9d" />
        </BarChart>
      </div>
    </SnackbarProvider>
  );
};

export default ExpenseTracker;
