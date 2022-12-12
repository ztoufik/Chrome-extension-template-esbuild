const root = document.querySelector('#root');
const btn_api = document.createElement('button');
const btn_send = document.createElement('button');
const text = document.createElement('p');
let ss=new Map();

const connectBack=async () => {
    let response= await chrome.runtime.sendMessage({greeting: "hello"});
    console.log("from popup",response);
    setData(response.name)
};

function setData(data){
    text.innerText=data;
}

const connectContent=()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
        console.log(response);
        setData(response.status);
    });
});
}

const connectWS=() => {
    let socket = new WebSocket("ws://localhost:8080/","echo-protocol");
    ss["test"]=socket;
    socket.onopen = function(e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        socket.send("My name is John");
    };

    socket.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);
        //connectContent();
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    };

    socket.onerror = function(error) {
        console.log(error);
        setData(JSON.stringify(error));
        console.log(`[error]`);
    };

    btn_api.onclick=()=>{
        console.log("sending data");
        socket.send("hello there");
    }
}

btn_api.innerText="call api";
btn_send.innerText="send";

btn_api.onclick=connectWS;

root.appendChild(btn_api);
root.appendChild(btn_send);
root.appendChild(text);
