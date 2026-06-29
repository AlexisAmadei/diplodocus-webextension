const api = globalThis.browser ?? globalThis.chrome;

const enabledEl = document.getElementById("enabled");
const siteEl = document.getElementById("site");
const siteRow = document.getElementById("site-row");
const siteLabel = document.getElementById("site-label");
const legacyEl = document.getElementById("legacy");
const legacyRow = document.getElementById("legacy-row");

let hostname = null;
let activeTabId = null;

function reflectSiteState(disabledSites) {
    // Per-site toggle is "on" when the site is NOT in the disabled list.
    siteEl.checked = hostname ? !disabledSites.includes(hostname) : false;
    const masterOff = !enabledEl.checked;
    siteRow.classList.toggle("disabled", masterOff || !hostname);
    legacyRow.classList.toggle("disabled", masterOff);
}

async function init() {
    const [tab] = await api.tabs.query({ active: true, currentWindow: true });
    activeTabId = tab?.id ?? null;
    try {
        hostname = tab?.url ? new URL(tab.url).hostname : null;
    } catch {
        hostname = null;
    }
    siteLabel.textContent = hostname
        ? `Enable on ${hostname}`
        : "Enable on this site";

    const { enabled, disabledSites, legacyMode } = await api.storage.local.get({
        enabled: true,
        disabledSites: [],
        legacyMode: false,
    });
    enabledEl.checked = enabled;
    legacyEl.checked = legacyMode;
    reflectSiteState(disabledSites);
}

legacyEl.addEventListener("change", async () => {
    await api.storage.local.set({ legacyMode: legacyEl.checked });
});

enabledEl.addEventListener("change", async () => {
    await api.storage.local.set({ enabled: enabledEl.checked });
    const { disabledSites } = await api.storage.local.get({ disabledSites: [] });
    reflectSiteState(disabledSites);
});

siteEl.addEventListener("change", async () => {
    if (!hostname) return;
    const { disabledSites } = await api.storage.local.get({ disabledSites: [] });
    const set = new Set(disabledSites);
    if (siteEl.checked) set.delete(hostname);
    else set.add(hostname);
    await api.storage.local.set({ disabledSites: [...set] });
});

document.getElementById("reload").addEventListener("click", () => {
    if (activeTabId != null) api.tabs.reload(activeTabId);
    window.close();
});

init();
