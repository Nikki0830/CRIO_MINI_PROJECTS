import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ExpenseTrends = ({ expenses }) => {
  const categories = ["Food", "Entertainment", "Travel"];
  const data = categories.map((cat) => ({
    category: cat,
    amount: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.price, 0),
  }));

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">Expense Trends</Typography>
        <BarChart width={300} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default ExpenseTrends;
