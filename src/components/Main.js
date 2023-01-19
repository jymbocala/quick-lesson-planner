import React, { useState } from "react";
import Results from "./Results";
import Loader from "./Loader";

export default function Main() {
  // Initialize message and response states
  const [lessonFormData, setLessonFormData] = useState({
    subject: "",
    level: "Year 10 (students aged 15 to 16)",
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
    fetch("https://quicklessonplanner.netlify.app/.netlify/functions/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
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
      <div className="main-container">
        <form className="main__form">
          <h2>Create a Lesson Plan</h2>

          <p className="form__instruction-text">
            1. Add lesson subject and length.
          </p>
          <div className="form__subject-container">
            <input
              type="text"
              placeholder={`Example: "Business Management"`}
              onChange={handleChange}
              name="subject"
              value={lessonFormData.subject}
            />

            <div className="form_level">
              <label>Level: </label>
              <select
                id="level"
                value={lessonFormData.level}
                onChange={handleChange}
                name="level"
              >
                <option value="Grade 1 (students aged 6 to 7)">Grade 1</option>
                <option value="Grade 2 (students aged 7 to 8)">Grade 2</option>
                <option value="Grade 3 (students aged 8 to 9)">Grade 3</option>
                <option value="Grade 4 (students aged 9 to 10)">Grade 4</option>
                <option value="Grade 5 (students aged 10 to 11)">Grade 5</option>
                <option value="Grade 6 (students aged 11 to 12)">Grade 6</option>
                <option value="Year 7 (students aged 12 to 13)">Year 7</option>
                <option value="Year 8 (students aged 13 to 14)">Year 8</option>
                <option value="Year 9 (students aged 14 to 15)">Year 9</option>
                <option value="Year 10 (students aged 15 to 16)">Year 10</option>
                <option value="Year 11 (students aged 16 to 17)">Year 11</option>
                <option value="Year 12 (students aged 17 to 18)">Year 12</option>
              </select>
            </div>
            
            <div className="form_length">
              {/* <label htmlFor="length">Lesson length: </label> */}
              <label>Length: </label>
              <select
                id="length"
                value={lessonFormData.length}
                onChange={handleChange}
                name="length"
              >
                <option value="30">30 min.</option>
                <option value="35">35 min.</option>
                <option value="40">40 min.</option>
                <option value="45">45 min.</option>
                <option value="50">50 min.</option>
                <option value="55">55 min.</option>
                <option value="60">60 min.</option>
                <option value="65">65 min.</option>
                <option value="70">70 min.</option>
              </select>
              
            </div>
          </div>

          <p className="form__instruction-text">
            2. Add main topic of the lesson and the learning intention.
          </p>
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

          <p className="form__instruction-text">
            3. Add some ideas/activities for the lesson. The more detail you add
            - the better!
          </p>
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
      </div>
    </section>
  );
}
