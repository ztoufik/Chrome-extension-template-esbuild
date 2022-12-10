console.log("content script");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("message received");
    const search_input=document.querySelector("input#search");
    search_input.value="hello world";
    sendResponse({status:"done"});
  });
