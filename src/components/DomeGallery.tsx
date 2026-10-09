'use client';

import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

export interface DomeImage {
  src: string;
  alt?: string;
}

interface DomeGalleryProps {
  images?: (string | DomeImage)[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  segments?: number;
  dragDampening?: number;
  imageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateSpeed?: number;
}

const DEFAULTS = {
  maxVerticalRotationDeg: 0,
  dragSensitivity: 20,
  segments: 34,
  dragDampening: 2,
  autoRotateSpeed: 0.04
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

interface GridItem {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
}

function buildItems(pool: (string | DomeImage)[], seg: number, isMobile: boolean): GridItem[] {
  // Mobile gets 3 spacious rows [-1, 0, 1] leaving ~180px pure black breathing room at top and bottom.
  // Desktop gets 5 rows [-2, -1, 0, 1, 2] for wide panoramic view.
  const rowYs = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2];

  const coords: { x: number; y: number; sizeX: number; sizeY: number }[] = [];

  for (let r = 0; r < rowYs.length; r++) {
    const y = rowYs[r];
    // Stagger alternate rows by half a card width for an interlocking brick mosaic
    const isOdd = Math.abs(y) % 2 === 1;
    const xOffset = isOdd ? 0.5 : 0;

    for (let c = 0; c < seg; c++) {
      const x = c + xOffset;
      coords.push({
        x,
        y,
        sizeX: 1,
        sizeY: 1
      });
    }
  }

  const totalSlots = coords.length;
  if (!pool || pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const normalizedImages: DomeImage[] = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  const L = normalizedImages.length;
  return coords.map((c, i) => {
    // Prime-stride 2D distribution so adjacent cards horizontally and vertically never repeat the same logo
    const r = Math.floor(i / seg);
    const col = i % seg;
    const imgIndex = (col * 3 + r * 7) % L;
    const item = normalizedImages[imgIndex];
    return {
      ...c,
      src: item.src,
      alt: item.alt || 'Mitra Retail'
    };
  });
}

export default function DomeGallery({
  images = [],
  fit = 1.0,
  fitBasis = 'auto',
  minRadius = 850,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#0A090D',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  segments = 28,
  dragDampening = DEFAULTS.dragDampening,
  imageBorderRadius = '14px',
  grayscale = false,
  autoRotateSpeed = DEFAULTS.autoRotateSpeed
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [rowHeight, setRowHeight] = useState(170);
  const [cardDim, setCardDim] = useState({ w: 220, h: 142 });

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const autoRotateRAF = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  const items = useMemo(() => buildItems(images, segments, isMobile), [images, segments, isMobile]);

  const applyTransform = useCallback((_xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateY(${yDeg}deg)`;
    }
  }, []);

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const mobile = w < 768;
      setIsMobile(mobile);

      // Gently curved panoramic wall:
      let radius = Math.max(1050, Math.round(w * 0.72 * fit));
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      // Exact pixel sizing:
      // Mobile: 3 rows with 28px vertical gap leaving plenty of top/bottom space
      // Desktop: 5 rows with 24px vertical gap
      const rH = mobile
        ? Math.round(Math.max(160, Math.min(195, h / 4.4)))
        : Math.round(Math.max(160, Math.min(220, h / 5.2)));
      const cH = Math.round(rH - (mobile ? 28 : 24));
      const slotW = (radius * 6.28318) / segments;
      const cW = Math.round(slotW * 0.90);

      setRowHeight(rH);
      setCardDim({ w: cW, h: cH });

      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(0, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    minRadius,
    maxRadius,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    applyTransform,
    segments
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  // Gentle auto-rotation when idle
  useEffect(() => {
    if (autoRotateSpeed <= 0) return;

    let rafId: number;
    const loop = () => {
      if (!isInteractingRef.current && !draggingRef.current && !inertiaRAF.current) {
        const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
        rotationRef.current.y = nextY;
        applyTransform(rotationRef.current.x, nextY);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    autoRotateRAF.current = rafId;

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [autoRotateSpeed, applyTransform]);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);

      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          isInteractingRef.current = false;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          isInteractingRef.current = false;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };

      stopInertia();
      isInteractingRef.current = true;
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        stopInertia();
        isInteractingRef.current = true;
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        const evt = event as MouseEvent | TouchEvent;
        const clientX = 'touches' in evt ? evt.touches[0].clientX : (evt as MouseEvent).clientX;
        const clientY = 'touches' in evt ? evt.touches[0].clientY : (evt as MouseEvent).clientY;
        startPosRef.current = { x: clientX, y: clientY };
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (!draggingRef.current || !startPosRef.current) return;
        const evt = event as MouseEvent | TouchEvent;
        const clientX = 'touches' in evt ? evt.touches[0].clientX : (evt as MouseEvent).clientX;
        const clientY = 'touches' in evt ? evt.touches[0].clientY : (evt as MouseEvent).clientY;
        const dxTotal = clientX - startPosRef.current.x;
        const dyTotal = clientY - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          let [vMagX, vMagY] = velocity;
          const [dirX, dirY] = direction;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
            startInertia(vx, vy);
          } else {
            isInteractingRef.current = false;
          }
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={
        {
          ['--segments-x' as string]: segments,
          ['--segments-y' as string]: segments,
          ['--overlay-blur-color' as string]: overlayBlurColor,
          ['--tile-radius' as string]: imageBorderRadius,
          ['--image-filter' as string]: grayscale ? 'grayscale(1)' : 'none'
        } as React.CSSProperties
      }
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => {
              const rotDeg = ((it.x * 360) / segments).toFixed(3);
              const posY = it.y * rowHeight;
              return (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="item"
                  data-src={it.src}
                  style={
                    {
                      width: `${cardDim.w}px`,
                      height: `${cardDim.h}px`,
                      marginLeft: `${-cardDim.w / 2}px`,
                      marginTop: `${-cardDim.h / 2}px`,
                      transform: `rotateY(${rotDeg}deg) translateZ(var(--radius, 1100px)) translateY(${posY}px)`
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="item__image"
                    role="img"
                    aria-label={it.alt || 'Brand Partner'}
                  >
                    <img src={it.src} draggable={false} alt={it.alt} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overlay" />
        <div className="gallery-fade-top" />
        <div className="gallery-fade-bottom" />
      </main>
    </div>
  );
}
