// src/composables/useFFmpeg.ts
import { ref } from 'vue'

type NormalizedFFmpeg = {
  writeFile: (path: string, data: Uint8Array) => Promise<void>
  readFile: (path: string) => Promise<Uint8Array>
  exec: (args: string[]) => Promise<void>
  setProgress: (cb: (ratio: number) => void) => void
}

const ffRef = ref<NormalizedFFmpeg | null>(null)
const ready = ref(false)

const CDN_CORE_ESM = 'https://unpkg.com/@ffmpeg/core@0.13.0/dist/esm'
const CDN_CORE_UMD = 'https://unpkg.com/@ffmpeg/core@0.13.0/dist/umd'
const CDN_FFMPEG_ESM_WORKER = 'https://unpkg.com/@ffmpeg/ffmpeg@0.13.0/dist/esm/worker.js'

async function toBlobURL(url: string, mime: string): Promise<string> {
  const res = await fetch(url, { credentials: 'omit' })
  if (!res.ok) throw new Error(`Fetch failed: ${url} → ${res.status}`)
  const buf = await res.arrayBuffer()
  return URL.createObjectURL(new Blob([buf], { type: mime }))
}

async function resolveAsset(localPath: string, cdnPath: string, mime: string): Promise<string> {
  try {
    return await toBlobURL(localPath, mime)
  } catch {
    return await toBlobURL(cdnPath, mime)
  }
}

export async function loadFFmpeg(): Promise<NormalizedFFmpeg> {
  if (ready.value && ffRef.value) return ffRef.value

  const mod: any = await import('@ffmpeg/ffmpeg')
  const hasClass = typeof mod?.FFmpeg === 'function'
  const hasFactory = typeof mod?.createFFmpeg === 'function'

  if (hasClass) {
    const coreURL = await resolveAsset('/ffmpeg/esm/ffmpeg-core.js', `${CDN_CORE_ESM}/ffmpeg-core.js`, 'text/javascript')
    const wasmURL = await resolveAsset('/ffmpeg/esm/ffmpeg-core.wasm', `${CDN_CORE_ESM}/ffmpeg-core.wasm`, 'application/wasm')
    const workerURL = await resolveAsset('/ffmpeg/esm/worker.js', CDN_FFMPEG_ESM_WORKER, 'text/javascript')

    const inst = new mod.FFmpeg()
    await inst.load({ coreURL, wasmURL, workerURL })

    ffRef.value = {
      writeFile: (p, d) => inst.writeFile(p, d),
      readFile: (p) => inst.readFile(p),
      exec: (args) => inst.exec(args),
      setProgress: (cb) => inst.on('progress', (e: any) => cb(typeof e?.progress === 'number' ? e.progress : 0))
    }
  } else if (hasFactory) {
    let corePath = '/ffmpeg/umd/ffmpeg-core.js'
    try {
      const res = await fetch(corePath, { method: 'HEAD' })
      if (!res.ok) corePath = `${CDN_CORE_UMD}/ffmpeg-core.js`
    } catch {
      corePath = `${CDN_CORE_UMD}/ffmpeg-core.js`
    }

    const inst = mod.createFFmpeg({ log: false, corePath })
    await inst.load()

    ffRef.value = {
      writeFile: async (p, d) => { inst.FS('writeFile', p, d) },
      readFile: async (p) => inst.FS('readFile', p) as Uint8Array,
      exec: (args) => inst.run(...args),
      setProgress: (cb) => inst.setProgress((info: any) => cb(typeof info?.ratio === 'number' ? info.ratio : 0))
    }
  } else {
    throw new Error('FFmpeg export not found')
  }

  ready.value = true
  return ffRef.value!
}

export async function probe(file: File): Promise<Record<string, any>> {
  const ff = await loadFFmpeg()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'dat'
  const nameIn = `input.${ext}`
  await ff.writeFile(nameIn, new Uint8Array(await file.arrayBuffer()))
  await ff.exec(['-i', nameIn, '-f', 'ffmetadata', 'meta.txt'])
  const meta = await ff.readFile('meta.txt')
  return { raw: new TextDecoder().decode(meta) }
}

const codecMap: Record<string, string> = {
  mp3: 'libmp3lame',
  m4a: 'aac',
  wav: 'pcm_s16le',
  flac: 'flac',
  ogg: 'libvorbis'
}

export async function transcode(
  file: File,
  {
    format,
    bitrateKbps,
    gainDb
  }: { format: string; bitrateKbps: number | null; gainDb: number },
  onProgress: (p: number) => void
): Promise<Uint8Array> {
  const ff = await loadFFmpeg()
  const nameIn = 'input.' + (file.name.split('.').pop() || 'dat')
  const nameOut = `output.${format}`

  ff.setProgress(onProgress)

  const args = [
    '-i',
    nameIn,
    '-af',
    `volume=${gainDb}dB`,
    ...(bitrateKbps ? ['-b:a', `${bitrateKbps}k`] : []),
    '-c:a',
    codecMap[format] ?? 'copy',
    '-f',
    format,
    '-y',
    nameOut
  ]

  await ff.writeFile(nameIn, new Uint8Array(await file.arrayBuffer()))
  await ff.exec(args)
  const data = await ff.readFile(nameOut)
  onProgress(1)
  return data
}
