import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography, IconButton } from "@mui/material";
import { ThumbUp, ThumbDown, Star } from "@mui/icons-material";
// import "./App.css";

const sampleData = {
  "hi": "Hello! How can I assist you today?",
  "weather": "The weather is sunny with a high of 32°C.",
  "default": "Sorry, Did not understand your query!"
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
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
      <Card className="chat-box">
        <CardContent>
          <Typography variant="h5">Chat with Bot AI</Typography>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                <Typography><span>{msg.sender === "bot" ? "Soul AI:" : "You:"}</span> {msg.text}</Typography>
                {msg.sender === "bot" && (
                  <div className="feedback-buttons">
                    <IconButton onClick={() => handleFeedback(index, "like")}>
                      <ThumbUp color={feedback[index] === "like" ? "primary" : "inherit"} />
                    </IconButton>
                    <IconButton onClick={() => handleFeedback(index, "dislike")}>
                      <ThumbDown color={feedback[index] === "dislike" ? "error" : "inherit"} />
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
          <Button variant="contained" color="primary" onClick={handleSendMessage} type="submit">Ask</Button>
        </CardContent>
      </Card>
      <Card className="feedback-box">
        <CardContent>
          <Typography variant="h6">Rate the Conversation</Typography>
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
          <Button variant="contained" color="secondary" type="button">Save</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
