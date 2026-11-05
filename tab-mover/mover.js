"use strict";

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const STATE_KEY = "importState";
const GROUP_MARK = "#ffg";
const TEST_COUNT = 20;

let exportText = "";
let stopRequested = false;

async function exportTabs() {
  const tabs = await browser.tabs.query({});
  tabs.sort((a, b) => (a.windowId - b.windowId) || (a.index - b.index));
  const list = tabs
    .filter((t) => t.url && !t.url.startsWith("moz-extension:"))
    .map((t) => ({ t: t.title || "", u: t.url }));
  exportText = JSON.stringify({ format: "tab-mover", version: 1, exported: new Date().toISOString(), count: list.length, tabs: list });
  $("export-status").textContent = `${list.length} tabs exported.`;
  $("export-actions").hidden = false;
}

function downloadExport() {
  const blob = new Blob([exportText], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `tabs-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  $("export-status").textContent += "\nFile saved (check Downloads). If nothing appeared, use Copy instead.";
}

async function copyExport() {
  try {
    await navigator.clipboard.writeText(exportText);
    $("export-status").textContent += "\nCopied. Paste it into a note or file and keep it safe.";
  } catch (e) {
    const ta = $("paste");
    ta.value = exportText;
    ta.select();
    $("export-status").textContent += "\nCopy failed; the export is in the import box below. Select all and copy it by hand.";
  }
}

function normalize(url) {
  return url.replace(/[)\]>,.;'"]+$/, "").replace(/\/$/, "");
}

function parseGroupLinks(text) {
  const found = text.match(/https?:\/\/[^\s<>"]+/g) || [];
  return new Set(found.map(normalize));
}

async function readInput() {
  const file = $("file").files[0];
  const raw = file ? await file.text() : $("paste").value;
  try {
    const data = JSON.parse(raw);
    if (data && Array.isArray(data.tabs)) return data.tabs;
  } catch (e) {}
  const urls = raw.match(/https?:\/\/[^\s<>"]+/g) || [];
  if (!urls.length) throw new Error("No links found. Use a Tab Mover export or text with one link per line.");
  return urls.map((u) => ({ t: "", u: u.replace(/[)\]>,.;'"]+$/, "") }));
}

async function createTab(tab, state) {
  const url = tab.u;
  if (!/^(https?|ftp|data):/i.test(url)) return false;
  if (!state.noDiscard) {
    try {
      await browser.tabs.create({ url, active: false, discarded: true, title: tab.t || undefined });
      return true;
    } catch (e) {
      if (!/discard|title/i.test(String(e))) throw e;
      state.noDiscard = true;
    }
  }
  const created = await browser.tabs.create({ url, active: false });
  if (browser.tabs.discard) {
    try { await browser.tabs.discard(created.id); } catch (e) {}
  }
  return true;
}

async function runImport(state) {
  stopRequested = false;
  $("import").hidden = true;
  $("stop").hidden = false;
  const status = $("import-status");
  const total = state.tabs.length;

  while (state.next < total && !stopRequested) {
    const tab = state.tabs[state.next];
    try {
      if (!(await createTab(tab, state))) state.skipped.push(tab.u);
    } catch (e) {
      state.skipped.push(tab.u);
    }
    state.next += 1;
    if (state.next % 10 === 0 || state.next === total) {
      await browser.storage.local.set({ [STATE_KEY]: state });
      status.textContent = `Opened ${state.next} of ${total}…`;
      await sleep(state.noDiscard ? 600 : 150);
    }
  }

  await browser.storage.local.set({ [STATE_KEY]: state });
  $("stop").hidden = true;
  $("import").hidden = false;

  if (state.next >= total) {
    let msg = `Done: ${total - state.skipped.length} tabs opened in order.`;
    if (state.marked) msg += `\n${state.marked} group tabs marked with ${GROUP_MARK}.`;
    if (state.skipped.length) msg += `\nSkipped ${state.skipped.length} (browser-internal or failed):\n${state.skipped.slice(0, 20).join("\n")}`;
    status.textContent = msg;
    $("import").textContent = "Open tabs";
    await browser.storage.local.remove(STATE_KEY);
  } else {
    status.textContent = `Paused at ${state.next} of ${total}. Tap Resume to continue.`;
    $("import").textContent = `Resume from ${state.next + 1}`;
  }
}

async function startImport() {
  const status = $("import-status");
  const saved = (await browser.storage.local.get(STATE_KEY))[STATE_KEY];
  if (saved && saved.next < saved.tabs.length && !$("file").files[0] && !$("paste").value.trim()) {
    return runImport(saved);
  }

  let tabs;
  try {
    tabs = await readInput();
  } catch (e) {
    status.textContent = `Could not read the export: ${e.message}`;
    return;
  }
  if ($("first-only").checked) tabs = tabs.slice(0, TEST_COUNT);

  const group = parseGroupLinks($("group").value);
  let marked = 0;
  if (group.size) {
    tabs = tabs.map((t) => {
      if (group.has(normalize(t.u)) && !t.u.includes("#")) {
        marked += 1;
        return { t: t.t, u: t.u + GROUP_MARK };
      }
      return t;
    });
  }

  if (!confirm(`Open ${tabs.length} tabs now?${marked ? ` (${marked} will be marked as group tabs)` : ""}`)) return;
  await runImport({ tabs, next: 0, skipped: [], marked, noDiscard: false });
}

async function init() {
  $("export").addEventListener("click", () => exportTabs().catch((e) => { $("export-status").textContent = `Export failed: ${e}`; }));
  $("download").addEventListener("click", downloadExport);
  $("copy").addEventListener("click", copyExport);
  $("import").addEventListener("click", () => startImport().catch((e) => { $("import-status").textContent = `Import failed: ${e}`; }));
  $("stop").addEventListener("click", () => { stopRequested = true; });

  const saved = (await browser.storage.local.get(STATE_KEY))[STATE_KEY];
  if (saved && saved.next < saved.tabs.length) {
    $("import").textContent = `Resume from ${saved.next + 1}`;
    $("import-status").textContent = `An unfinished import is saved (${saved.next} of ${saved.tabs.length} opened).`;
  }
}

init();
