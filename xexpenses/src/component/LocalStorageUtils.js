export const getStoredBalance = () => {
  const storedBalance = localStorage.getItem("walletBalance");
  return storedBalance ? parseFloat(storedBalance) || 0 : 0; // Ensures it's never NaN
};
export const getStoredExpenses = () => {
  const storedExpenses = localStorage.getItem("expenses");

  if (!storedExpenses) {
    localStorage.setItem("expenses", JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(storedExpenses);
  } catch (error) {
    localStorage.setItem("expenses", JSON.stringify([]));
    return [];
  }
};

export const saveExpenses = (expenses) =>
  localStorage.setItem("expenses", JSON.stringify(expenses));
export const saveBalance = (balance) =>
  localStorage.setItem("walletBalance", JSON.stringify(balance));
