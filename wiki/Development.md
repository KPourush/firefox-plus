# Development

## Layout

| Path | What it is |
|---|---|
| `patches/` | The Firefox+ changes, one `git diff` per feature, applied in filename order. |
| `REVISION` | Patch revision number, appended to release names as `-r<N>`. |
| `.github/workflows/build.yml` | Weekly / manual build. |
| `.github/workflows/publish.yml` | Publishes a reviewed draft release. |
| `.github/workflows/wiki.yml` | Copies `wiki/` to this wiki. |
| `tab-mover/` | The [Tab Mover](Tab-Mover) extension. |
| `wiki/` | Source of these wiki pages. Edit them there, not in the Wiki tab. |

## Changing or adding a patch

1. Check out the Firefox release tag the patches are built against:
   ```sh
   git clone --depth 1 --branch FIREFOX-ANDROID_<version>_RELEASE https://github.com/mozilla-firefox/firefox
   cd firefox
   ```
2. Apply the patches that come **before** the one you're working on, and commit them as a base:
   ```sh
   for p in ../firefox-plus/patches/00{01..11}-*.patch; do git apply "$p"; done   # adjust the range
   git add -A && git commit -qm base
   ```
   For a new patch, apply all of them.
3. Apply the patch you're changing (skip this for a new patch), then make your edits.
4. Save the result as the patch:
   ```sh
   git add -A && git diff --cached > ../firefox-plus/patches/00NN-short-name.patch
   ```
5. Check the whole series applies cleanly, in order, on a fresh checkout of the tag.
6. Raise the number in `REVISION` by 1.
7. Add or update the patch's row in the README table and on [Features](Features).
8. Push to `main`, then run **Actions → Build Firefox+ → Run workflow**.

## Building by hand

**Actions → Build Firefox+ → Run workflow** has three options:

- **tag**: build a specific Firefox tag, e.g. `FIREFOX-ANDROID_159_0_1_RELEASE`. Empty = latest.
- **force**: rebuild even if that release already exists.
- **draft**: publish as a hidden draft instead of a normal release.

A build takes about 45–80 minutes.

## Signing

Releases are signed with the key in the repository secrets `KEYSTORE_B64` (base64 keystore), `KEYSTORE_PASSWORD` and `KEY_ALIAS`. Android only installs an update if it's signed with the same key, so keep that keystore safe.
