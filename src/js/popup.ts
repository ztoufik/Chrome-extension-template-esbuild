const root = document.querySelector('#root');
const btn = document.createElement('button');
const text = document.createElement('p');

btn.innerText="call api";
function setData(data){
    text.innerText=data;
}

btn.onclick=async () => {
    let response= await chrome.runtime.sendMessage({greeting: "hello"});
    console.log("from popup",response);
    setData(response.name)
};

root.appendChild(btn);
root.appendChild(text);
