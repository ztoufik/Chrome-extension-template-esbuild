console.log("content script");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const search_input=document.querySelector("input#search");
    console.log(search_input.value);
    search_input.value="hello world";
    sendResponse({status:"done"});
  });
