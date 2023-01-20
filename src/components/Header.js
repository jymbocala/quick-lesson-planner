import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="hero">
        <img src={require("../assets/diary-hero-sketch.svg").default} alt="girl working on laptop" className="hero__img"/>
        <div className="hero__text-group">
          <h1 className="hero__title">Quick Lesson Planner</h1>
          <h3 className="hero__info">Welcome to Quick Lesson Planner, the web app that helps teachers save time on lesson planning. Simply add your ideas and activities and we'll generate a complete lesson plan for you. Try Quick Lesson Planner and see how much time you can save!</h3>
        </div>
      </div>
    </header>
  )
}