import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./styles/App.scss";
import "./styles/header.scss";
import "./styles/loader.scss";
import "./styles/footer.scss";
import "./styles/queries.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
