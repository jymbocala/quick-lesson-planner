// A react component that inputs a textarea message then performs a fetch request localhost:3001 gets back a response as a data.message and displays that message to a box below.

import React, { useState } from "react";

export default function Main() {
  // Initialize message and response states
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // Funtion to call a fetch request when Submit button is clicked
  function handleSubmit(e) {
    e.preventDefault(); // this stops refreshing the page when button is clicked
    console.log("button clicked!")
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  }

  // Function to handle change in textarea
  function handleChange(e) {
    const value = e.target.value;
    setMessage(value);
  }

  return (
    <section className="main">
      <form className="main__form">
        <textarea
          className="form__textarea"
          value={message}
          onChange={handleChange}
        />
        <button className="form__button" onClick={handleSubmit}>
          CREATE LESSON PLAN
        </button>
      </form>

      <div>{response}</div>
    </section>
  );
}
