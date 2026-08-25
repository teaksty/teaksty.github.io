import type { VisualKey } from '@/data/projects';

/**
 * Drawn stand-ins for project imagery.
 *
 * These are schematic diagrams of each product — not decoration. They are
 * deterministic (no random values, so no hydration mismatch), weightless
 * (inline SVG, no request, no layout shift) and monochrome, so the page keeps
 * its single accent.
 *
 * When real screenshots exist, set `image` on the project and these are unused.
 */

type Props = {
  variant: VisualKey;
  className?: string;
};

const strokeSoft = 'rgba(255,255,255,0.14)';
const strokeFaint = 'rgba(255,255,255,0.07)';
const fillSoft = 'rgba(255,255,255,0.06)';
const fillMid = 'rgba(255,255,255,0.11)';
const fillStrong = 'rgba(255,255,255,0.22)';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 1200 750"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      focusable="false"
      className="h-full w-full"
    >
      <rect width="1200" height="750" fill="var(--bg-media)" />
      {children}
    </svg>
  );
}

/** Repeated horizontal bars, used for text and table stand-ins. */
function Bars({
  x,
  y,
  width,
  gap = 14,
  height = 6,
  count,
  widths,
  fill = fillSoft,
}: {
  x: number;
  y: number;
  width: number;
  gap?: number;
  height?: number;
  count: number;
  widths?: number[];
  fill?: string;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * (height + gap)}
          width={widths ? width * widths[i % widths.length] : width}
          height={height}
          fill={fill}
        />
      ))}
    </g>
  );
}

/** CoreBots: a rail of sections and a grid of bot tiles with run state. */
function Launcher() {
  const tiles = Array.from({ length: 8 }, (_, i) => i);
  return (
    <Frame>
      <line x1="180" y1="60" x2="180" y2="690" stroke={strokeFaint} />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x="66" y={110 + i * 82} width="46" height="46" rx="12" fill={fillSoft} />
          <rect x="126" y={126 + i * 82} width="34" height="7" fill={fillSoft} />
        </g>
      ))}

      <rect x="230" y="80" width="180" height="12" fill={fillStrong} />
      <rect x="230" y="112" width="300" height="8" fill={fillSoft} />

      {tiles.map((i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 230 + col * 232;
        const y = 170 + row * 210;
        const running = i === 1 || i === 6;
        return (
          <g key={i}>
            <rect x={x} y={y} width="200" height="176" rx="16" fill={fillSoft} stroke={strokeFaint} />
            <rect x={x + 22} y={y + 26} width="44" height="44" rx="12" fill={fillMid} />
            <rect x={x + 22} y={y + 92} width="120" height="9" fill={fillMid} />
            <rect x={x + 22} y={y + 114} width="80" height="7" fill={fillSoft} />
            <circle cx={x + 176} cy={y + 32} r="5" fill={running ? 'var(--accent)' : 'rgba(255,255,255,0.16)'} />
            <rect x={x + 22} y={y + 140} width="86" height="18" rx="9" fill={running ? fillStrong : fillSoft} />
          </g>
        );
      })}

      <line x1="230" y1="626" x2="1140" y2="626" stroke={strokeFaint} />
      <rect x="230" y="654" width="150" height="8" fill={fillSoft} />
      <rect x="1050" y="654" width="90" height="8" fill={fillMid} />
    </Frame>
  );
}

/** teaksty.store: filter column and a grid of product cards. */
function Catalog() {
  const cards = Array.from({ length: 6 }, (_, i) => i);
  return (
    <Frame>
      <line x1="60" y1="128" x2="1140" y2="128" stroke={strokeSoft} />
      <rect x="60" y="76" width="130" height="12" fill={fillStrong} />
      <rect x="980" y="78" width="160" height="9" fill={fillSoft} />

      {/* Filters */}
      <Bars x={60} y={176} width={150} count={7} gap={30} height={8} widths={[0.8, 1, 0.6, 0.9]} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="60" y={172 + i * 38} width="10" height="10" fill={i === 1 ? 'var(--accent)' : 'transparent'} stroke={strokeSoft} />
      ))}

      {/* Cards */}
      {cards.map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 280 + col * 296;
        const y = 172 + row * 300;
        return (
          <g key={i}>
            <rect x={x} y={y} width="256" height="212" fill={fillSoft} stroke={strokeFaint} />
            <path
              d={`M ${x + 78} ${y + 62} l 26 -14 h 48 l 26 14 -14 26 -12 -6 v 76 h -48 v -76 l -12 6 z`}
              fill="none"
              stroke={strokeSoft}
            />
            <rect x={x} y={y + 232} width="150" height="9" fill={fillMid} />
            <rect x={x} y={y + 252} width="70" height="8" fill={fillSoft} />
          </g>
        );
      })}
    </Frame>
  );
}

