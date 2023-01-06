// A react component that inputs a textarea message then performs a fetch request localhost:3001 gets back a response as a data.message and displays that message to a box below.
import React, { useState } from "react";

export default function Main() {
  // Initialize message and response states
  const [lessonFormData, setLessonFormData] = useState(
    {
      subject: "",
      length: "",
      topic: "",
      learningIntention: "",
      activities: ""
    }
  );
  const [response, setResponse] = useState("");

  // Function to call a fetch request when Submit button is clicked
  function handleSubmit(e) {
    e.preventDefault(); // this stops refreshing the page when button is clicked
    console.log("button clicked!")
    fetch("https://quicklessonplanner.netlify.app/.netlify/functions/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonFormData }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  }

  // Function to handle change in textarea
  function handleChange(e) {
    const {value} = e.target;
    setLessonFormData(value)
  }

  return (
    <section className="main">
      <h2>Create a Lesson Plan</h2>
      <form className="main__form" >
        <input 
          type="text"
          placeholder="Lesson Subject"
          onChange={handleChange}
          name="subject"
          value={lessonFormData.subject}
        />

        <label htmlFor="length">Lesson length:</label>
        
        <select 
            id="length" 
            value={lessonFormData.length}
            onChange={handleChange}
            name="length"
        >
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="60">60</option>
        </select>

        <input 
          type="text"
          placeholder="Lesson Topic"
          onChange={handleChange}
          name="topic"
          value={lessonFormData.topic}
        />
        <input 
          type="text"
          placeholder="Learning Intention  (optional)"
          onChange={handleChange}
          name="learningIntention"
          value={lessonFormData.learningIntention}
        />
        <br />
        <textarea
          className="form__textarea"
          placeholder="Enter activities"
          value={lessonFormData.activities}
          onChange={handleChange}
          
        />
        <button className="form__button" onClick={handleSubmit}>
          GENERATE LESSON PLAN
        </button>
      </form>

      <div>{response}</div>
    </section>
  );
}
