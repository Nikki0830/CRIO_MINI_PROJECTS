import { useEffect, useState, useCallback } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import TransactionList from "../../components/TransactionList/TransactionList";
import ExpenseForm from "../../components/Forms/FormsExpense/ExpenseForm";
import Modal from "../../components/Modal/Modal";
import AddBalanceForm from "../../components/Forms/FormsAddBalance/AddBalanceForm";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/ChartBar/ChartBar";

// Custom Hook: Sync state with localStorage
const useLocalStorage = (key, initialValue) => {
  const [strVal, setStrVal] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error loading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(strVal));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, strVal]);

  return [strVal ?? initialValue, setStrVal]; // Ensure it always returns an array
};


// Function to categorize expenses
const calculateCatList = (expList) => {
  return expList.reduce(
    (acc, item) => {
      acc.spends[item.category] =
        (acc.spends[item.category] || 0) + Number(item.price);
      return acc;
    },
    {
      spends: { food: 0, entertainment: 0, travel: 0 },
    }
  );
};

export default function Home() {
  const [balance, setBalance] = useLocalStorage("balance", 5000);
  const [expList, setExpList] = useLocalStorage("expenses", []);

  // Show/hide modals
  const [isOpnExp, setIsOpnExp] = useState(false);
  const [isOpnBal, setIsOpnBal] = useState(false);

  const { spends: catSpends } = calculateCatList(expList);

  const expense = expList.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleAddIncome = useCallback(() => {
    setIsOpnBal(true);
  }, []);

  const handleAddExpense = useCallback(() => {
    setIsOpnExp(false); // Close modal first
    setTimeout(() => setIsOpnExp(true), 50); // Ensure state change triggers re-render
  }, []);

  useEffect(() => {
    console.log("Expense List Updated:", expList);
  }, [expList]);

  useEffect(() => {
    console.log("Balance Updated:", balance);
  }, [balance]);

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>

      {/* Cards and pie chart wrapper */}
      <div className={styles.cardsWrapper}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={handleAddIncome}
        />

        <Card
          title="Expenses"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={handleAddExpense}
        />

        <PieChart
          data={[
            { name: "Food", value: catSpends.food },
            { name: "Entertainment", value: catSpends.entertainment },
            { name: "Travel", value: catSpends.travel },
          ]}
        />
      </div>

      {/* Transactions and bar chart wrapper */}
      <div className={styles.transactionsWrapper}>
        <TransactionList
          transactions={expList}
          editTransactions={(newTransactions) =>
            setExpList([...newTransactions])
          } // Ensure a new reference
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />

        <BarChart
          data={[
            { name: "Food", value: catSpends.food },
            { name: "Entertainment", value: catSpends.entertainment },
            { name: "Travel", value: catSpends.travel },
          ]}
        />
      </div>

      {/* Modals */}
      <Modal isOpen={isOpnExp} setIsOpen={setIsOpnExp}>
        <ExpenseForm
          setIsOpen={setIsOpnExp}
          expenseList={expList || []} // Now it matches ExpenseForm props
          setExpenseList={setExpList} // Fix: Change "setExpList" to "setExpenseList"
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isOpnBal} setIsOpen={setIsOpnBal}>
        <AddBalanceForm setIsOpen={setIsOpnBal} setBalance={setBalance} />
      </Modal>
    </div>
  );
}
