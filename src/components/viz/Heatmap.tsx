/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { GlassCard } from "../ui/GlassCard";
import { defaultTheme } from "../../config/themes";

interface Week {
  contributionDays: {
    contributionCount: number;
    color: string;
    date: string;
  }[];
}

export const Heatmap: React.FC<{
  weeks: Week[];
}> = ({ weeks }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Limit to last 20 weeks for visual clarity in video
  const visibleWeeks = useMemo(() => weeks.slice(-20), [weeks]);

  return (
    <GlassCard
      style={{
        padding: 20,
        alignItems: "flex-start",
        background: "rgba(15, 23, 42, 0.6)",
      }}
    >
      <h3
        style={{
          margin: "0 0 15px 0",
          color: defaultTheme.colors.textSecondary,
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Contribution Density
      </h3>
      <div
        style={{
          display: "flex",
          gap: 4,
          transform: "perspective(1000px) rotateX(20deg)", // 3D Tilt
          transformStyle: "preserve-3d",
        }}
      >
        {visibleWeeks.map((week, wIndex) => (
          <div
            key={wIndex}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {week.contributionDays.map((day, dIndex) => {
              const delay = wIndex * 2 + dIndex;
              const scale = spring({
                frame: frame - delay,
                fps,
                config: { stiffness: 200, damping: 20 },
              });

              // Enhance color intensity
              const opacity = interpolate(
                day.contributionCount,
                [0, 5, 10],
                [0.1, 0.6, 1],
                {
                  extrapolateRight: "clamp",
                }
              );

              return (
                <div
                  key={day.date}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    backgroundColor:
                      day.contributionCount > 0
                        ? defaultTheme.colors.success
                        : "#334155",
                    opacity: day.contributionCount > 0 ? opacity : 0.2,
                    transform: `scale(${scale})`,
                    boxShadow:
                      day.contributionCount > 0
                        ? `0 0 ${day.contributionCount * 2}px ${defaultTheme.colors.success}`
                        : "none",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
