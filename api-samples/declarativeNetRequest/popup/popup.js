
chrome.storage.local.set({
    domains: ['adp-test.apps.digiwincloud.com.cn']
});
const {domains} = await chrome.storage.local.get("domains")
console.log(domains)

chrome.runtime.sendMessage({
    action: 'addRule'
},function(response){
    if (response.success) {
        console.log(`Rule for ${targetDomain} added successfully`);
    } else {
        console.error('Failed to add rule');
    }
})