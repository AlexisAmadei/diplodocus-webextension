const pattern = /claude opus|opus/gi;

function replaceInNode(node) {
    const tag = node.parentElement?.tagName;
    if (tag === "SCRIPT" || tag === "STYLE") return;
    if (pattern.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(pattern, "Diplodocus");
    }
    pattern.lastIndex = 0;
}

function walkAndReplace(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) replaceInNode(node);
}

walkAndReplace(document.body);

new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                replaceInNode(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                walkAndReplace(node);
            }
        }
        if (mutation.type === "characterData") {
            replaceInNode(mutation.target);
        }
    }
}).observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
});
