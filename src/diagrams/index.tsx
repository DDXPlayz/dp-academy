import type { ComponentType, ReactNode } from 'react';

/*
 * Original diagrams, drawn as SVG so they stay crisp, theme with the page and
 * carry real alt text. Referenced from lessons by name in a ```diagram block.
 */

function Figure({ label, caption, viewBox, children }: { label: string; caption: string; viewBox: string; children: ReactNode }) {
  return (
    <figure className="my-2">
      <div className="rounded-xl border border-line bg-card p-4">
        <svg viewBox={viewBox} role="img" aria-label={label} className="mx-auto block h-auto w-full max-w-lg text-ink" fontFamily="inherit">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="context-stroke" />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

const ACCENT = 'var(--accent)';
const MUTED = 'var(--muted)';
const GOOD = 'var(--good)';
const BAD = 'var(--bad)';
const T = { fontSize: 13, fill: 'currentColor' } as const;
const S = { fontSize: 12, fill: MUTED } as const;

function VelocityTime() {
  return (
    <Figure
      viewBox="0 0 420 240"
      label="Velocity–time graph: velocity rises linearly from 4 m/s to 12 m/s over 4 seconds. The shaded trapezium under the line is the displacement."
      caption="The gradient of a v–t graph is acceleration; the area under it is displacement."
    >
      <path d="M60 200h330M60 200V20" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arr)" fill="none" />
      <path d="M60 150 300 50V200H60z" fill={ACCENT} opacity="0.12" />
      <path d="M60 150 300 50" stroke={ACCENT} strokeWidth="2.5" fill="none" />
      <path d="M200 92h100V50" stroke={MUTED} strokeDasharray="4 4" fill="none" />
      <text x="250" y="108" textAnchor="middle" {...S}>Δt</text>
      <text x="308" y="76" {...S}>Δv</text>
      <text x="180" y="165" textAnchor="middle" {...T}>area = displacement</text>
      <text x="395" y="205" {...T}>t / s</text>
      <text x="30" y="22" {...T}>v / m s⁻¹</text>
      <text x="52" y="154" textAnchor="end" {...S}>4</text>
      <text x="52" y="54" textAnchor="end" {...S}>12</text>
      <text x="300" y="218" textAnchor="middle" {...S}>4</text>
      <text x="60" y="218" textAnchor="middle" {...S}>0</text>
      <text x="250" y="40" fill={ACCENT} fontSize="13">gradient = a</text>
    </Figure>
  );
}

function Projectile() {
  // Parabola from (50,200) peaking at (210,50), landing at (370,200).
  return (
    <Figure
      viewBox="0 0 420 240"
      label="Projectile path: a parabola. At launch the velocity has horizontal and vertical components; at the top the vertical component is zero; the horizontal component stays the same throughout."
      caption="Without air resistance, the horizontal velocity is constant and only the vertical velocity changes."
    >
      <path d="M20 200h390" stroke={MUTED} strokeWidth="1" />
      <path d="M50 200Q210 -100 370 200" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
      <path d="M50 200l48-90" stroke={ACCENT} strokeWidth="2.5" markerEnd="url(#arr)" />
      <path d="M50 200h48" stroke={GOOD} strokeWidth="2" markerEnd="url(#arr)" />
      <path d="M50 200v-90" stroke={BAD} strokeWidth="2" markerEnd="url(#arr)" />
      <text x="104" y="104" fill={ACCENT} fontSize="13">u</text>
      <text x="80" y="218" fill={GOOD} fontSize="13" textAnchor="middle">u cos θ</text>
      <text x="40" y="150" fill={BAD} fontSize="13" textAnchor="end">u sin θ</text>
      <path d="M72 200a22 22 0 0 0-9-18" stroke={MUTED} fill="none" />
      <text x="80" y="190" {...S}>θ</text>
      <circle cx="210" cy="50" r="5" fill="currentColor" />
      <path d="M210 50h60" stroke={GOOD} strokeWidth="2" markerEnd="url(#arr)" />
      <text x="210" y="34" textAnchor="middle" {...S}>top: vertical velocity = 0</text>
      <path d="M210 200v-4M370 200v-4" stroke={MUTED} />
      <text x="210" y="218" textAnchor="middle" {...S}>half the range</text>
      <text x="370" y="218" textAnchor="middle" {...S}>range R</text>
    </Figure>
  );
}

function FreeBody() {
  return (
    <Figure
      viewBox="0 0 420 240"
      label="Free-body diagram of a box pulled to the right along a rough floor: weight acts down, normal force acts up, the pull acts to the right and friction acts to the left."
      caption="A free-body diagram shows only the forces acting on the chosen object, each starting from the object."
    >
      <path d="M40 170h340" stroke={MUTED} strokeWidth="1.5" />
      <path d="M40 170l-10 12M80 170l-10 12M120 170l-10 12M160 170l-10 12M200 170l-10 12M240 170l-10 12M280 170l-10 12M320 170l-10 12M360 170l-10 12" stroke={MUTED} />
      <rect x="160" y="100" width="100" height="70" rx="4" fill="var(--sunken)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="210" cy="135" r="3" fill="currentColor" />
      <path d="M210 135v90" stroke={BAD} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="220" y="228" fill={BAD} fontSize="13">weight W = mg</text>
      <path d="M210 135V35" stroke={GOOD} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="220" y="40" fill={GOOD} fontSize="13">normal force N</text>
      <path d="M210 135h150" stroke={ACCENT} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="330" y="125" fill={ACCENT} fontSize="13">pull P</text>
      <path d="M210 135H110" stroke="var(--warn)" strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="70" y="125" fill="var(--warn)" fontSize="13">friction F</text>
    </Figure>
  );
}

function Circular() {
  return (
    <Figure
      viewBox="0 0 420 260"
      label="Uniform circular motion: an object on a circle has velocity along the tangent and acceleration and net force pointing to the centre."
      caption="In uniform circular motion the speed is constant but the velocity keeps changing direction, so there is a centripetal acceleration towards the centre."
    >
      <circle cx="200" cy="130" r="95" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      <circle cx="200" cy="130" r="3" fill="currentColor" />
      <text x="190" y="150" {...S}>centre</text>
      <path d="M200 130 267 63" stroke={MUTED} strokeDasharray="3 4" />
      <text x="220" y="90" {...S}>r</text>
      <circle cx="267" cy="63" r="7" fill={ACCENT} />
      <path d="M267 63l70 70" stroke={GOOD} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="342" y="148" fill={GOOD} fontSize="13">velocity v (tangent)</text>
      <path d="M262 68l-40 40" stroke={BAD} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="96" y="64" fill={BAD} fontSize="13">a and F</text>
      <text x="96" y="80" fill={BAD} fontSize="13">towards centre</text>
    </Figure>
  );
}

function Collision() {
  return (
    <Figure
      viewBox="0 0 420 200"
      label="Two trolleys before and after a collision. Before: a 2 kg trolley at 3 m/s approaches a 1 kg trolley at rest. After: they stick together and move at 2 m/s."
      caption="Total momentum is the same before and after: 2 × 3 + 1 × 0 = 3 × 2 = 6 kg m s⁻¹."
    >
      <text x="20" y="30" {...T} fontWeight="600">Before</text>
      <path d="M20 85h380M20 175h380" stroke={MUTED} />
      <rect x="60" y="50" width="70" height="35" rx="4" fill={ACCENT} opacity="0.85" />
      <text x="95" y="72" textAnchor="middle" fill="var(--on-accent)" fontSize="13">2 kg</text>
      <path d="M135 67h50" stroke={GOOD} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="160" y="58" textAnchor="middle" fill={GOOD} fontSize="13">3 m/s</text>
      <rect x="250" y="55" width="50" height="30" rx="4" fill="var(--sunken)" stroke="currentColor" />
      <text x="275" y="75" textAnchor="middle" {...T}>1 kg</text>
      <text x="275" y="45" textAnchor="middle" {...S}>at rest</text>
      <text x="20" y="120" {...T} fontWeight="600">After</text>
      <rect x="160" y="140" width="70" height="35" rx="4" fill={ACCENT} opacity="0.85" />
      <text x="195" y="162" textAnchor="middle" fill="var(--on-accent)" fontSize="13">2 kg</text>
      <rect x="230" y="145" width="50" height="30" rx="4" fill="var(--sunken)" stroke="currentColor" />
      <text x="255" y="165" textAnchor="middle" {...T}>1 kg</text>
      <path d="M285 160h50" stroke={GOOD} strokeWidth="2.5" markerEnd="url(#arr)" />
      <text x="310" y="150" textAnchor="middle" fill={GOOD} fontSize="13">2 m/s</text>
    </Figure>
  );
}

function ForceDisplacement() {
  return (
    <Figure
      viewBox="0 0 420 220"
      label="Force against displacement graph for stretching a spring: a straight line through the origin. The triangular area under it is the work done."
      caption="Work done is the area under a force–displacement graph. For a spring that area is a triangle: ½Fx = ½kx²."
    >
      <path d="M60 180h320M60 180V20" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arr)" fill="none" />
      <path d="M60 180 300 50V180z" fill={ACCENT} opacity="0.12" />
      <path d="M60 180 300 50" stroke={ACCENT} strokeWidth="2.5" />
      <text x="220" y="160" textAnchor="middle" {...T}>work done = area</text>
      <text x="385" y="185" {...T}>x</text>
      <text x="40" y="22" {...T}>F</text>
      <path d="M300 50H60" stroke={MUTED} strokeDasharray="4 4" />
      <text x="52" y="54" textAnchor="end" {...S}>F</text>
      <text x="300" y="198" textAnchor="middle" {...S}>x</text>
    </Figure>
  );
}

export const diagrams: Record<string, ComponentType> = {
  'velocity-time': VelocityTime,
  projectile: Projectile,
  'free-body': FreeBody,
  circular: Circular,
  collision: Collision,
  'force-displacement': ForceDisplacement,
};
