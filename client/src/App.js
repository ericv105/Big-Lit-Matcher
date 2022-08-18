import React, { useState, useEffect, Fragment } from "react";
import MatrixForm from "./components/MatrixForm";
import Results from "./components/Results";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [greeting, setGreeting] = useState(null);
  const [matchings, setMatchings] = useState(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((greetingJSON) => setGreeting(greetingJSON.message));
  }, [greeting]);

  return (
    <Fragment>
      <div>
        <header>
          <p>{!greeting ? "Loading..." : greeting}</p>
        </header>
      </div>
      <MatrixForm setMatchings={setMatchings}/>
      <Results matchings={matchings}/>
    </Fragment>
  );
}

export default App;
