"use client";

import React, { useRef, useEffect, useState } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  direction = "up",
  distance = 36,
  delay = 0,
  duration = 650,
  threshold = 0.1,
  once = false,
  className = "",
  style = {},
  as: Component = "div",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's accessibility preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: "0px 0px -20px 0px",
        threshold: Math.min(threshold, 0.1),
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, once]);

  // Compute transform offset based on direction with subtle modern micro-scale
  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";

    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0) scale(0.985)`;
      case "down":
        return `translate3d(0, -${distance}px, 0) scale(0.985)`;
      case "left":
        return `translate3d(-${distance}px, 0, 0) scale(0.985)`;
      case "right":
        return `translate3d(${distance}px, 0, 0) scale(0.985)`;
      case "fade":
      default:
        return "translate3d(0, 0, 0) scale(0.985)";
    }
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: isVisible
      ? `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      : "opacity 200ms ease-out, transform 200ms ease-out",
    willChange: "transform, opacity",
  };

  const DynamicElement = Component as any;

  return (
    <DynamicElement
      ref={elementRef}
      className={className}
      style={dynamicStyle}
    >
      {children}
    </DynamicElement>
  );
}
