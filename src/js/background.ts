async function processData(){
    //Jlet response=await fetch('https://jsonplaceholder.typicode.com/todos/1');
    let response=await fetch('http://127.0.0.1:3000/');
    let json=await response.json();
    console.log("from background",json);
    //console.log("from background",request);
    return json;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        processData().then(sendResponse);
        return true;
    }
);
