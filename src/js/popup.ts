const root = document.querySelector('#root');
const btn = document.createElement('button');
const text = document.createElement('p');

const connectBack=async () => {
    let response= await chrome.runtime.sendMessage({greeting: "hello"});
    console.log("from popup",response);
    setData(response.name)
};

function setData(data){
    text.innerText=data;
}

const connectContent=async()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
        console.log(response);
        setData(response.status);
    });
});
}

const connectWS=async () => {
    let socket = new WebSocket("ws://localhost:8080/","echo-protocol");
    socket.onopen = function(e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        socket.send("My name is John");
    };

    socket.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);
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
}

btn.innerText="call api";

btn.onclick=connectContent;

root.appendChild(btn);
root.appendChild(text);
