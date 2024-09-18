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
                    },{
                        header: "origin",
                        operation: "remove",
                    },{
                        header: "referer",
                        operation: "remove",
                    },{
                        header: "token",
                        operation: "set",
                        value: "PTM6WssfwKw4GM34fMR4nqg9igIOizOw+XIrml7UtZR8Ezcl2IQePp+45XHUEbVz9B2kCwjfDJSrNAhc9+hYsijm/oh/bEp1JT7JBFgXkC+q6zor2NFE2UkViRdZ+zW370KtxUQOGWj5SlxRczHj9V3KEw1F+UOr3H4SrQ14W053FucZGFIdXHlZNHxhq7F2V87pTQAwGEhwVhzBXbhXeX0rsCWK+0e4g7fSl5HXL6AozZ37Bn3KazgiocBm9vMJqQBZpsiA369T7eW1WEgJZpVyTJKxH5m1tIyFvBUKiViqOe1DEQRauKu/Jc35BmoKWOMnGiBdLEYyxCcBu9f66A=="
                    }
                ],
                responseHeaders: [
                    {
                        header: "access-control-allow-headers",
                        operation: "set",
                        value: "*"
                    },
                    {
                        header: "access-control-allow-methods",
                        operation: "set",
                        value: "*"
                    },
                    {
                        header: "access-control-allow-origin",
                        operation: "set",
                        value: "*"
                    },
                    {
                        header: "c",
                        operation: "set",
                        value: "d"
                    }
                ]
            },
            condition: {
                urlFilter: `|${domains[index]}/*`,
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