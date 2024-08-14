function addDynamicRule(domain){

    const rule = {
        id: 1001, // 规则的唯一ID，确保不与现有规则冲突
        priority: 1,
        action: {
            type: "modifyHeaders",
            requestHeaders: [
                {
                    header: "Access-Control-Allow-Origin",
                    operation: "set",
                    value: "*"
                }
            ],
            responseHeaders: [
                {
                    "header": "c",
                    "operation": "set",
                    "value": "d"
                }
            ]
        },
        condition: {
            urlFilter: `|*://${domain}/*`,
            resourceTypes: ["main_frame", "sub_frame","xmlhttprequest"]
        }
    };

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules:[rule],
        removeRuleIds:[1001]
    },()=>{
        if (chrome.runtime.lastError) {
            console.error(`Error adding rule: ${chrome.runtime.lastError.message}`);
        } else {
            console.log(`Rule for ${domain} added successfully`);
        }
    })
}


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'addRule') {
        const {domains} = await chrome.storage.local.get("domains")
        console.log("=========="+domains)
        addDynamicRule(domains[0]);
        sendResponse({success: true});
    }
});