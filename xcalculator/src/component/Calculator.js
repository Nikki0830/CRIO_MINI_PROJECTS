import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleCalculate = () => {
    if (!expression) {
      setResult("Error");
      return;
    }

    try {
      const evaluatedResult = eval(expression);
      setResult(
        evaluatedResult === Infinity
          ? "Infinity"
          : isNaN(evaluatedResult)
          ? "NaN"
          : evaluatedResult
      );
    } catch {
      setResult("Error");
    }
  };

  return (
    <div>
      <div className="calculator">
        <input type="text" value={expression} readOnly />
        <div className="result">{result}</div>

        <div className="buttons">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map(
            (btn) => (
              <button
                key={btn}
                onClick={() =>
                  btn === "=" ? handleCalculate() : btn === "C" ? handleClear() : handleClick(btn)
                }
              >
                {btn}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
