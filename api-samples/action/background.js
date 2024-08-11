//设置图标上的显示文字
const text = "bt"
chrome.action.setBadgeText({ text });
//设置图标上的显示文字颜色
const color=[75,156,99,255];
chrome.action.setBadgeTextColor({color});
//设置图标的背景颜色
chrome.action.setBadgeBackgroundColor({color:[248,62,65,255]});

chrome.runtime.onInstalled.addListener((reason)=>{
    chrome.tabs.create({
        url: 'demo/index.html'
    });
});