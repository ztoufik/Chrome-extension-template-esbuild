import { WebSocketServer } from 'ws';
import express from 'express';
import { Buffer } from 'node:buffer';

const ws_port = 8080
const wss = new WebSocketServer({ port: ws_port });

const launchExpServer=(ws)=>{
    const app = express()
    const server_port = 3000

   // parse application/json
    app.use(express.json());

    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({name:"toufik",first_name:"zoubir"})
        console.log('request arrived');
    })


    app.post('/add', function(req,res) {
        console.log(req.body.login);
        ws.send(JSON.stringify(req.body));
        res.status(201).json(req.body.name);
    });

    app.listen(server_port, () => {
      console.log(`express server listening on port ${server_port}`)
    })
}

console.log(`websocket server listening at port ${ws_port}`);
wss.on('connection', function connection(ws) {
    console.log("connection established");
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    //ws.send('something');
    launchExpServer(ws);
});


