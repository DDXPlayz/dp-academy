export function ProgressBar({
  value,
  label,
  size = 'md',
  tone = 'accent',
  className = '',
}: {
  value: number;
  label?: string;
  size?: 'sm' | 'md';
  tone?: 'accent' | 'good' | 'bad' | 'warn';
  className?: string;
}) {
  const v = Math.max(0, Math.min(1, value));
  const fill = { accent: 'bg-accent', good: 'bg-good', bad: 'bg-bad', warn: 'bg-warn' }[tone];
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-sunken ${size === 'sm' ? 'h-1' : 'h-1.5'} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-label={label}
    >
      <div
        className={`h-full rounded-full ${fill} transition-[width] duration-500 ease-out`}
        style={{ width: `${v * 100}%` }}
      />
    </div>
  );
}

/** A compact ring for subject cards. */
export function ProgressRing({ value, size = 40, colour }: { value: number; size?: number; colour?: string }) {
  const r = (size - 5) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sunken)" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={colour ?? 'var(--accent)'}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - v)}
        style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
      />
    </svg>
  );
}
