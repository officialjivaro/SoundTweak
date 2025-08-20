/**
 * Proxy worker script that forwards to the upstream FFmpeg worker.
 * The upstream script looks for its sibling `ffmpeg-core.wasm` automatically.
 */
importScripts('https://unpkg.com/@ffmpeg/core@0.12.5/dist/ffmpeg-worker.js');
