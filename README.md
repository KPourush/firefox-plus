# Firefox+

Personal build of Firefox for Android, built from Mozilla's official release source with these patches:

| Patch | What it changes |
|---|---|
| `0001-thumbnail-cache-8gb.patch` | Tab thumbnail cache limit raised from 100 MB to 8 GB, so previews are no longer evicted after ~100 tabs. |
| `0002-tab-search-select-all.patch` | Tab search gets a "Select all (N)" button: selects every matching tab in tab order and returns to the tab tray, ready for Add to group. |
| `0003-separate-app-identity.patch` | App ID `org.mozilla.firefox_plus` and name "Firefox+", so it installs next to the Play Store Firefox. |
| `0004-group-tab-select-move-remove.patch` | Inside an open tab group: long-press selects tabs, with All/None, Move (to another or a new group) and Remove (out of the group). A group emptied this way is removed. |
| `0005-open-current-tab-group.patch` | Opening the tab tray while on a tab that's in a group goes straight into that group, scrolled to the current tab. Back still leads to the overview. |
| `0006-tab-search-in-open-group.patch` | Search button in the header of an open tab group. Back from search returns to the group; Select all returns to the overview with the matches selected, ready for Add to group. |
| `0007-swipe-within-tab-group.patch` | Toolbar swipe follows the tab tray order: through a group's tabs in group order, then on to the next group or tab. It wraps around at the ends, so swiping never stops. |
| `0008-tab-list-fast-scroller.patch` | Draggable scrollbar on the right edge of the tab list, in the overview and inside open groups (list and grid view). Hold the thumb and drag to jump through hundreds of tabs. |

## How builds happen

`.github/workflows/build.yml` runs weekly (Wednesdays). It picks the newest `FIREFOX-ANDROID_*_RELEASE` tag, applies the patches, builds with Mozilla's prebuilt engine (artifact build), signs the APK and publishes it as release `v<version>`. Already-built versions are skipped. After changing the patches, raise the number in `REVISION` so the rebuild gets a new release name (`v<version>-r<N>`) that Obtainium picks up as an update. Run it by hand under Actions → Build Firefox+ → Run workflow.

Required repository secrets: `KEYSTORE_B64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`.

Install and update on the phone with Obtainium pointed at this repository.

## Tab Mover

`tab-mover/` is a small extension for moving tabs between the old Firefox and Firefox+: export all tabs in order to a JSON file, then re-open them in order without loading them all at once. Optional: paste a shared tab group's links to mark those tabs with `#ffg`, then search `#ffg` → Select all → Add to group.
