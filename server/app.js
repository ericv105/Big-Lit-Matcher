const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/api', (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})