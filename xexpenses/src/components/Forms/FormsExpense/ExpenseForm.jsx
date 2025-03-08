import styles from "./ExpenseForm.module.css";
import Button from "../../Button/Button.jsx";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

export default function ExpenseForm({
  setIsOpen,
  expenseList,
  setExpenseList,
  editId,
  setBalance,
  balance,
}) {
  const initFormData = editId
    ? expenseList.find((item) => item.id == editId)
    : {
        title: "",
        category: "",
        price: "",
        date: "",
      };
  const [formData, setFormData] = useState(initFormData);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
  
    const { title, category, price, date } = formData;
  
    // Validation: Ensure all fields are filled
    if (!title.trim() || !category || !price || !date) {
      enqueueSnackbar("All fields are required!", { variant: "error" });
      return;
    }
  
    // Check if the expense exceeds the available balance
    if (balance < Number(price)) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      return;
    }
  
    // Deduct balance
    setBalance((prev) => prev - Number(price));
  
    // Generate unique ID (get max ID and add 1)
    const lastId = Array.isArray(expenseList) && expenseList.length > 0
    ? Math.max(...expenseList.map((item) => item.id)) 
    : 0;
  
    // Update Expense List
    setExpenseList((prev) => [{ ...formData, id: lastId + 1 }, ...prev]);
  
    // Reset form
    setFormData({ title: "", category: "", price: "", date: "" });
  
    // Close modal
    setIsOpen(false);
  };
  

  const handleEdit = (e) => {
    e.preventDefault();

    const updated = expenseList.map((item) => {
      if (item.id == editId) {
        const priceDifference = item.price - Number(formData.price);

        if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
          enqueueSnackbar("Price should not exceed the wallet balance", {
            variant: "warning",
          });
          setIsOpen(false);
          return { ...item };
        }

        setBalance((prev) => prev + priceDifference);
        return { ...formData, id: editId };
      } else {
        return item;
      }
    });

    setExpenseList(updated);

    setIsOpen(false);
  };

  // useEffect(() => {

  //     if (editId) {
  //         const expenseData = expenseList.find(item => item.id == editId)

  //         setFormData({
  //             title: expenseData.title,
  //             category: expenseData.category,
  //             price: expenseData.price,
  //             date: expenseData.date
  //         })

  //     }

  // }, [editId])

  return (
    <div className={styles.formWrapper}>
      <h3>{editId ? "Edit Expense" : "Add Expenses"}</h3>
      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Button type="submit" style="primary" shadow>
          {editId ? "Edit Expense" : "Add Expense"}
        </Button>

        <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
}
