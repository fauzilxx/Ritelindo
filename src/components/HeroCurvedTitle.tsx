"use client";

import React, { useState } from "react";

// Symmetrical, well-spaced, thick-stem monumental letters for R-I-T-E-L-I-N-D-O
// - Comfortable, clean spacing (~24px gap between every letter) for effortless readability
// - Interactive per-letter hover effect: Only the hovered letter turns deep black (#1C1917)
// - Group-level drop shadow so letters NEVER cast shadows on each other
// - Pure, unclipped, solid #FAF6F0 typography with refined 4px stroke expansion
// - Baseline grounded flush at Y = 358 (viewBox height 360) touching the absolute bottom edge
// - Concave curve: Center L height 225px, Outer R and O height 340px (115px dramatic arch)
const LETTERS_DATA = [
  { char: "R", cx: 131, scaleX: 0.98, u: -1.0 },
  { char: "I", cx: 271, scaleX: 1.15, u: -0.75 },
  { char: "T", cx: 406, scaleX: 0.96, u: -0.5 },
  { char: "E", cx: 553, scaleX: 0.96, u: -0.25 },
  { char: "L", cx: 695, scaleX: 0.96, u: 0.0 }, // Center
  { char: "I", cx: 823, scaleX: 1.15, u: 0.25 },
  { char: "N", cx: 965, scaleX: 0.98, u: 0.5 },
  { char: "D", cx: 1132, scaleX: 0.98, u: 0.75 },
  { char: "O", cx: 1303, scaleX: 1.00, u: 1.0 },
];

const BASELINE = 358;
const FONT_SIZE = 215;
const CAP_HEIGHT = 150;
const CENTER_HEIGHT = 225;
const PEAK_EXTRA = 115; // Dramatic 115px concave curve

export default function HeroCurvedTitle() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex items-end justify-center overflow-visible select-none leading-none pb-0 mb-0">
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYBottom meet"
        className="w-full h-auto block max-h-[200px] sm:max-h-[280px] md:max-h-[360px] lg:max-h-[460px] xl:max-h-[520px]"
        aria-label="RITELINDO"
      >
        <defs>
          <filter id="hero-curved-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Group with filter applied to entire wordmark: NO individual letter shadow bleeding! */}
        <g filter="url(#hero-curved-shadow)">
          {LETTERS_DATA.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const letterHeight = CENTER_HEIGHT + PEAK_EXTRA * (item.u * item.u);
            const scaleY = (letterHeight / CAP_HEIGHT).toFixed(3);

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                transform={`translate(${item.cx}, ${BASELINE}) scale(${item.scaleX}, ${scaleY}) translate(-${item.cx}, -${BASELINE})`}
                style={{
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                <text
                  x={item.cx}
                  y={BASELINE}
                  textAnchor="middle"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontWeight="900"
                  fontSize={FONT_SIZE}
                  fill={isHovered ? "#1C1917" : "#FAF6F0"}
                  stroke={isHovered ? "#1C1917" : "#FAF6F0"}
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  paintOrder="stroke fill"
                  style={{
                    transition: "fill 0.25s ease, stroke 0.25s ease",
                    cursor: "pointer",
                  }}
                >
                  {item.char}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
