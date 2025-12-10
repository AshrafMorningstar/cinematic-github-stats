/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React, { useMemo, useRef, useEffect } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";
import { Theme } from "../../config/themes";

interface ParticleBackgroundProps {
  theme: Theme;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  theme,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo(() => {
    const p: Particle[] = [];
    for (let i = 0; i < theme.animations.particleCount; i++) {
      const seed = `particle-${i}`;
      p.push({
        x: random(seed + "x") * width,
        y: random(seed + "y") * height,
        size: random(seed + "size") * 3 + 1,
        speedX: (random(seed + "sx") - 0.5) * theme.animations.particleSpeed,
        speedY: (random(seed + "sy") - 0.5) * theme.animations.particleSpeed,
        opacity: random(seed + "op") * 0.5 + 0.1,
      });
    }
    return p;
  }, [
    theme.animations.particleCount,
    theme.animations.particleSpeed,
    width,
    height,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Fill background
    ctx.fillStyle = theme.colors.background;
    ctx.fillRect(0, 0, width, height);

    particles.forEach((p) => {
      const x = (p.x + p.speedX * frame) % width;
      const y = (p.y + p.speedY * frame) % height;

      const drawX = x < 0 ? width + x : x;
      const drawY = y < 0 ? height + y : y;

      ctx.beginPath();
      ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = theme.colors.primary;
      ctx.shadowBlur = p.size * 2;
      ctx.shadowColor = theme.colors.primary;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });
  }, [frame, width, height, particles, theme]);

  return (
    <AbsoluteFill style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%" }}
      />
      {/* Cinematic Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
