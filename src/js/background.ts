async function processData(){
    let response=await fetch('https://jsonplaceholder.typicode.com/todos/1');
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
