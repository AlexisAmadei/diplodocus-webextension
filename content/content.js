const api = globalThis.browser ?? globalThis.chrome;
const pattern = /\bclaude opus\b|\bopus\b/gi;
let replacement = "Diplodocus";

// Tracks nodes whose value we just wrote, so the characterData mutation our
// own write triggers doesn't get re-processed (the replacement can itself
// contain text matching `pattern`, e.g. "DiClaudeOpus" in legacy mode).
const selfWritten = new WeakSet();

function replaceInNode(node) {
    if (selfWritten.has(node)) {
        selfWritten.delete(node);
        return;
    }
    const tag = node.parentElement?.tagName;
    if (tag === "SCRIPT" || tag === "STYLE") return;
    if (pattern.test(node.nodeValue)) {
        pattern.lastIndex = 0;
        const next = node.nodeValue.replace(pattern, replacement);
        if (next !== node.nodeValue) {
            selfWritten.add(node);
            node.nodeValue = next;
        }
    }
    pattern.lastIndex = 0;
}

function walkAndReplace(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) replaceInNode(node);
}

function start() {
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
}

api.storage.local
    .get({ enabled: true, disabledSites: [], legacyMode: false })
    .then(({ enabled, disabledSites, legacyMode }) => {
        replacement = legacyMode ? "DiClaudeOpus" : "Diplodocus";
        if (enabled && !disabledSites.includes(location.hostname)) start();
    });
