# Sound Tweak — Browser‑based Audio Normaliser

Sound Tweak is a single‑page Vue 3 application that runs entirely in the browser.  
Its core features are:

* **One‑click loudness normalisation** to –14 LUFS integrated with a –1 dBTP ceiling.  
* **Preview & fine‑tune** — play, pause, seek and manually adjust a smooth‑animating volume slider.  
* **Transcode & download** to any mainstream format/bit‑rate using `ffmpeg.wasm`.  
* **100 % client‑side** — no server, works offline once loaded, deployable straight to GitHub Pages.

---

## Getting started

```bash
# install
pnpm install # or: npm install / yarn

# local dev server
npm run dev
