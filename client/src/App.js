import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberForm from "./components/MemberForm";
import Preference from "./components/Preference";
import Results from "./components/Results";
function App() {
  const [bigs, setBigs] = useState(["B1", "B2", "B3"]);
  const [lits, setLits] = useState(["L1", "L2", "L3"]);
  const [memToName, setMemToName] = useState({});
  const [matchings, setMatchings] = useState([]);
  const [allPrefs, setAllPrefs] = useState({
    bigPrefs: {
      B1: ["L1", "L2", "L3"],
      B2: ["L1", "L2", "L3"],
      B3: ["L1", "L2", "L3"],
    },
    litPrefs: {
      L1: ["B1", "B2", "B3"],
      L2: ["B1", "B2", "B3"],
      L3: ["B1", "B2", "B3"],
    },
  });
  useEffect(() => {
    // update prefs on every add/del of members
    var bp = {};
    for (let i = 0; i < bigs.length; i++) {
      bp[bigs[i]] = lits;
    }
    var lp = {};
    for (let i = 0; i < lits.length; i++) {
      lp[lits[i]] = bigs;
    }
    setAllPrefs({ bigPrefs: bp, litPrefs: lp });
  }, [bigs, lits]);
  const getName = (val) => {
    if (val in memToName) {
      return memToName[val];
    }
    if (val.substring(0, 1) === "B") {
      return "Big " + val.substring(1);
    } else if (val.substring(0, 1) === "L") {
      return "Little " + val.substring(1);
    }
    return val;
  };
  const handleSubmit = () => {
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allPrefs),
    })
      .then((res) => res.json())
      .then((matchJSON) => setMatchings(matchJSON));
  };
  return (
    <div style={{ margin: "50px 5%" }}>
      <MemberForm
        memberType="Bigs"
        getName={getName}
        members={bigs}
        setMembers={setBigs}
        memToName={memToName}
        setMem={setMemToName}
      />
      <MemberForm
        memberType="Littles"
        getName={getName}
        members={lits}
        setMembers={setLits}
        memToName={memToName}
        setMem={setMemToName}
      />
      <hr />
      {/* {console.log(allPrefs)} */}
      <Row>
        <Col>
          <Preference
            prefType={"bigPrefs"}
            getName={getName}
            allPrefs={allPrefs}
            setAllPrefs={setAllPrefs}
          />
        </Col>
        <Col>
          <Preference
            prefType={"litPrefs"}
            getName={getName}
            allPrefs={allPrefs}
            setAllPrefs={setAllPrefs}
          />
        </Col>
      </Row>
      <hr />
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Get All Matchings!
        </Button>
      </div>
      <br />
      <Results getName={getName} matchings={matchings} />
    </div>
  );
}

export default App;
