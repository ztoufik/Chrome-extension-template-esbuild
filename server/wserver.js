import { WebSocketServer } from 'ws';
import express from 'express';

const app = express()
const server_port = 3000
const ws_port = 8080
const wss = new WebSocketServer({ port: ws_port });

console.log(`server started at port ${ws_port}`);
wss.on('connection', function connection(ws) {
    console.log("connection established");
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({name:"toufik",first_name:"zoubir"})
})

app.listen(server_port, () => {
  console.log(`Example app listening on port ${server_port}`)
})
