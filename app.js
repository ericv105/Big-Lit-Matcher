const util = require('./services/MatrixFormParser')
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api", (req, res) => {
  var prefsObject = req.body;
  // console.log(prefsObject)
  // prefs object multipart => stable matching algorithm => stable matches
  res.json(util.getAllStableMatchings(prefsObject));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
