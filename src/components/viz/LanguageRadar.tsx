/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { GlassCard } from "../ui/GlassCard";
import { defaultTheme } from "../../config/themes";

interface Language {
  name: string;
  size: number;
  color: string;
}

export const LanguageRadar: React.FC<{
  languages: Language[];
}> = ({ languages }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalSize = languages.reduce((acc, l) => acc + l.size, 0);
  const maxRadius = 80;
  const center = 100;

  // Calculate polygon points
  const points = languages.map((lang, i) => {
    const angle = (Math.PI * 2 * i) / languages.length - Math.PI / 2;
    const value = lang.size / totalSize;
    // Normalize for better visual: min 20% radius
    const radius = maxRadius * (0.2 + value * 0.8);

    // Animate radius extension
    const animatedRadius = spring({
      frame: frame - i * 5,
      fps,
      from: 0,
      to: radius,
      config: { stiffness: 100, damping: 15 },
    });

    return {
      x: center + Math.cos(angle) * animatedRadius,
      y: center + Math.sin(angle) * animatedRadius,
      color: lang.color,
      name: lang.name,
      finalX: center + Math.cos(angle) * maxRadius * 1.2,
      finalY: center + Math.sin(angle) * maxRadius * 1.2,
    };
  });

  const pathData =
    points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ") + " Z";

  return (
    <GlassCard style={{ padding: 20 }}>
      <h3
        style={{
          margin: "0 0 10px 0",
          color: defaultTheme.colors.textSecondary,
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        Top Technologies
      </h3>
      <div style={{ width: 220, height: 220, position: "relative" }}>
        <svg width="220" height="220">
          {/* Background Web */}
          {[0.25, 0.5, 0.75, 1].map((scale) => (
            <polygon
              key={scale}
              points={languages
                .map((_, i) => {
                  const angle =
                    (Math.PI * 2 * i) / languages.length - Math.PI / 2;
                  const r = maxRadius * scale;
                  return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
                })
                .join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Data Polygon */}
          <path
            d={pathData}
            fill={`${defaultTheme.colors.primary}40`}
            stroke={defaultTheme.colors.primary}
            strokeWidth={2}
            style={{
              filter: `drop-shadow(0 0 10px ${defaultTheme.colors.primary})`,
            }}
          />

          {/* Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill="#fff" />
          ))}
        </svg>

        {/* Labels */}
        {points.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.finalX,
              top: p.finalY,
              transform: "translate(-50%, -50%)",
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              opacity: spring({ frame: frame - 20 - i * 2, fps }),
            }}
          >
            {p.name}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
