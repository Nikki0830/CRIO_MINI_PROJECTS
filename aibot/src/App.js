import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot, { History } from "./component/Chatbot/Chatbot";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;


