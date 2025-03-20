import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ThumbUp, ThumbDown, Star } from "@mui/icons-material";
// import "./Chatbot.css";

const sampleData = {
  hi: "Hello! How can I assist you today?",
  hello: "Hey there! How can I help you?",
  weather: "The weather is sunny with a high of 32°C.",
  time: "The current time depends on your timezone. Please check your device clock!",
  date: "Today's date is dynamically set based on your system settings.",
  name: "I am Soul AI, your virtual assistant.",
  "who are you": "I am an AI chatbot created to assist you!",
  help: "Sure! Ask me anything, and I'll do my best to assist you.",
  bye: "Goodbye! Have a great day ahead!",
  thanks: "You're welcome! Let me know if you need more help.",
  default: "Sorry, Did not understand your query!",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botResponse = sampleData[input.toLowerCase()] || sampleData.default;
    const botMessage = { sender: "bot", text: botResponse };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const handleFeedback = (index, type) => {
    setFeedback({ ...feedback, [index]: type });
  };

  return (
    <div className="chat-container">
      <Link to="/history">View History</Link>
      <Card className="chat-box">
        <CardContent>
          <h5>Chat with Bot AI</h5>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                <p>
                  <span>{msg.sender === "bot" ? "Soul AI:" : "You:"}</span>{" "}
                  {msg.text}
                </p>
                {msg.sender === "bot" && (
                  <div className="feedback-buttons">
                    <IconButton onClick={() => handleFeedback(index, "like")}>
                      <ThumbUp
                        color={
                          feedback[index] === "like" ? "primary" : "inherit"
                        }
                      />
                    </IconButton>
                    <IconButton
                      onClick={() => handleFeedback(index, "dislike")}
                    >
                      <ThumbDown
                        color={
                          feedback[index] === "dislike" ? "error" : "inherit"
                        }
                      />
                    </IconButton>
                  </div>
                )}
              </div>
            ))}
          </div>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            type="submit"
          >
            Ask
          </Button>
        </CardContent>
      </Card>
      <Card className="feedback-box">
        <CardContent>
          <h6>Rate the Conversation</h6>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <IconButton key={num} onClick={() => setRating(num)}>
                <Star color={rating >= num ? "primary" : "inherit"} />
              </IconButton>
            ))}
          </div>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Provide additional feedback"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" color="secondary" type="button">
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const History = () => {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  return (
    <div className="history-container">
      <h5>Conversation History</h5>
      {history.map((msg, index) => (
        <p key={index}>
          <span>{msg.sender === "bot" ? "Soul AI:" : "You:"}</span> {msg.text}
        </p>
      ))}
      <Link to="/">Back to Chat</Link>
    </div>
  );
};

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
