# FAQ

**Is this an official Mozilla product?**<br>
No. Firefox+ is a personal, unofficial build of Mozilla's open-source code with some extra patches. It is not affiliated with or endorsed by Mozilla.

**Does it replace my Play Store Firefox?**<br>
No, it installs alongside it as a separate app (`org.mozilla.firefox_plus`). Tabs, history and settings aren't shared; use [Tab Mover](Tab-Mover) to move your tabs.

**How quickly do Firefox security updates arrive?**<br>
The build checks for a new Mozilla release every Wednesday. Once the [weekly check](How-Updates-Work) has reviewed it, it's published the same day, unless the update is held for a decision.

**Obtainium isn't showing an update.**<br>
- Updates are published only after the weekly check, so they appear on Wednesdays.
- If no new Firefox version came out that week, there is no new release.
- Draft releases are invisible to Obtainium on purpose.

**Android says the app couldn't be installed / package conflicts.**<br>
Updates must be signed with the same key as the installed version. That happens if you installed a Firefox+ APK from somewhere else. Uninstall it (export your tabs with [Tab Mover](Tab-Mover) first), then install from the [releases](https://github.com/KPourush/firefox-plus/releases).

**My phone isn't arm64.**<br>
Only `arm64-v8a` builds are made. Older 32-bit-only phones aren't supported.

**Something broke.**<br>
[Open an issue](https://github.com/KPourush/firefox-plus/issues/new/choose) with the Firefox+ version (Settings → About) and what happened.
