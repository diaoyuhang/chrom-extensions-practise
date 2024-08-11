const callback  = (details) =>{
    console.log(details);
    return {requestHeaders: details.requestHeaders};
}
chrome.webRequest.onBeforeSendHeaders.addListener(callback,
    {urls: ['*://*.google.com/*']},
    ['blocking']);