/** CoreCloud: record, elapsed arc and the ten-band equaliser. */
function Player() {
  const bands = [46, 62, 38, 74, 58, 88, 52, 70, 44, 60];
  return (
    <Frame>
      <circle cx="470" cy="330" r="212" fill="none" stroke={strokeSoft} />
      {[172, 134, 96, 58].map((r) => (
        <circle key={r} cx="470" cy="330" r={r} fill="none" stroke={strokeFaint} />
      ))}
      <circle cx="470" cy="330" r="15" fill="rgba(255,255,255,0.18)" />
      <path d="M 470 118 A 212 212 0 0 1 682 330" fill="none" stroke="var(--accent)" strokeWidth="1.5" />

      {/* Equaliser */}
      {bands.map((value, i) => (
        <g key={i}>
          <line x1={790 + i * 34} y1="150" x2={790 + i * 34} y2="400" stroke={strokeFaint} />
          <rect x={784 + i * 34} y={400 - value * 2.4} width="12" height="6" fill={fillStrong} />
        </g>
      ))}
      <line x1="790" y1="275" x2="1096" y2="275" stroke={strokeFaint} strokeDasharray="2 6" />

      {/* Transport */}
      <line x1="120" y1="640" x2="1080" y2="640" stroke={strokeFaint} />
      <line x1="120" y1="640" x2="520" y2="640" stroke="rgba(255,255,255,0.5)" />
      <circle cx="520" cy="640" r="4" fill="rgba(255,255,255,0.7)" />
      <rect x="120" y="586" width="130" height="9" fill={fillMid} />
      <rect x="120" y="606" width="80" height="7" fill={fillSoft} />
      <rect x="1000" y="586" width="80" height="9" fill={fillSoft} />
    </Frame>
  );
}

/** Product detail: a garment flat, care symbols and measurement ticks. */
function Garment() {
  return (
    <Frame>
      {/* Flat drawing of a jacket */}
      <path
        d="M 470 180 L 560 148 L 640 180 L 700 220 L 668 300 L 636 284 L 636 560 L 470 560 L 470 284 L 438 300 L 406 220 Z"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.45)"
      />
      <path d="M 553 152 L 553 560" stroke={strokeSoft} />
      <path d="M 470 148 L 553 210 L 640 148" fill="none" stroke={strokeSoft} />
      {[300, 356, 412, 468].map((y) => (
        <circle key={y} cx="553" cy={y} r="5" fill="none" stroke={strokeSoft} />
      ))}

      {/* Measurement ticks */}
      <line x1="380" y1="284" x2="380" y2="560" stroke={strokeFaint} />
      <line x1="372" y1="284" x2="388" y2="284" stroke={strokeSoft} />
      <line x1="372" y1="560" x2="388" y2="560" stroke={strokeSoft} />
      <line x1="470" y1="620" x2="636" y2="620" stroke={strokeFaint} />
      <line x1="470" y1="612" x2="470" y2="628" stroke={strokeSoft} />
      <line x1="636" y1="612" x2="636" y2="628" stroke={strokeSoft} />

      {/* Care symbols, ISO-flavoured */}
      <g transform="translate(820,200)">
        <path d="M 0 20 L 12 0 h 56 l 12 20 v 44 h -80 z" fill="none" stroke={strokeSoft} />
        <circle cx="40" cy="42" r="14" fill="none" stroke={strokeSoft} />
        <g transform="translate(0,110)">
          <rect x="0" y="0" width="80" height="64" fill="none" stroke={strokeSoft} />
          <circle cx="40" cy="32" r="16" fill="none" stroke={strokeSoft} />
          <circle cx="40" cy="32" r="4" fill={fillStrong} />
        </g>
        <g transform="translate(0,220)">
          <path d="M 8 10 L 40 54 L 72 10" fill="none" stroke={strokeSoft} />
          <path d="M 8 10 h 64" stroke={strokeSoft} />
        </g>
      </g>
      <rect x="820" y="540" width="4" height="52" fill="var(--accent)" />
      <Bars x={840} y={548} width={220} count={3} gap={12} height={8} widths={[1, 0.7, 0.85]} />
    </Frame>
  );
}

