/**
 * Interactive Audio Engine for Penguin Wonderland
 * Provides a gentle ambient winter music-box synthesizer (Web Audio API),
 * a dedicated cheerful romantic instrumental Happy Birthday melody,
 * and interactive chime / sparkle sound effects.
 * 
 * Works out-of-the-box without requiring external audio files,
 * with automatic support for custom audio files (e.g. /public/audio/happy-birthday.mp3)
 * if supplied.
 */

import { siteConfig } from '../config/content';

export interface BirthdayAudioOptions {
    customUrl?: string;
    onStarted?: () => void;
    onEnded?: () => void;
}

export interface TrackInfo {
    title: string;
    subtitle: string;
}

class AudioEngine {
    private ctx: AudioContext | null = null;
    private isPlaying: boolean = false;
    private isMuted: boolean = false;
    private volume: number = 0.45;
    private masterGain: GainNode | null = null;
    private timerId: number | null = null;
    private scheduledTimeouts: number[] = [];
    private activeOscillators: OscillatorNode[] = [];
    private customAudioEl: HTMLAudioElement | null = null;
    private stepIndex: number = 0;
    private isHappyBirthdayActive: boolean = false;
    private currentTrack: TrackInfo = {
        title: siteConfig.audio.title,
        subtitle: siteConfig.audio.subtitle,
    };
    private listeners: Set<(playing: boolean, track: TrackInfo) => void> = new Set();

    // Pentatonic & diatonic cozy winter melody notes for ambient mode
    private melodyNotes: number[] = [
        523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25,
        659.25, 880.00, 987.77, 1046.50, 880.00, 783.99, 659.25, 587.33,
    ];

    private bassNotes: number[] = [
        130.81, 164.81, 174.61, 196.00, 220.00, 196.00, 174.61, 130.81,
    ];

    constructor() {
        // Automatically unlock on user gesture
        if (typeof window !== 'undefined') {
            const unlock = () => {
                this.unlockAudio();
                window.removeEventListener('click', unlock);
                window.removeEventListener('touchstart', unlock);
                window.removeEventListener('keydown', unlock);
            };
            window.addEventListener('click', unlock, { once: true, passive: true });
            window.addEventListener('touchstart', unlock, { once: true, passive: true });
            window.addEventListener('keydown', unlock, { once: true, passive: true });
        }
    }

