import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <DateCounter />
    </div>
  );
}

function DateCounter() {
  const [step, setStep] = useState(0);
  const [gap, setGap] = useState(0);
  const today = new Date();
  let currentDate = new Date();
  let [message, setMessage] = useState(
    `Today is ${currentDate.toDateString()}`
  );

  function handleStepDown() {
    if (step > 0) setStep((s) => s - 1);
  }
  function handleStepUp() {
    setStep((s) => s + 1);
  }

  function updateMessage(interval) {
    console.log(interval);
    console.log(currentDate.toDateString());
    if (interval === 0) {
      setMessage(`Today is ${currentDate.toDateString()}`);
    } else {
      setMessage(
        `${interval} Days from today will be ${currentDate.toDateString()}`
      );
    }
  }

  function handleGapDown() {
    if (gap - step > 0) {
      setGap((g) => g - step);
      currentDate.setDate(today.getDate() + gap);
      updateMessage(gap - step);
    } else {
      currentDate.setDate(today.getDate());
      updateMessage(0);
      setGap(0);
    }
  }

  function handleGapUp() {
    currentDate.setDate(today.getDate() + gap);
    updateMessage(gap + step);
    setGap((g) => g + step);
  }

  function handleReset() {
    setGap(0);
    setStep(0);
    updateMessage(0);
  }
  function handleChange(e) {
    setStep(parseInt(e.target.value));
  }

  function handleInput(e) {
    const g = parseInt(e.target.value);
    setGap(g);
    updateMessage(g);
  }

  return (
    <>
      <div style={{ display: "flex", gap: "12px" }}>
        <input
          type="range"
          min="0"
          max="10"
          onChange={handleChange}
          value={step}
        />{" "}
        <button onClick={handleStepDown}>Step - 1</button>
        <p>Current Step: {step}</p>
        <button onClick={handleStepUp}>Step + 1</button>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={handleGapDown}>Gap -</button>
        <input
          type="text"
          placeholder={gap}
          value={gap}
          onChange={handleInput}
        ></input>
        {/* <p>Current Gap: {gap}</p> */}
        <button onClick={handleGapUp}>Gap +</button>
      </div>

      <p>{message}</p>

      {gap || step ? <button onClick={handleReset}>RESET</button> : null}
    </>
  );
}

export default App;
