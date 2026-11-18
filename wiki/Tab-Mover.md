# Tab Mover

Firefox+ is a separate app, so it starts with no tabs. **Tab Mover** ([`tab-mover/`](https://github.com/KPourush/firefox-plus/tree/main/tab-mover)) is a small Firefox extension that moves all of your tabs across, in order.

## 1. Export (in the old Firefox)

Open Tab Mover and tap **Export all tabs**. It saves every open tab, in tab order, with its title and link. Then choose **Save as file** or **Copy to clipboard**.

## 2. Import (in Firefox+)

Open Tab Mover in Firefox+, then pick the exported file, or paste the export (or a shared list of links) into the box. Tap **Open tabs**.

- Tabs are re-opened in order, **without loading them all at once**.
- **Pause** stops the import; you can continue later.
- **Test run** opens only the first 20 tabs, to try it out.

## Re-creating a shared tab group (optional)

Under **Mark group members**, paste the links you shared from the group. Matching tabs get `#ffg` added to their link. Then in Firefox+:

1. Search tabs for `#ffg`.
2. Tap **Select all**.
3. Tap **Add to group**.

## Notes

- Tab Mover needs Firefox 142 or newer.
- Release versions of Firefox only install extensions signed by Mozilla.
