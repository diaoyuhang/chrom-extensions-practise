const articleEle = document.querySelector("article");

if (articleEle){
    const text = articleEle.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);

    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount/200);

    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    const heading = articleEle.querySelector("h1");
    const date = articleEle.querySelector("time")?.parentNode;

    (date ?? heading).insertAdjacentElement("afterend", badge);
}