import React, { useState } from "react";
import Results from "./Results";
import Loader from "./Loader";

export default function Main() {
  const [lessonFormData, setLessonFormData] = useState({
    subject: "",
    level: "Year 10 (students aged 15 to 16)",
    lessonLength: 50,
    topic: "",
    activities: "",
  });
  const [response, setResponse] = useState("");
  // isLoading state to help with conditional rendering of a Loading component or the data received from the fetch call
  const [isLoading, setIsLoading] = useState(false);

  const buttonText =
    response === "" ? "GENERATE LESSON PLAN" : "REGENERATE LESSON PLAN";

  // Function to call a fetch request when Submit button is clicked
  function handleSubmit(e) {
    e.preventDefault(); // this stops refreshing the page when clicked
    setIsLoading(true);
    // Netlify serverless function endpoint
    fetch("https://quicklessonplanner.com/.netlify/functions/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        console.log("data.message from fetch call", data.message);
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
      return <Loader isLoading={isLoading} response={response} />;
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
              <label htmlFor="level">Level: </label>
              <select
                id="level"
                value={lessonFormData.level}
                onChange={handleChange}
                name="level"
              >
                <option value="Highschool (Junior Level) Teacher">
                  Highschool: Junior
                </option>
                <option value="Highschool (Senior Level) Teacher">
                  Highschool: Senior
                </option>
              </select>
            </div>

            <div className="form_length">
              <label htmlFor="lessonLength">Length: </label>
              <select
                id="lessonLength"
                value={lessonFormData.lessonLength}
                onChange={handleChange}
                name="lessonLength"
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
            2. Add a topic for the lesson.
          </p>
          <input
            type="text"
            placeholder={`Lesson Topic example: "Motivational Theories"`}
            onChange={handleChange}
            name="topic"
            value={lessonFormData.topic}
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
            {buttonText}
          </button>
        </form>

        {/* call handleDisplayRender when app first renders */}
        {handleDisplayRender()}
      </div>
    </section>
  );
}
