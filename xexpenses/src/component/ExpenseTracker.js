import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Correct import
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Styles.css";

// Set the app element for accessibility
Modal.setAppElement("#root");

const ExpenseTracker = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Load wallet balance from local storage or set default to 5000
  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem("walletBalance")) || 5000;
  });

  // Load expenses from local storage
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (
      !expenseData.title ||
      !expenseData.price ||
      !expenseData.category ||
      !expenseData.date
    ) {
      enqueueSnackbar("All fields are required!", { variant: "error" });
      return;
    }
    const price = parseFloat(expenseData.price);
    if (price > walletBalance) {
      enqueueSnackbar("Insufficient balance!", { variant: "error" });
      return;
    }
    const updatedExpenses = [...expenses, expenseData];
    setExpenses(updatedExpenses);
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
        <h1>Expense Tracker</h1>
        <h2>Wallet Balance: ${walletBalance.toFixed(2)}</h2>
        <button type="button" onClick={() => setIncomeModalOpen(true)}>
          + Add Income
        </button>
        <button type="button" onClick={() => setModalOpen(true)}>
          + Add Expense
        </button>

        {/* Expense Modal */}
        {modalOpen && (
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            className="modal"
          >
            <h2>Add Expense</h2>
            <form onSubmit={addExpense}>
              <input
                name="title"
                placeholder="Expense Title"
                value={expenseData.title}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, title: e.target.value })
                }
              />
              <input
                name="price"
                type="number"
                placeholder="Expense Amount"
                value={expenseData.price}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, price: e.target.value })
                }
              />
              <select
                name="category"
                value={expenseData.category}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
              </select>
              <input
                name="date"
                type="date"
                value={expenseData.date}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, date: e.target.value })
                }
              />
              <button type="submit">Add Expense</button>
            </form>
          </Modal>
        )}

        {/* Income Modal */}
        {incomeModalOpen && (
          <Modal
            isOpen={incomeModalOpen}
            onRequestClose={() => setIncomeModalOpen(false)}
            className="modal"
          >
            <h2>Add Income</h2>
            <form onSubmit={handleIncome}>
              <input name="income" type="number" placeholder="Income Amount" />
              <button type="submit">Add Balance</button>
            </form>
          </Modal>
        )}

        {/* Expense List */}
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.title} - ${expense.price} - {expense.category} -{" "}
              {expense.date}
              <FaTrash onClick={() => deleteExpense(index)} />
            </li>
          ))}
        </ul>

        {/* Ensure prices are numbers before using in PieChart */}
        <PieChart width={400} height={400}>
          <Pie
            data={expenses.map((expense) => ({
              ...expense,
              price: parseFloat(expense.price) || 0, // Ensure price is a number
            }))}
            dataKey="price"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>

        {/* Bar Chart for Expense Trends */}
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
