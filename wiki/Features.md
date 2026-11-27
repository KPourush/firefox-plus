# Features

Each feature is one patch in [`patches/`](https://github.com/KPourush/firefox-plus/tree/main/patches). The patch number is shown next to each one.

## 🖼️ Tab memory

**Thumbnail cache: 100 MB → 8 GB** · `0001`<br>
Tab thumbnail cache limit raised from 100 MB to 8 GB, so previews are no longer evicted after ~100 tabs.

**1,000 recently closed tabs** · `0015`<br>
Recently closed keeps the last 1,000 closed tabs instead of 10.

**Recently closed sorted by close time** · `0016`<br>
Recently closed is sorted by when each tab was closed instead of when it was last opened, so closing an old tab puts it at the top instead of the bottom.

**Faster tab tray** · `0014`<br>
The tab list is only rebuilt when something it shows changes (title, address, icon, playing media, selected tab, groups), not on every page-loading update, and an outdated rebuild is dropped when a newer one starts. Tab search cancels the previous search on each keystroke and only shows results for the newest query. Sorting duplicates saves group changes once per group instead of once per page.

## 🗂️ Tab groups

**Select, move and remove inside a group** · `0004`<br>
Inside an open tab group: long-press selects tabs, with All/None, Move (to another or a new group) and Remove (out of the group). A group emptied this way is removed.

**To top / To end** · `0011`<br>
Inside an open tab group, the selection bar gets a second row: Move, Remove, To top, To end. To top / To end move the selected tabs to the beginning or end of the group, keeping their order, then leave selection; the list stays where it was.

**Open the current tab's group** · `0005`<br>
Opening the tab tray while on a tab that's in a group goes straight into that group, scrolled to the current tab. Back still leads to the overview.

**Search inside an open group** · `0006`<br>
Search button in the header of an open tab group. Back from search returns to the group; Select all returns to the overview with the matches selected, ready for Add to group.

**Buttons at the bottom** · `0012`<br>
An open tab group always opens at full height and closes with a single Back. Only the group's title stays at the top; search, the ⋯ menu and add tab sit in a bar at the bottom, and in selection mode the selection bar (✕, count, All/None, Move, Remove, To top, To end) is at the bottom too.

**Add to group: grid** · `0010`<br>
The Add to group sheet shows groups as a 2-column grid of tiles (group color bar, name on up to 2 lines, tab count), with New group as the first tile. Groups you last added tabs to come first; closing, reading or renaming tabs doesn't change the order.

**Add to group: full height** · `0013`<br>
The Add to group sheet opens at full height, so scrolling the groups doesn't stop partway while the sheet pulls itself open.

## 🔎 Search & select

**Select all (N)** · `0002`<br>
Tab search gets a "Select all (N)" button: selects every matching tab in tab order and returns to the tab tray, ready for Add to group.

**Duplicate tabs** · `0009`<br>
Adding a tab to a group also pulls in every other copy of the same page (from anywhere), placed right after the new tab, newest to oldest. A sort button next to tab search moves every older copy directly after its newest copy and into that copy's group (or out of any group if the newest is ungrouped); it shows a spinner while working and a message when done. Groups left empty are removed. Pages count as the same when their address matches, ignoring the part after `#` and a trailing `/`. Nothing is closed automatically.

## 🧭 Getting around

**Toolbar swipe follows the tab tray** · `0007`<br>
Toolbar swipe follows the tab tray order: through a group's tabs in group order, then on to the next group or tab. It stops at the first and last tab instead of wrapping around.

**Fast scroller** · `0008`<br>
Draggable scrollbar on the right edge of the tab list, in its own 24 dp lane: the tabs keep their width and move left into the side margin, so the scrollbar never sits on top of them. In the overview and inside open groups (list and grid view). Hold the thumb and drag to jump through hundreds of tabs.

**Current tab centered** · `0017`<br>
Opening the tab tray shows the current tab in the middle of the screen instead of at the bottom, in the overview and inside groups (list and grid view).

## 📱 App identity

**Installs next to Firefox** · `0003`<br>
App ID `org.mozilla.firefox_plus` and name "Firefox+", so it installs next to the Play Store Firefox.
