// A react component that inputs a textarea message then performs a fetch request localhost:3001 gets back a response as a data.message and displays that message to a box below.
import React, { useState } from "react";
import Results from "./Results"

export default function Main() {
  // Initialize message and response states
  const [lessonFormData, setLessonFormData] = useState({
    subject: "",
    length: 50,
    topic: "",
    learningIntention: "",
    activities: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to call a fetch request when Submit button is clicked
  function handleSubmit(e) {
    e.preventDefault(); // this stops refreshing the page when button is clicked
    console.log("button clicked!");
    setIsLoading(true);
    fetch("https://quicklessonplanner.netlify.app/.netlify/functions/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(data.message);
        setIsLoading(false);
      });
  }

  // Function to handle change in textarea
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setLessonFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    console.log(lessonFormData);
  }

  return (
    <section className="main">
      <h2>Create a Lesson Plan</h2>
      <form className="main__form">
        <input
          type="text"
          placeholder="Lesson Subject"
          onChange={handleChange}
          name="subject"
          value={lessonFormData.subject}
        />

        <div className="form_length">
          <label htmlFor="length">Lesson length: </label>
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
          <label>minutes</label>
        </div>

        <input
          type="text"
          placeholder="Lesson Topic"
          onChange={handleChange}
          name="topic"
          value={lessonFormData.topic}
        />
        <input
          type="text"
          placeholder="Learning Intention"
          onChange={handleChange}
          name="learningIntention"
          value={lessonFormData.learningIntention}
        />
        <br />
        <textarea
          placeholder="Enter activities"
          value={lessonFormData.activities}
          onChange={handleChange}
          name="activities"
        />
        <button className="form__button" onClick={handleSubmit}>
          GENERATE LESSON PLAN
        </button>
      </form>

      { isLoading ? 
        <div>Loading...</div> :

        <Results 
          response={response}
        />
      }
      
    </section>
  );
}
