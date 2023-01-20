import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="hero">
        <img src={require("../assets/diary-hero-sketch.svg").default} alt="girl working on laptop" className="hero__img"/>
        <div className="hero__text-group">
          <h1 className="hero__title">Quick Lesson Planner</h1>
          <h3 className="hero__info">Effortlessly plan lessons with Quick Lesson Planner. Enter your ideas, get a complete plan in seconds. {<br/>} Start simplifying lesson planning today!</h3>
        </div>
      </div>
    </header>
  )
}