export const getStoredBalance = () => {
  const storedBalance = localStorage.getItem("walletBalance");
  return storedBalance ? parseFloat(storedBalance) || 0 : 0; // Ensures it's never NaN
};

export const getStoredExpenses = () => {
  try {
    const storedExpenses = localStorage.getItem("expenses");
    
    // ✅ Ensure expenses are always an array
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  } catch (error) {
    console.error("Error parsing expenses from localStorage:", error);
    
    // ✅ Fallback to an empty array
    return [];
  }
};

export const saveExpenses = (expenses) => {
  try {
    // ✅ Ensure we only save valid expense arrays
    if (Array.isArray(expenses)) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } else {
      console.error("Invalid expenses data:", expenses);
    }
  } catch (error) {
    console.error("Error saving expenses to localStorage:", error);
  }
};

export const saveBalance = (balance) => {
  try {
    if (typeof balance === "number" && !isNaN(balance)) {
      localStorage.setItem("walletBalance", JSON.stringify(balance));
    } else {
      console.error("Invalid balance data:", balance);
    }
  } catch (error) {
    console.error("Error saving balance to localStorage:", error);
  }
};

