function addDynamicRule(domains){

    const newRules =[];
    for (const index in domains) {
        const rule = {
            id: parseInt(index)+1, // 规则的唯一ID，确保不与现有规则冲突
            priority: 1,
            action: {
                type: "modifyHeaders",
                requestHeaders: [
                    {
                        header: "a",
                        operation: "set",
                        value: "b"
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
                urlFilter: `|*://*${domains[index]}/*`,
                resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest"]
            }
        };
        newRules.push(rule);
    }

    chrome.declarativeNetRequest.getDynamicRules((rules)=>{
        const ruleIds = rules.map(r=>r.id);

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds:ruleIds,
            addRules: newRules
        },()=>{
            if (chrome.runtime.lastError) {
                console.error(`Error adding rule: ${chrome.runtime.lastError.message}`);
            } else {
                console.log(`Rule for added successfully`);
            }
        })
    });
}


chrome.runtime.onMessage.addListener(  (message, sender, sendResponse) => {
    if (message.action === 'updateRule') {
        try {
            const {domains} = message;

            if (domains && Array.isArray(domains)) {
                addDynamicRule(domains);  // 假设 addDynamicRule 是异步函数
                sendResponse({success: true});
            } else {
                console.error('No domains found or domains is not an array');
                sendResponse({success: false});
            }
        } catch (error) {
            console.error('Error updating rule:', error);
            sendResponse({success: false});
        }
    }
});