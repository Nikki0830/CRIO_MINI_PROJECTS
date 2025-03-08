import React, { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div
      className="counter_div"
      style={{ textAlign: "center", marginTop: "20px" }}
    >
      <h1>Counter App</h1>
      <h4>Count {count}</h4>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
