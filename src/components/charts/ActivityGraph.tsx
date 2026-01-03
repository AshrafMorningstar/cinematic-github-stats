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

interface ActivityGraphProps {
  data: number[];
  width: number;
  height: number;
  color?: string;
}

export const ActivityGraph: React.FC<ActivityGraphProps> = ({
  data,
  width,
  height,
  color = "#22d3ee",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barWidth = width / data.length;
  const maxVal = Math.max(...data, 1);

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        perspective: 500,
        transform: "rotateX(20deg)", // Isometric feel
      }}
    >
      {data.map((val, i) => {
        const progress = interpolate(
          frame - i * 2, // Staggered animation
          [0, 30],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        const barHeight = (val / maxVal) * height * progress;

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: barHeight,
              background: `linear-gradient(to top, ${color}20, ${color})`,
              boxShadow: `0 0 10px ${color}`,
              borderRadius: "4px 4px 0 0",
              opacity: 0.8,
            }}
          />
        );
      })}
    </div>
  );
};
