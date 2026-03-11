# Claude-InstaSaver

**An iPhone Shortcut that downloads Instagram videos directly to your Photos library.**

> **Disclaimer**: This shortcut is intended for personal, educational use only. Downloading
> Instagram content may violate Instagram's [Terms of Use](https://help.instagram.com/581066165581870).
> Only download videos you have the right to save (your own content or content with explicit permission).
> See [ISSUES.md](ISSUES.md) for full details.

---

## Features

- Save Instagram **Reels**, **Posts**, and **IGTV** videos to your Camera Roll
- Works from the **iOS Share Sheet** (tap Share → Claude-InstaSaver)
- Works **standalone** — just open and paste a URL
- **Two-method extraction** with automatic fallback for reliability
- Clear **success / error feedback** for every attempt
- No account login required for public posts
- No data stored or transmitted beyond what's needed for the download

## Requirements

| Requirement | Minimum |
|-------------|---------|
| iOS / iPadOS | 26.0+ |
| Shortcuts app | Built-in |
| Internet connection | Required |
| Photos permission | Required (prompted on first use) |

> **iOS 15–25 users**: See the [legacy installation note](#legacy-ios-15-25) below.

---

## Installation

> **Important — iOS 26**: Apple removed the "Allow Untrusted Shortcuts" toggle in iOS 26.
> Unsigned `.shortcut` files **cannot** be imported directly. You must use an **iCloud link**
> (Method 1) or build from source and share via a signed iCloud link (Method 2).

### Method 1 — iCloud Link (Recommended)

1. Tap the iCloud installation link (provided in the [Releases](../../releases) section of this repo).
2. Safari opens and displays **"Add Shortcut?"** — tap **Add Shortcut**.
3. The shortcut appears instantly in your Shortcuts library under **My Shortcuts**.

> If you see **"This shortcut cannot be opened"**, make sure you're on iOS 26.0 or later and
> that the Shortcuts app is up to date in the App Store.

### Method 2 — Build from Source (Advanced)

Use this if you want to inspect or customise every action:

1. Install Python 3.9+ on your Mac.
2. Clone this repo and navigate to `shortcuts/instagram-video-saver/`.
3. Run `python3 generate_shortcut.py` — this produces `Claude-InstaSaver.shortcut`.
4. Open the **Shortcuts** app on your Mac (macOS 26 / Sequoia+).
5. Drag `Claude-InstaSaver.shortcut` into the Shortcuts window to import it.
6. Right-click the shortcut → **Share** → **Copy iCloud Link**.
7. Open that iCloud link on your iPhone to install.

### Legacy iOS 15–25

On iOS 15–25 the "Allow Untrusted Shortcuts" toggle is available:

1. Go to **Settings → Shortcuts → Allow Untrusted Shortcuts** and enable the toggle.
2. Download `Claude-InstaSaver.shortcut` from this repo to your iPhone.
3. Open the **Files** app, locate the file, and tap it — Shortcuts opens automatically.
4. Tap **Add Untrusted Shortcut**.

---

## Usage

### Share Sheet (most common)

1. Open the Instagram app and find the video you want to save.
2. Tap the **⋯ (more)** button → **Share** → **Copy Link**.
3. Tap the **Share** button (box with arrow) from anywhere that has the link.
4. Scroll the Share Sheet and tap **Claude-InstaSaver**.
5. The shortcut runs, downloads the video, and saves it to your Photos library.
6. A banner notification confirms: **"✅ Instagram video saved to Photos!"**

> **iOS 26 Share Sheet tip**: In iOS 26, the Share Sheet shows your most-used shortcuts at the
> top. After your first use, Claude-InstaSaver will appear near the top automatically.

### Standalone (paste URL)

1. Copy an Instagram video URL from anywhere (browser, Messages, Notes…).
2. Open the **Shortcuts** app and tap **Claude-InstaSaver** in the My Shortcuts tab.
3. When prompted, paste the URL and tap **Done**.
4. The video is saved to your Photos library.

### Supported URL Formats

```
https://www.instagram.com/reel/ABC123xyz/
https://www.instagram.com/p/ABC123xyz/
https://www.instagram.com/tv/ABC123xyz/
```

---

## How It Works

The shortcut uses a two-method strategy to maximise compatibility:

### Method A — Instagram Internal API
```
GET https://www.instagram.com/p/{shortcode}/?__a=1&__d=dis
```
Instagram's internal JSON endpoint returns post metadata including `video_url` for public
video posts. This requires no authentication and works for most public accounts.

### Method B — Fallback (sssinstagram.com)
If Method A fails (private account, API change, network error), the shortcut falls back to a
third-party extraction service. The original URL is URL-encoded and sent to the service's API;
the response contains a direct download link.

### Download & Save
Once a direct MP4 URL is obtained, the shortcut:
1. Downloads the file using **Get Contents of URL** (native iOS networking).
2. Saves the binary to the **Photos** library via **Save to Photo Album**.
3. Displays a banner notification with the result.

---

## Troubleshooting

### Cannot import — "Shortcut cannot be opened" (iOS 26)

iOS 26 requires shortcuts to be installed via a signed **iCloud link**. Direct `.shortcut` file
imports are no longer supported. Use Method 1 (iCloud link) from the Installation section above.

### "Invalid URL" error

Make sure you're sharing a full Instagram URL, not just a username or caption text.
The URL must contain `instagram.com` and a post path (`/p/`, `/reel/`, or `/tv/`).

### "Could Not Download Video" error

This happens when both extraction methods fail. Common causes:

| Cause | Fix |
|-------|-----|
| Private account (you don't follow) | Follow the account first; private posts require your session |
| Instagram API change | Check [ISSUES.md](ISSUES.md) for updated workarounds |
| Fallback service down | Try again in a few minutes |
| Post is a photo, not a video | Only video content can be saved |
| Rate limited by Instagram | Wait 10–15 minutes and try again |

### Video saves but won't play in Photos

The file may be in a codec that the Photos app doesn't support on iOS 26. Try:
- Tapping the video in Photos and waiting a moment for transcoding to complete
- Opening it in the **Files** app or **VLC**

### Shortcut doesn't appear in Share Sheet

1. Open the **Shortcuts** app.
2. Long-press **Claude-InstaSaver** → tap **Details** (the info button).
3. Enable **Show in Share Sheet**.
4. If it still doesn't appear, go to **Settings → Privacy & Security → Shortcuts** and
   confirm Shortcuts has permission to appear in the Share Sheet.

### Photos permission denied

Go to **Settings → Privacy & Security → Photos → Shortcuts** and set access to **Add Photos Only**
or **Full Access**.

---

## Privacy

- The shortcut sends the Instagram URL to Instagram's own servers (Method A) and optionally
  to sssinstagram.com (Method B).
- **No data is collected or stored** by the shortcut itself.
- No account credentials are ever transmitted.
- You can review every network request in the **Shortcuts** app editor.

---

## Repository Structure

```
shortcuts/instagram-video-saver/
├── generate_shortcut.py       # Python script — generates the .shortcut binary
├── Claude-InstaSaver.shortcut # Shortcut file (must be installed via iCloud link on iOS 26)
├── shortcut-source.json       # Human-readable JSON of the full workflow
├── README.md                  # This file
├── ISSUES.md                  # Known limitations & ToS notes
└── LICENSE                    # MIT License
```

---

## Contributing

Bug reports and improvements are welcome via GitHub Issues.

To modify the shortcut:
1. Edit `generate_shortcut.py` (the workflow is defined in the `ACTIONS` list).
2. Run `python3 generate_shortcut.py` to regenerate `Claude-InstaSaver.shortcut`.
3. Import on a Mac (Shortcuts app), share as an iCloud link, and test on a real iOS 26 device.
4. Submit a PR with both the updated script **and** the regenerated `.shortcut` file.

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.1 | 2026-03 | iOS 26 support — iCloud link install, updated Share Sheet docs, legacy iOS note |
| 1.0 | 2026-03 | Initial release — dual-method extraction, share sheet support, iOS 15+ |

---

## License

MIT — see [LICENSE](LICENSE).