/** Vecini: a phone frame with a feed and a bottom rail. */
function Feed() {
  const cards = [0, 1, 2];
  return (
    <Frame>
      <rect x="420" y="60" width="360" height="690" rx="34" fill="rgba(255,255,255,0.03)" stroke={strokeSoft} />
      <rect x="546" y="86" width="108" height="8" rx="4" fill={fillMid} />

      <rect x="452" y="130" width="140" height="11" fill={fillStrong} />
      <rect x="452" y="162" width="296" height="34" rx="17" fill={fillSoft} />

      {cards.map((i) => (
        <g key={i} transform={`translate(452, ${222 + i * 150})`}>
          <rect width="296" height="128" rx="14" fill={fillSoft} stroke={strokeFaint} />
          <circle cx="34" cy="34" r="16" fill={fillMid} />
          <rect x="62" y="26" width="120" height="9" fill={fillMid} />
          <rect x="62" y="44" width="70" height="7" fill={fillSoft} />
          <rect x="20" y="72" width="240" height="7" fill={fillSoft} />
          <rect x="20" y="90" width="180" height="7" fill={fillSoft} />
          <rect x="212" y="82" width="64" height="24" rx="12" fill={i === 0 ? 'rgba(224,83,59,0.18)' : fillSoft} />
        </g>
      ))}

      <line x1="420" y1="670" x2="780" y2="670" stroke={strokeFaint} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={462 + i * 62}
          y="700"
          width="26"
          height="8"
          rx="4"
          fill={i === 0 ? 'var(--accent)' : fillSoft}
        />
      ))}

      {/* Desktop rail, the same app one breakpoint up */}
      <line x1="880" y1="60" x2="880" y2="750" stroke={strokeFaint} />
      <Bars x={920} y={150} width={180} count={6} gap={44} height={9} widths={[1, 0.6, 0.8, 0.5]} />
    </Frame>
  );
}

/** Poskot: a real street network with building footprints. */
function StreetMap() {
  const verticals = [180, 330, 505, 690, 880, 1040];
  const horizontals = [170, 300, 440, 580];
  return (
    <Frame>
      {verticals.map((x, i) => (
        <line key={x} x1={x - i * 6} y1="60" x2={x + i * 10} y2="700" stroke={i === 3 ? strokeSoft : strokeFaint} strokeWidth={i === 3 ? 2.5 : 1} />
      ))}
      {horizontals.map((y, i) => (
        <line key={y} x1="60" y1={y} x2="1140" y2={y + i * 14} stroke={i === 1 ? strokeSoft : strokeFaint} strokeWidth={i === 1 ? 2.5 : 1} />
      ))}
      <path d="M 60 640 C 300 620 520 668 760 626 S 1080 596 1140 618" fill="none" stroke={strokeFaint} />

      {/* Footprints — panel blocks, laid along the streets */}
      {Array.from({ length: 26 }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const long = (i * 7) % 3 === 0;
        return (
          <rect
            key={i}
            x={210 + col * 132 + (row % 2) * 18}
            y={196 + row * 138}
            width={long ? 96 : 52}
            height={long ? 26 : 44}
            fill={fillSoft}
            stroke={strokeFaint}
          />
        );
      })}
      <circle cx="505" cy="440" r="6" fill="var(--accent)" />
      <circle cx="505" cy="440" r="18" fill="none" stroke={strokeSoft} />
    </Frame>
  );
}

/** Jarvis / karaoke: a waveform and the line it resolved to. */
function Voice() {
  const amplitudes = [
    18, 34, 26, 58, 44, 82, 66, 104, 74, 120, 92, 138, 108, 96, 130, 84, 112, 70, 92, 54, 76, 40,
    58, 30, 44, 22, 34, 16, 26, 12,
  ];
  return (
    <Frame>
      <line x1="60" y1="330" x2="1140" y2="330" stroke={strokeFaint} />
      {amplitudes.map((a, i) => (
        <rect
          key={i}
          x={80 + i * 35}
          y={330 - a}
          width="10"
          height={a * 2}
          fill={i === 13 ? 'var(--accent)' : i < 13 ? fillStrong : fillSoft}
        />
      ))}
      <line x1="535" y1="150" x2="535" y2="510" stroke={strokeSoft} />

      <Bars x={80} y={560} width={700} count={2} gap={22} height={10} widths={[1, 0.62]} fill={fillMid} />
      <Bars x={80} y={624} width={700} count={1} gap={22} height={10} widths={[0.4]} />
      <rect x="980" y="556" width="160" height="10" fill={fillSoft} />
      <rect x="980" y="588" width="110" height="10" fill={fillSoft} />
    </Frame>
  );
}

const visuals: Record<VisualKey, () => React.JSX.Element> = {
  launcher: Launcher,
  catalog: Catalog,
  player: Player,
  garment: Garment,
  feed: Feed,
  map: StreetMap,
  voice: Voice,
};

export function ProjectVisual({ variant, className }: Props) {
  const Visual = visuals[variant] ?? Launcher;
  return (
    <div className={className}>
      <Visual />
    </div>
  );
}
