
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

    await chrome.storage.local.set({
        domains: [...domains, domain]
    });
}

window.onload = async function () {
    let {domains} = await chrome.storage.local.get("domains");
    console.log(domains)
    if (domains === undefined) {
        console.log("这是domains");
        domains = []
        chrome.storage.local.set({
            domains: domains
        });
    }
    let {e} = await chrome.storage.local.get("domains");
    console.log(e);
    const template = document.getElementById("li_template");

    const elements = new Set();
    for (let index in domains) {
        const element = template.content.firstElementChild.cloneNode(true);

        if (domains[index].length > 30){
            element.querySelector(".domain").textContent = domains[index].substring(0,30);
        }else{
            element.querySelector(".domain").textContent = domains[index];
        }
        elements.add(element);
    }

    document.querySelector("ul").append(...elements);
}

document.getElementById('domainAddButton').addEventListener('click', addDomain);