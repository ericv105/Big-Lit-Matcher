import { Fragment, useState } from "react";

function Form() {
  const [prefs, setPrefs] = useState("");
  const [stableMatch, setStableMatch] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefs }),
    })
      .then((res) => res.json())
      .then((matchJSON) => setStableMatch(matchJSON.prefs));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Bigs' Preference Lists:
          <input
            type="text"
            value={prefs}
            onChange={(e) => setPrefs(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <h1>{stableMatch}</h1>
    </Fragment>
  );
}

export default Form;
