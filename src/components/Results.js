import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Results(props) {
  const [lessonPlanText] = useState(props.response);
  console.log("generated lesson plan text", lessonPlanText);

  const isGenerated = props.response === "" ? false : true
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={isGenerated}
      timeout={3000}
      classNames="animate-results"
      appear={true}
    >
      <section className="results" ref={nodeRef}>
        <div className="results__render">
          <h2>Lesson Plan</h2>
          <p>{lessonPlanText}</p>
        </div>
      </section>
    </CSSTransition>
  );
}
