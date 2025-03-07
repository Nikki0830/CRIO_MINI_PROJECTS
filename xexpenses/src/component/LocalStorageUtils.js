export const getStoredBalance = () => {
  const storedBalance = localStorage.getItem("walletBalance");

  // Check if storedBalance is null or invalid
  if (!storedBalance || storedBalance === "NaN") {
    localStorage.setItem("walletBalance", JSON.stringify(5000));
    return 5000;
  }

  try {
    const parsedBalance = JSON.parse(storedBalance);
    return typeof parsedBalance === "number" && !isNaN(parsedBalance)
      ? parsedBalance
      : 5000;
  } catch (error) {
    localStorage.setItem("walletBalance", JSON.stringify(5000));
    return 5000;
  }
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
