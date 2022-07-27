import React, { useState, useEffect, Fragment } from "react";
import MatrixForm from "./components/MatrixForm";

function App() {
  const [greeting, setGreeting] = useState(null);
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
      <MatrixForm />
    </Fragment>
  );
}

export default App;
