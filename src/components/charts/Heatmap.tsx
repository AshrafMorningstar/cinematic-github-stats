/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface HeatmapProps {
  weeks: ContributionWeek[];
  width: number;
  height: number;
  color: string;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  weeks = [],
  width,
  height,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // If no weeks (e.g. mock data empty), render placeholders
  const displayWeeks =
    weeks.length > 0
      ? weeks
      : Array.from({ length: 53 }).map((_, w) => ({
          contributionDays: Array.from({ length: 7 }).map((_, d) => ({
            contributionCount:
              Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
            date: "2024-01-01",
            color: "#ebedf0",
          })),
        }));

  const boxSize = Math.floor(width / 53) - 2;
  const gap = 2;

  // Animate boxes appearing
  const progress = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        gap: gap,
        flexWrap: "nowrap", // Weeks horizontal
        overflow: "hidden",
      }}
    >
      {displayWeeks.slice(-30).map((week, wIndex) => (
        <div
          key={wIndex}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: gap,
          }}
        >
          {week.contributionDays.map((day, dIndex) => {
            const hasContrib = day.contributionCount > 0;
            const itemDelay = wIndex * 0.5 + dIndex * 0.5;

            // Staggered opacity/scale
            const itemProgress = Math.max(
              0,
              Math.min(1, (frame - itemDelay) / 10)
            );

            return (
              <div
                key={dIndex}
                style={{
                  width: boxSize,
                  height: boxSize,
                  borderRadius: 2,
                  backgroundColor: hasContrib ? color : "rgba(255,255,255,0.1)",
                  opacity: hasContrib ? 0.8 * itemProgress : 0.2 * itemProgress,
                  transform: `scale(${itemProgress})`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
