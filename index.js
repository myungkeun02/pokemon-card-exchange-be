const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('명근입니다')
})

app.listen(3000)