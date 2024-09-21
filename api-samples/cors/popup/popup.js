
/*chrome.storage.local.set({
    domains: ['adp-test.apps.digiwincloud.com.cn']
});
const {domains} = await chrome.storage.local.get("domains")
console.log(domains)

chrome.runtime.sendMessage({
    action: 'addRule'
},function(response){
    if (response.success) {
        console.log(`Rule for added successfully`);
    } else {
        console.error('Failed to add rule');
    }
})*/

function sendMessageUpdateRule(domains){
    chrome.runtime.sendMessage({
        action: 'updateRule',
        domains:domains
    },function(response){
        if (response.success) {
            console.log(`Rule for added successfully`);
        } else {
            console.error('Failed to add rule');
        }
    });
}

function addDomain(){
    const inputDom = document.getElementById("domainInput");
    const domainValue = inputDom.value;

    if (domainValue === ''){
        return;
    }
    setStorageDomain(domainValue);
}

async function setStorageDomain(domain) {
    const {domains} = await chrome.storage.local.get("domains");
    for (let index in domains) {
        if (domains[index] === domain) {
            return;
        }
    }
    const newDomains = [...domains, domain];
    await chrome.storage.local.set({
        domains: newDomains
    });

    showDomains(newDomains);
    sendMessageUpdateRule(newDomains);

}

async function removeDomain(domain) {
    const {domains} = await chrome.storage.local.get("domains");
    const newDomains = domains.filter(d => d !== domain);

    await chrome.storage.local.set({
        domains: newDomains
    });

    showDomains(newDomains);
    sendMessageUpdateRule(newDomains);

}

function showDomains(domains) {
    const template = document.getElementById("li_template");
    const elements = new Set();
    for (let index in domains) {
        const element = template.content.firstElementChild.cloneNode(true);

        let content = domains[index];
        if (domains[index].length > 30) {
            content = domains[index].substring(0, 30);
        }
        element.querySelector(".domain").textContent = domains[index];
        element.querySelector("#addBtn").addEventListener('click',()=>{
           removeDomain(domains[index]);
        });
        elements.add(element);
    }
    document.querySelector("ul").innerHTML = "";
    document.querySelector("ul").append(...elements);
}

window.onload = async function () {
    let {domains} = await chrome.storage.local.get("domains");

    if (domains === undefined) {
        domains = []
        await chrome.storage.local.set({
            domains: domains
        });
    }

    showDomains(domains);
}

document.getElementById('domainAddButton').addEventListener('click', addDomain);