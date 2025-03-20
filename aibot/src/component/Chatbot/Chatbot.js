import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Chatbot.css"; // Add styles if needed

const sampleData = {
  "hi": "Hello! How can I assist you today?",
  "weather": "The weather is sunny with a high of 32°C.",
  "time": "The current time is 10:00 AM.",
  "date": "Today's date is March 20, 2025.",
  "bye": "Goodbye! Have a great day!",
  "default": "Sorry, Did not understand your query!"
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

  const handleSaveFeedback = () => {
    console.log("Feedback saved:", { rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="chat-container">
      <Link to="/history">View History</Link>
      <div className="chat-box">
        <h5>Chat with Bot AI</h5>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender}>
              <p><span>{msg.sender === "bot" ? "Soul AI:" : "You:"}</span> {msg.text}</p>
              {msg.sender === "bot" && (
                <div className="feedback-buttons">
                  <button onClick={() => handleFeedback(index, "like")}>👍</button>
                  <button onClick={() => handleFeedback(index, "dislike")}>👎</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Message Bot AI…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage} type="submit">Ask</button>
      </div>
      <div className="feedback-box">
        <h6>Rate the Conversation</h6>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} onClick={() => setRating(num)}>
              {rating >= num ? "⭐" : "☆"}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Provide additional feedback"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="button" onClick={handleSaveFeedback}>Save</button>
      </div>
    </div>
  );
};

export default Chatbot;

// History Component inside the same file
export const History = () => {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  return (
    <div className="history-container">
      <h5>Conversation History</h5>
      {history.map((msg, index) => (
        <p key={index}><span>{msg.sender === "bot" ? "Soul AI:" : "You:"}</span> {msg.text}</p>
      ))}
      <Link to="/">Back to Chat</Link>
    </div>
  );
};



