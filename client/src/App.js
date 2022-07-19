import React, { useState, useEffect, Fragment } from "react";
import Form from "./components/Form";

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
      <div>
        <Form />
      </div>
    </Fragment>
  );
}

export default App;
