
const express = require('express')
const app = express()
const port = 3000


// una ruta de tipo GET para obtener cosas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})