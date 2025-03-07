export const getStoredBalance = () => {
  const storedBalance = localStorage.getItem("walletBalance");
  return storedBalance ? parseFloat(storedBalance) : 5000;
};

export const getStoredExpenses = () => {
  return JSON.parse(localStorage.getItem("expenses")) || [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

export const saveBalance = (balance) => {
  localStorage.setItem("walletBalance", balance);
};

