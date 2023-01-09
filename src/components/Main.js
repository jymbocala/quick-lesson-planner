import React, { useState } from "react";
import Results from "./Results";
import Loader from "./Loader";

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
  // isLoading state to help with conditional rendering of a Loading component or the data received from the fetch call
  const [isLoading, setIsLoading] = useState(false);

  // Function to call a fetch request when Submit button is clicked
  function handleSubmit(e) {
    e.preventDefault(); // this stops refreshing the page when button is clicked

    console.log("button clicked!");
    setIsLoading(true);
    // Netlify serverless function endpoint
    // dev http://localhost:8888/.netlify/functions/index
    // prod https://quicklessonplanner.netlify.app/.netlify/functions/index
    fetch("https://quicklessonplanner.netlify.app/.netlify/functions/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        // configure data so that "\n" renders as a new line
        const adjustedMesssage = data.message;
        setResponse(adjustedMesssage);
        setIsLoading(false);
      });
  }

  // Function to handle change in textarea
  function handleChange(e) {
    // desctructured obj properties needed
    const { name, value, type, checked } = e.target;
    setLessonFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    console.log(lessonFormData);
  }

  //function to either render nothing, a loading component, or the results from the API call.
  function handleDisplayRender() {


    if (!isLoading && response === "") {
      return <></>;
    } else if (isLoading) {
      return <Loader />;
    } else if (!isLoading) {
      return <Results response={response} />;
    }
  }

  return (
    <section className="main">
      <h2>Create a Lesson Plan</h2>
      {/* TODO: add instructions in between the form input */}
      <form className="main__form">
        <p className="form__instruction-text">1. Add lesson subject and length.</p>
        <input
          type="text"
          placeholder={`Example: "Business Management"`}
          onChange={handleChange}
          name="subject"
          value={lessonFormData.subject}
        />
        {/* TODO: update "length" naming to avoid potential bugs */}
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
            <option value="65">65</option>
            <option value="70">70</option>
          </select>
          <label>minutes</label>
        </div>
        <p className="form__instruction-text">2. Add main topic of the lesson and the learning intention.</p>
        <input
          type="text"
          placeholder={`Lesson Topic example: "Motivational Theories"`}
          onChange={handleChange}
          name="topic"
          value={lessonFormData.topic}
        />
        <input
          type="text"
          placeholder={`Lesson Intention example: "Analyse how Maslow's Hierarchy of Needs can be used to motivate employees."`}
          onChange={handleChange}
          name="learningIntention"
          value={lessonFormData.learningIntention}
        />
        <br />
        <p className="form__instruction-text">3. Add some ideas/activities for the lesson. The more detail you add - the better!</p>
        <textarea
          placeholder={`Example (feel free to add dot points!): \n - 5-minute video to introduce the topic. \n - Research task where students work in pairs. \n - Discussion`}
          value={lessonFormData.activities}
          onChange={handleChange}
          name="activities"
        />
        <button className="form__button" onClick={handleSubmit}>
          GENERATE LESSON PLAN
        </button>
      </form>

      {/* call handleDisplayRender when app first renders */}
      {handleDisplayRender()}
    </section>
  );
}
