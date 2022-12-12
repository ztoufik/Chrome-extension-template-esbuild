import express from 'express';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({name:"toufik",first_name:"zoubir"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
