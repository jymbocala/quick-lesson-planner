import React, {useState} from "react"

export default function Results(props) {
  const [lessonPlanText] = useState(props.response)

  return (
    <section className="results">
      <div className="results__render">
        <h2>Lesson Plan</h2>
        <p>{lessonPlanText}</p>
      </div>
    </section>
  )
}