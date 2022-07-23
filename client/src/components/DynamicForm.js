import { Fragment, useState } from "react";

function DynamicForm() {
  const [inputFields, setInputFields] = useState([
    { name: "", pref1: "", pref2: "", pref3: "" },
  ]);
  const [bigPrefs, setBigPrefs] = useState("");
  const [litPrefs, setLitPrefs] = useState("");
  const [stableMatch, setStableMatch] = useState({
    bigMatch: "",
    litMatch: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bigPrefs, litPrefs }),
    })
      .then((res) => res.json())
      .then((matchJSON) =>
        setStableMatch({
          bigMatch: matchJSON.bigPrefs,
          litMatch: matchJSON.litPrefs,
        })
      );
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        {inputFields.map((input, index) => {
          return(
            <div key={index}>
              <input
                name="bigname"
                placeholder="Name"
                value={input.name}
              />
              <input
                name="pref1"
                placeholder="Pref 1"
                value={input.pref1}
              />
              <input
                name="pref2"
                placeholder="Pref 2"
                value={input.pref2}
              />
              <input
                name="pref3"
                placeholder="Pref 3"
                value={input.pref3}
              />
            </div>
          )
        })}
      </form>
      <h1>{stableMatch.bigMatch}</h1>
      <h1>{stableMatch.litMatch}</h1>
    </Fragment>
  );
}

export default DynamicForm;
