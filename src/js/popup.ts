const root = document.querySelector('#root');
const btn = document.createElement('button');
const text = document.createElement('p');

const connectBack=async () => {
    let response= await chrome.runtime.sendMessage({greeting: "hello"});
    console.log("from popup",response);
    setData(response.name)
};

const connectWS=async () => {
    let socket = new WebSocket("wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self");
    socket.onopen = function(e) {
        alert("[open] Connection established");
        alert("Sending to server");
        socket.send("My name is John");
    };

    socket.onmessage = function(event) {
        alert(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died');
        }
    };

    socket.onerror = function(error) {
        alert(`[error]`);
    };
}

btn.innerText="call api";

function setData(data){
    text.innerText=data;
}

btn.onclick=connectWS
root.appendChild(btn);
root.appendChild(text);
