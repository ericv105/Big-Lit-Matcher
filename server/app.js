const util = require('./services/MatrixFormParser')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api", (req, res) => {
  var prefsObject = req.body;
  // prefs object multipart => stable matching algorithm => stable matches
  util.allStableMatchings(prefsObject)
  res.json(prefsObject);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
