const express = require('express')
const path = require('path')
const app = express()
const port = 8090

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.sendFile(__dirname,`../demo-cra-container/build/index.html`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})