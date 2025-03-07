import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">Recent Transactions</Typography>
        {expenses.length === 0 ? (
          <Typography>No expenses recorded.</Typography>
        ) : (
          expenses.map((expense) => (
            <Card key={expense.id} sx={{ mb: 2, p: 1 }}>
              <CardContent>
                <Typography>{expense.title} - ₹{expense.price} ({expense.category})</Typography>
                <Typography variant="caption">{expense.date}</Typography>
                <Button color="primary" onClick={() => onEditExpense(expense)}>Edit</Button>
                <Button color="secondary" onClick={() => onDeleteExpense(expense.id)}>Delete</Button>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