    public initContext(): AudioContext {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            void this.ctx.resume();
        }
        return this.ctx;
    }

    /**
     * Unlock the Web Audio API context on first user gesture
     */
    public unlockAudio() {
        const ctx = this.initContext();
        if (ctx.state === 'suspended') {
            void ctx.resume();
        }
        try {
            const buffer = ctx.createBuffer(1, 1, 22050);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);
        } catch {
            // ignore
        }
    }

    public subscribe(listener: (playing: boolean, track: TrackInfo) => void) {
        this.listeners.add(listener);
        listener(this.isPlaying, this.currentTrack);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify() {
        this.listeners.forEach((fn) => fn(this.isPlaying, this.currentTrack));
    }

    public getCurrentTrack(): TrackInfo {
        return this.currentTrack;
    }

    /**
     * Synthesize a single gentle music-box bell tone
     */
    private playBellTone(freq: number, timeOffset: number = 0, duration: number = 2.4, gainMult: number = 0.5) {
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime + timeOffset;

        // Primary bell oscillator (sine)
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Overtone oscillator for crystalline chime shimmer (bell ratio 2.76)
        const overtone = this.ctx.createOscillator();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 2.76, now);

        // Envelope gain
        const noteGain = this.ctx.createGain();
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.25 * gainMult, now + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        const overGain = this.ctx.createGain();
        overGain.gain.setValueAtTime(0.0001, now);
        overGain.gain.exponentialRampToValueAtTime(0.08 * gainMult, now + 0.015);
        overGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.4));

        osc.connect(noteGain);
        overtone.connect(overGain);
        noteGain.connect(this.masterGain);
        overGain.connect(this.masterGain);

        this.activeOscillators.push(osc, overtone);

        osc.onended = () => {
            this.activeOscillators = this.activeOscillators.filter((o) => o !== osc);
        };
        overtone.onended = () => {
            this.activeOscillators = this.activeOscillators.filter((o) => o !== overtone);
        };

        osc.start(now);
        overtone.start(now);
        osc.stop(now + duration + 0.1);
        overtone.stop(now + duration * 0.5);
    }

    /**
     * Synthesize warm ambient low pad note
     */
    private playWarmPad(freq: number, timeOffset: number = 0, duration: number = 4.0) {
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const now = this.ctx.currentTime + timeOffset;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        const padGain = this.ctx.createGain();
        padGain.gain.setValueAtTime(0.0001, now);
        padGain.gain.linearRampToValueAtTime(0.12, now + 0.8);
        padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(padGain);
        padGain.connect(this.masterGain);

        this.activeOscillators.push(osc);
        osc.onended = () => {
            this.activeOscillators = this.activeOscillators.filter((o) => o !== osc);
        };

        osc.start(now);
        osc.stop(now + duration + 0.2);
    }

    /**
     * Check and play custom audio file (e.g. /public/audio/happy-birthday.mp3)
     */
    private tryPlayCustomAudio(url: string, options?: BirthdayAudioOptions): Promise<boolean> {
        return new Promise((resolve) => {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audio.loop = true; // Loop repeatedly per requirement
            let settled = false;

            const cleanup = () => {
                audio.removeEventListener('canplaythrough', onCanPlay);
                audio.removeEventListener('error', onError);
            };

            const onCanPlay = async () => {
                if (settled) return;
                settled = true;
                cleanup();

                audio.volume = 0;
                try {
                    await audio.play();
                    this.customAudioEl = audio;
                    this.isPlaying = true;
                    this.isHappyBirthdayActive = true;
                    this.currentTrack = {
                        title: siteConfig.audio.birthdayTitle || 'Happy Birthday, Daba!',
                        subtitle: siteConfig.audio.birthdaySubtitle || 'Playing just for you ♡',
                    };
                    this.notify();
                    options?.onStarted?.();

                    // Smooth 2s fade-in to 50% volume
                    const targetVolume = 0.5;
                    const startTime = performance.now();
                    const fadeInterval = window.setInterval(() => {
                        const elapsed = (performance.now() - startTime) / 2000;
                        if (elapsed >= 1) {
                            audio.volume = targetVolume;
                            clearInterval(fadeInterval);
                        } else {
                            audio.volume = Math.max(0, targetVolume * elapsed);
                        }
                    }, 50);

                    resolve(true);
                } catch {
                    resolve(false);
                }
            };

            const onError = () => {
                if (settled) return;
                settled = true;
                cleanup();
                resolve(false);
            };

            audio.addEventListener('canplaythrough', onCanPlay);
            audio.addEventListener('error', onError);
            audio.load();

            setTimeout(() => {
                if (!settled) {
                    settled = true;
                    cleanup();
                    resolve(false);
                }
            }, 600);
        });
    }

    /**
     * Start the synthesized romantic music-box Happy Birthday melody that plays repeatedly
     */
    private startHappyBirthdaySynthetic(options?: BirthdayAudioOptions) {
        const ctx = this.initContext();
        if (!this.masterGain) return;

        this.isPlaying = true;
        this.isHappyBirthdayActive = true;
        this.currentTrack = {
            title: siteConfig.audio.birthdayTitle || 'Happy Birthday, Daba!',
            subtitle: siteConfig.audio.birthdaySubtitle || 'Playing just for you ♡',
        };
        this.notify();

        // 2-second smooth fade-in to initial volume
        const now = ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(0.0001, now);
        this.masterGain.gain.linearRampToValueAtTime(0.5, now + 2.0);

        options?.onStarted?.();

        const beat = 0.58; // ~104 BPM in 3/4 time
        const b = (beats: number) => beats * beat;

        // Happy Birthday Melody in C Major: [frequency, offsetTime, duration, gainMultiplier]
        const melody: [number, number, number, number][] = [
            // Measure 0 pickup
            [392.00, b(0.00), 0.40, 0.50], // G4
            [392.00, b(0.75), 0.20, 0.45], // G4

            // Measure 1: "Happy Birthday to"
            [440.00, b(1.00), 0.55, 0.55], // A4
            [392.00, b(2.00), 0.55, 0.50], // G4
            [523.25, b(3.00), 0.55, 0.60], // C5

            // Measure 2: "you"
            [493.88, b(4.00), 1.10, 0.55], // B4
            [392.00, b(6.00), 0.40, 0.50], // G4
            [392.00, b(6.75), 0.20, 0.45], // G4

            // Measure 3: "Happy Birthday to"
            [440.00, b(7.00), 0.55, 0.55], // A4
            [392.00, b(8.00), 0.55, 0.50], // G4
            [587.33, b(9.00), 0.55, 0.60], // D5

            // Measure 4: "you"
            [523.25, b(10.00), 1.10, 0.60], // C5
            [392.00, b(12.00), 0.40, 0.50], // G4
            [392.00, b(12.75), 0.20, 0.45], // G4

            // Measure 5: "Happy Birthday dear Angela"
            [783.99, b(13.00), 0.55, 0.65], // G5
            [659.25, b(14.00), 0.55, 0.60], // E5
            [523.25, b(15.00), 0.55, 0.55], // C5
            [493.88, b(16.00), 0.55, 0.50], // B4
            [440.00, b(17.00), 0.55, 0.50], // A4
            [698.46, b(18.00), 0.40, 0.60], // F5
            [698.46, b(18.75), 0.20, 0.55], // F5

            // Measure 6: "Happy Birthday to"
            [659.25, b(19.00), 0.55, 0.60], // E5
            [523.25, b(20.00), 0.55, 0.55], // C5
            [587.33, b(21.00), 0.55, 0.55], // D5

            // Measure 7: "you!" (final resolution)
            [523.25, b(22.00), 2.20, 0.70], // C5
        ];

        // Harmonizing pads and gentle chord roots
        const chords: [number[], number, number][] = [
            [[130.81, 196.00, 329.63], b(1.00), 2.6], // C major
            [[98.00, 146.83, 246.94], b(4.00), 2.6],  // G major
            [[98.00, 146.83, 246.94], b(7.00), 2.6],  // G major
            [[130.81, 196.00, 329.63], b(10.00), 2.6], // C major
            [[130.81, 261.63, 329.63], b(13.00), 2.6], // C major
            [[87.31, 130.81, 220.00], b(16.00), 2.6],  // F major
            [[130.81, 196.00, 329.63], b(19.00), 1.5], // C major
            [[98.00, 146.83, 246.94], b(21.00), 1.5],  // G major
            [[130.81, 196.00, 261.63, 329.63, 523.25], b(22.00), 4.5], // Final full C major chord
        ];

        // Romantic crystalline sparkle cascade after resolution
        const sparkles: [number, number][] = [
            [659.25, b(23.2)], // E5
            [783.99, b(23.5)], // G5
            [1046.50, b(23.8)], // C6
            [1318.51, b(24.1)], // E6
            [1567.98, b(24.5)], // G6
        ];

        const playCycle = () => {
            if (!this.isPlaying || !this.isHappyBirthdayActive) return;

            // Schedule melody notes
            melody.forEach(([freq, offset, dur, gain]) => {
                this.playBellTone(freq, offset, dur, gain);
            });

            // Schedule chord accompaniment
            chords.forEach(([freqs, offset, dur]) => {
                freqs.forEach((f) => {
                    this.playWarmPad(f, offset, dur);
                });
            });

            // Schedule sparkle cascade
            sparkles.forEach(([freq, offset]) => {
                this.playBellTone(freq, offset, 1.6, 0.35);
            });

            // Loop repeatedly: after cycle finishes (b(25) + 3.0s), wait 2.0s peaceful pause, then repeat!
            const cycleDurationMs = (b(25) + 3.0) * 1000;
            const loopTimeout = window.setTimeout(() => {
                if (this.isPlaying && this.isHappyBirthdayActive) {
                    playCycle();
                }
            }, cycleDurationMs + 2000);

            this.scheduledTimeouts.push(loopTimeout);
        };

        playCycle();
    }

    /**
     * Primary entry point for Happy Birthday trigger (switches music and plays repeatedly)
     */
    public playHappyBirthday(options?: BirthdayAudioOptions) {
        // Stop any previous ambient loop to seamlessly switch to Happy Birthday
        if (this.isPlaying && !this.isHappyBirthdayActive) {
            this.stopInternal();
        } else if (this.isPlaying && this.isHappyBirthdayActive) {
            return;
        }

        const ctx = this.initContext();
        if (ctx.state === 'suspended') {
            void ctx.resume();
        }

        const customUrl = options?.customUrl || siteConfig.audio.happyBirthdayUrl;

        // If custom MP3 URL is provided and non-empty, try playing it
        if (customUrl && customUrl.trim() !== '') {
            void this.tryPlayCustomAudio(customUrl, options).then((played) => {
                if (!played) {
                    this.startHappyBirthdaySynthetic(options);
                }
            });
            return;
        }

        // Direct synthetic playback (zero delay, immediate start)
        this.startHappyBirthdaySynthetic(options);
    }

    /**
     * Start ambient penguin music (played automatically upon clicking "Enter the Penguin World")
     */
    public start(customUrl?: string) {
        if (this.isPlaying) return;

        this.isHappyBirthdayActive = false;
        this.currentTrack = {
            title: siteConfig.audio.title,
            subtitle: siteConfig.audio.subtitle,
        };

        if (customUrl) {
            try {
                if (!this.customAudioEl) {
                    this.customAudioEl = new Audio(customUrl);
                    this.customAudioEl.loop = true;
                    this.customAudioEl.volume = this.volume;
                }
                void this.customAudioEl.play();
                this.isPlaying = true;
                this.notify();
                return;
            } catch {
                // fallback to synthetic music box
            }
        }

        this.initContext();
        this.isPlaying = true;
        this.notify();

        const stepDuration = 680; // ms per note

        const tick = () => {
            if (!this.isPlaying || this.isHappyBirthdayActive) return;

            const noteFreq = this.melodyNotes[this.stepIndex % this.melodyNotes.length];
            this.playBellTone(noteFreq, 0, 2.8, 0.45);

            if (this.stepIndex % 4 === 0) {
                const bassFreq = this.bassNotes[Math.floor(this.stepIndex / 4) % this.bassNotes.length];
                this.playWarmPad(bassFreq, 0, 3.2);
            }

            if (this.stepIndex % 3 === 0) {
                this.playBellTone(noteFreq * 2, 0.22, 1.4, 0.18);
            }

            this.stepIndex++;
            this.timerId = window.setTimeout(tick, stepDuration);
        };

        tick();
    }

    /**
     * Internal stop without clearing track info (for switching modes)
     */
    private stopInternal() {
        this.isPlaying = false;

        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        if (this.scheduledTimeouts.length > 0) {
            this.scheduledTimeouts.forEach(clearTimeout);
            this.scheduledTimeouts = [];
        }

        this.activeOscillators.forEach((osc) => {
            try {
                osc.stop();
                osc.disconnect();
            } catch {
                // ignore
            }
        });
        this.activeOscillators = [];

        if (this.customAudioEl) {
            this.customAudioEl.pause();
            this.customAudioEl.currentTime = 0;
            this.customAudioEl = null;
        }
    }

    public stop() {
        this.isHappyBirthdayActive = false;
        this.stopInternal();
        this.notify();
    }

    public toggle(customUrl?: string) {
        if (this.isPlaying) {
            this.stop();
        } else {
            if (this.isHappyBirthdayActive) {
                this.playHappyBirthday();
            } else {
                this.start(customUrl);
            }
        }
    }

    public toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        }
        if (this.customAudioEl) {
            this.customAudioEl.muted = this.isMuted;
        }
    }

    public setVolume(vol: number) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.masterGain && this.ctx && !this.isMuted) {
            this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
        if (this.customAudioEl) {
            this.customAudioEl.volume = this.volume;
        }
    }

    public getIsPlaying(): boolean {
        return this.isPlaying;
    }

    public getIsMuted(): boolean {
        return this.isMuted;
    }

    // ==========================================
    // Interactive Sound Effects
    // ==========================================

    /** Soft celebratory sparkle burst (Gift reveal / Replay) */
    public playGiftBurst() {
        this.initContext();
        if (this.isMuted) return;

        const burstNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        burstNotes.forEach((freq, idx) => {
            this.playBellTone(freq, idx * 0.06, 2.0, 0.4);
        });
    }

    /** Envelope unfolding gentle glissando */
    public playEnvelopeOpen() {
        this.initContext();
        if (this.isMuted) return;

        const gliss = [440.00, 554.37, 659.25, 880.00];
        gliss.forEach((freq, idx) => {
            this.playBellTone(freq, idx * 0.08, 1.8, 0.35);
        });
    }

    /** Subtle interactive click chime */
    public playClickChime() {
        this.initContext();
        if (this.isMuted) return;
        this.playBellTone(880.00, 0, 1.2, 0.25);
    }

    /** Little penguin footprint soft tap */
    public playFootprint() {
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.exponentialRampToValueAtTime(70, now + 0.06);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.07);
        } catch {
            // ignore
        }
    }
}

export const sound = new AudioEngine();
