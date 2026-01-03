/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface HolographicCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  color?: string;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  width,
  height,
  style,
  color = "#0affff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scanline animation
  const scanlineY = interpolate(frame % (fps * 3), [0, fps * 3], [0, 100], {
    extrapolateRight: "clamp",
  });

  // Glitch/flicker effect
  const flicker = interpolate(
    Math.sin(frame * 0.5) + Math.sin(frame * 0.2) * 0.5,
    [-1.5, 1.5],
    [0.9, 1]
  );

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
        border: `1px solid ${color}40`,
        boxShadow: `0 0 15px ${color}20, inset 0 0 20px ${color}10`,
        backdropFilter: "blur(4px)",
        borderRadius: 16,
        padding: 24,
        overflow: "hidden",
        opacity: flicker,
        ...style,
      }}
    >
      {/* Corner Accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 20,
          height: 2,
          background: color,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 2,
          height: 20,
          background: color,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 20,
          height: 2,
          background: color,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 2,
          height: 20,
          background: color,
        }}
      />

      {/* Grid Pattern Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${color}10 1px, transparent 1px),
            linear-gradient(90deg, ${color}10 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          opacity: 0.3,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          top: `${scanlineY}%`,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};
