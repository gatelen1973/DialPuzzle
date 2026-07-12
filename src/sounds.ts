let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null
  }

  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

  if (!AudioContextClass) {
    return null
  }

  if (!audioContext) {
    audioContext = new AudioContextClass()
  }

  void audioContext.resume()
  return audioContext
}

function createGain(
  context: AudioContext,
  volume: number,
  start: number,
  attack = 0.01,
  release = 0.08,
) {
  const gain = context.createGain()
  const end = start + release
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, end)
  gain.connect(context.destination)
  return { gain, end }
}

export function playRotateSound() {
  const context = getContext()
  if (!context) {
    return
  }

  const start = context.currentTime
  const oscillator = context.createOscillator()
  const { gain, end } = createGain(context, 0.12, start, 0.005, 0.07)

  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(520, start)
  oscillator.frequency.exponentialRampToValueAtTime(220, end)
  oscillator.connect(gain)
  oscillator.start(start)
  oscillator.stop(end)
}

export function playHubFailSound() {
  const context = getContext()
  if (!context) {
    return
  }

  const start = context.currentTime
  const oscillator = context.createOscillator()
  const { gain, end } = createGain(context, 0.16, start, 0.004, 0.12)

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(140, start)
  oscillator.frequency.exponentialRampToValueAtTime(70, end)
  oscillator.connect(gain)
  oscillator.start(start)
  oscillator.stop(end)
}

export function playPuzzleSolvedSound() {
  const context = getContext()
  if (!context) {
    return
  }

  const start = context.currentTime
  const notes = [
    { freq: 523.25, offset: 0, hold: 0.16 },
    { freq: 659.25, offset: 0.11, hold: 0.16 },
    { freq: 783.99, offset: 0.22, hold: 0.16 },
    { freq: 1046.5, offset: 0.33, hold: 0.42 },
  ]

  for (const note of notes) {
    const noteStart = start + note.offset
    const oscillator = context.createOscillator()
    const harmonic = context.createOscillator()
    const gain = context.createGain()
    const harmonicGain = context.createGain()

    oscillator.type = 'sine'
    harmonic.type = 'triangle'
    oscillator.frequency.setValueAtTime(note.freq, noteStart)
    harmonic.frequency.setValueAtTime(note.freq * 2, noteStart)

    gain.gain.setValueAtTime(0.0001, noteStart)
    gain.gain.exponentialRampToValueAtTime(0.14, noteStart + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.hold)

    harmonicGain.gain.setValueAtTime(0.0001, noteStart)
    harmonicGain.gain.exponentialRampToValueAtTime(0.035, noteStart + 0.006)
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.hold * 0.75)

    oscillator.connect(gain)
    harmonic.connect(harmonicGain)
    gain.connect(context.destination)
    harmonicGain.connect(context.destination)
    oscillator.start(noteStart)
    harmonic.start(noteStart)
    oscillator.stop(noteStart + note.hold + 0.05)
    harmonic.stop(noteStart + note.hold + 0.05)
  }
}

