import { Fragment, useState } from "react";

function Form() {
  const [bigPrefs, setBigPrefs] = useState("");
  const [litPrefs, setLitPrefs] = useState("");
  const [stableMatch, setStableMatch] = useState({bigMatch: "", litMatch: ""});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bigPrefs, litPrefs }),
    })
      .then((res) => res.json())
      .then((matchJSON) => setStableMatch({bigMatch: matchJSON.bigPrefs, litMatch: matchJSON.litPrefs}));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Bigs' Preference List:
          <br/>
          <textarea
            type="textarea"
            value={bigPrefs}
            onChange={(e) => setBigPrefs(e.target.value)}
          />
        </label>
        <br />
        <label>
          Littles' Preference List:
          <br/>
          <textarea
            type="textarea"
            value={litPrefs}
            onChange={(e) => setLitPrefs(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
      <h1>{stableMatch.bigMatch}</h1>
      <h1>{stableMatch.litMatch}</h1>

    </Fragment>
  );
}

export default Form;
