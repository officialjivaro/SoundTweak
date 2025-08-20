export interface AudioMeta {
  name: string
  duration: number
  sampleRate: number
  channels: number
  container: string
  codec: string
  bitrateKbps: number | null
  loudnessLUFS: number
  truePeakDbTP: number
}
