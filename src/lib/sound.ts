/**
 * Lightweight Web Audio synthesizer for optional micro-interaction feedback.
 * Default is OFF (Rule 02). Zero audio assets to download.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    this.enabled = false;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled && !this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.enabled && this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.enabled) {
      this.playTick(600, 0.04);
    }
    return this.enabled;
  }

  public playTick(freq = 440, duration = 0.03): void {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  }
}

export const sound = new SoundEngine();
