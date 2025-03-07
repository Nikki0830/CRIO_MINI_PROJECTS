import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const ExpenseSummary = ({ expenses }) => {
  const categories = ["Food", "Entertainment", "Travel"];
  const data = categories.map((cat, index) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.price, 0),
    color: COLORS[index],
  }));

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">Expense Summary</Typography>
        <PieChart width={300} height={200}>
          <Pie data={data} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
