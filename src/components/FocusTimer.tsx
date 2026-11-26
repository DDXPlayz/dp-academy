import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Icon } from "./Icon";
import { showMoment } from "./PersonalTouches";

/*
 * A Pomodoro-style focus timer in the top bar. It lives on this device only
 * (localStorage), keeps running while you move between pages, survives a
 * reload, and chimes when a focus block or a break ends.
 */

type Mode = "focus" | "break";
const PRESETS = {
  short: { focus: 25, break: 5 },
  long: { focus: 50, break: 10 },
} as const;
type Preset = keyof typeof PRESETS;

interface TimerState {
  preset: Preset;
  mode: Mode;
  running: boolean;
  endsAt: number; // when running
  remaining: number; // ms, when paused
  done: { day: string; n: number }; // focus blocks finished today
  setPreset: (p: Preset) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  finish: () => void;
}

const minutes = (p: Preset, m: Mode) => PRESETS[p][m] * 60_000;
const day = () => new Date().toDateString();

export const useTimer = create<TimerState>()(
  persist(
    (set, get) => ({
      preset: "short",
      mode: "focus",
      running: false,
      endsAt: 0,
      remaining: minutes("short", "focus"),
      done: { day: day(), n: 0 },
      setPreset: (preset) =>
        set({
          preset,
          mode: "focus",
          running: false,
          remaining: minutes(preset, "focus"),
        }),
      start: () =>
        set((s) => ({ running: true, endsAt: Date.now() + s.remaining })),
      pause: () =>
        set((s) => ({
          running: false,
          remaining: Math.max(0, s.endsAt - Date.now()),
        })),
      reset: () =>
        set((s) => ({ running: false, remaining: minutes(s.preset, s.mode) })),
      // A block ended (or was skipped): switch to the other mode, ready to start.
      finish: () => {
        const s = get();
        const next: Mode = s.mode === "focus" ? "break" : "focus";
        const today = day();
        const done =
          s.mode === "focus"
            ? { day: today, n: (s.done.day === today ? s.done.n : 0) + 1 }
            : s.done;
        set({
          mode: next,
          running: false,
          remaining: minutes(s.preset, next),
          done,
        });
      },
    }),
    {
      name: "dp-academy:timer",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

function chime() {
  try {
    const ctx = new AudioContext();
    [660, 880].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.25);
      g.gain.exponentialRampToValueAtTime(
        0.2,
        ctx.currentTime + i * 0.25 + 0.02,
      );
      g.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + i * 0.25 + 0.6,
      );
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.25);
      o.stop(ctx.currentTime + i * 0.25 + 0.65);
    });
  } catch {
    /* audio not available */
  }
}

const fmt = (ms: number) => {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export function FocusTimer() {
  const t = useTimer();
  const [, tick] = useState(0);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const left = t.running ? Math.max(0, t.endsAt - Date.now()) : t.remaining;

  // Tick once a second while running; finish the block when time is up.
  useEffect(() => {
    if (!t.running) return;
    const id = setInterval(() => {
      if (Date.now() >= useTimer.getState().endsAt) {
        const wasFocus = useTimer.getState().mode === "focus";
        useTimer.getState().finish();
        chime();
        const breakNote = wasFocus ? showMoment("break") : null;
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(wasFocus ? "Focus block done" : "Break over", {
            body: wasFocus
              ? (breakNote ?? "Time for a short break.")
              : "Ready for the next focus block?",
          });
        }
      } else tick((n) => n + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [t.running]);

  // Show the countdown in the tab title while running.
  useEffect(() => {
    if (!t.running) return;
    const base = document.title.replace(/^\d+:\d\d (Focus|Break) · /, "");
    document.title = `${fmt(left)} ${t.mode === "focus" ? "Focus" : "Break"} · ${base}`;
    return () => {
      document.title = document.title.replace(/^\d+:\d\d (Focus|Break) · /, "");
    };
  });

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (
        e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !box.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const start = () => {
    if ("Notification" in window && Notification.permission === "default")
      void Notification.requestPermission();
    t.start();
  };
  const todayDone = t.done.day === day() ? t.done.n : 0;
  const active = t.running || left !== minutes(t.preset, t.mode);

  return (
    <div className="relative" ref={box}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`icon-btn w-auto gap-1.5 px-2 ${active ? "text-ink" : ""}`}
        aria-label={active ? `Focus timer, ${fmt(left)} left` : "Focus timer"}
        aria-expanded={open}
      >
        <Icon name="clock" size={18} />
        {active && (
          <span
            className={`font-mono text-sm tabular-nums ${t.mode === "break" ? "text-good" : ""}`}
          >
            {fmt(left)}
          </span>
        )}
      </button>
      {open && (
        <div
          className="card absolute right-0 top-11 z-40 w-64 p-4 shadow-lg"
          role="dialog"
          aria-label="Focus timer"
        >
          <p className="eyebrow">{t.mode === "focus" ? "Focus" : "Break"}</p>
          <p
            className="mt-1 font-mono text-4xl font-semibold tabular-nums text-ink"
            aria-live="polite"
          >
            {fmt(left)}
          </p>
          <div className="mt-3 flex gap-2">
            {t.running ? (
              <button
                type="button"
                className="btn-secondary flex-1"
                onClick={t.pause}
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary flex-1"
                onClick={start}
              >
                {active ? "Resume" : "Start"}
              </button>
            )}
            <button
              type="button"
              className="btn-ghost"
              onClick={t.reset}
              title="Reset this block"
            >
              <Icon name="rotate" size={16} />
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={t.finish}
              title={t.mode === "focus" ? "Skip to break" : "Skip break"}
            >
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
          <div
            role="radiogroup"
            aria-label="Timer length"
            className="mt-3 grid grid-cols-2 gap-1 rounded-lg bg-sunken p-1"
          >
            {(Object.keys(PRESETS) as Preset[]).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={t.preset === p}
                onClick={() => t.setPreset(p)}
                className={`h-7 rounded-md text-xs font-medium ${t.preset === p ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink"}`}
              >
                {PRESETS[p].focus} / {PRESETS[p].break} min
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            {todayDone
              ? `${todayDone} focus block${todayDone === 1 ? "" : "s"} done today.`
              : "Work in focused blocks with short breaks."}{" "}
            Keeps running while you move between pages.
          </p>
        </div>
      )}
    </div>
  );
}