export function playDoorsOpenSound() {
  const context = getContext()
  if (!context) {
    return
  }

  const start = context.currentTime
  const duration = 1.45

  const latch = context.createOscillator()
  const latchGain = context.createGain()
  latch.type = 'square'
  latch.frequency.setValueAtTime(920, start)
  latch.frequency.exponentialRampToValueAtTime(420, start + 0.05)
  latchGain.gain.setValueAtTime(0.0001, start)
  latchGain.gain.exponentialRampToValueAtTime(0.09, start + 0.004)
  latchGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.07)
  latch.connect(latchGain)
  latchGain.connect(context.destination)
  latch.start(start)
  latch.stop(start + 0.08)

  const scrapeBuffer = context.createBuffer(
    1,
    Math.floor(context.sampleRate * duration),
    context.sampleRate,
  )
  const scrapeData = scrapeBuffer.getChannelData(0)
  for (let i = 0; i < scrapeData.length; i += 1) {
    scrapeData[i] = Math.random() * 2 - 1
  }

  const scrape = context.createBufferSource()
  scrape.buffer = scrapeBuffer
  const scrapeFilter = context.createBiquadFilter()
  scrapeFilter.type = 'bandpass'
  scrapeFilter.frequency.setValueAtTime(280, start)
  scrapeFilter.frequency.linearRampToValueAtTime(520, start + duration * 0.7)
  scrapeFilter.Q.value = 0.7
  const scrapeGain = context.createGain()
  scrapeGain.gain.setValueAtTime(0.0001, start + 0.08)
  scrapeGain.gain.exponentialRampToValueAtTime(0.22, start + 0.22)
  scrapeGain.gain.setValueAtTime(0.18, start + 0.9)
  scrapeGain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  scrape.connect(scrapeFilter)
  scrapeFilter.connect(scrapeGain)
  scrapeGain.connect(context.destination)
  scrape.start(start + 0.08)
  scrape.stop(start + duration)

  const rumble = context.createOscillator()
  const rumbleGain = context.createGain()
  rumble.type = 'sine'
  rumble.frequency.setValueAtTime(52, start + 0.05)
  rumble.frequency.exponentialRampToValueAtTime(38, start + duration)
  rumbleGain.gain.setValueAtTime(0.0001, start + 0.05)
  rumbleGain.gain.exponentialRampToValueAtTime(0.24, start + 0.18)
  rumbleGain.gain.setValueAtTime(0.2, start + 1.05)
  rumbleGain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  rumble.connect(rumbleGain)
  rumbleGain.connect(context.destination)
  rumble.start(start + 0.05)
  rumble.stop(start + duration)

  const playHingeCreak = (offset: number, baseFreq: number) => {
    const creakStart = start + offset
    const creak = context.createOscillator()
    const creakGain = context.createGain()
    const creakFilter = context.createBiquadFilter()
    creak.type = 'sawtooth'
    creak.frequency.setValueAtTime(baseFreq, creakStart)
    creak.frequency.exponentialRampToValueAtTime(baseFreq * 0.55, creakStart + 0.75)
    creak.frequency.setValueAtTime(baseFreq * 0.7, creakStart + 0.82)
    creak.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, creakStart + 1.15)
    creakFilter.type = 'lowpass'
    creakFilter.frequency.value = 420
    creakGain.gain.setValueAtTime(0.0001, creakStart)
    creakGain.gain.exponentialRampToValueAtTime(0.05, creakStart + 0.04)
    creakGain.gain.setValueAtTime(0.045, creakStart + 0.5)
    creakGain.gain.exponentialRampToValueAtTime(0.0001, creakStart + 1.2)
    creak.connect(creakFilter)
    creakFilter.connect(creakGain)
    creakGain.connect(context.destination)
    creak.start(creakStart)
    creak.stop(creakStart + 1.25)
  }

  playHingeCreak(0.12, 165)
  playHingeCreak(0.22, 138)

  const settle = context.createOscillator()
  const settleGain = context.createGain()
  settle.type = 'triangle'
  settle.frequency.setValueAtTime(110, start + 1.18)
  settle.frequency.exponentialRampToValueAtTime(55, start + 1.35)
  settleGain.gain.setValueAtTime(0.0001, start + 1.18)
  settleGain.gain.exponentialRampToValueAtTime(0.1, start + 1.22)
  settleGain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4)
  settle.connect(settleGain)
  settleGain.connect(context.destination)
  settle.start(start + 1.18)
  settle.stop(start + 1.42)

  const reveal = context.createOscillator()
  const { gain: revealGain, end: revealEnd } = createGain(
    context,
    0.07,
    start + 1.05,
    0.03,
    0.55,
  )
  reveal.type = 'sine'
  reveal.frequency.setValueAtTime(330, start + 1.05)
  reveal.frequency.exponentialRampToValueAtTime(440, revealEnd)
  reveal.connect(revealGain)
  reveal.start(start + 1.05)
  reveal.stop(revealEnd)
}
