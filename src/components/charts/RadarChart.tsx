/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import * as d3Shape from "d3-shape";
import * as d3Scale from "d3-scale";

interface RadarChartProps {
  data: { language: string; value: number }[];
  width: number;
  height: number;
  color?: string;
  max?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  width,
  height,
  color = "#0affff",
  max = 100,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const radius = Math.min(width, height) / 2 - 20;

  // Animation
  const progress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  const animatedData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      value: d.value * progress,
    }));
  }, [data, progress]);

  // Scales
  const angleSlice = (Math.PI * 2) / data.length;
  const rScale = d3Scale.scaleLinear().range([0, radius]).domain([0, max]);

  // Generate path
  const radarLine = d3Shape
    .lineRadial<{ language: string; value: number }>()
    .radius((d) => rScale(d.value))
    .angle((d, i) => i * angleSlice)
    .curve(d3Shape.curveLinearClosed);

  const path = radarLine(animatedData) || "";

  // Grid levels
  const levels = 4;
  const gridLevels = Array.from({ length: levels }).map((_, i) => {
    const levelRadius = (radius / levels) * (i + 1);
    const gridPath = d3Shape
      .lineRadial<{ language: string; value: number }>()
      .radius(() => levelRadius)
      .angle((d, idx) => idx * angleSlice)
      .curve(d3Shape.curveLinearClosed);
    return gridPath(data) || "";
  });

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {/* Glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {gridLevels.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {data.map((d, i) => {
          const x = rScale(max) * Math.sin(angleSlice * i - Math.PI);
          const y = rScale(max) * Math.cos(angleSlice * i - Math.PI);
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke={color}
              strokeOpacity={0.2}
            />
          );
        })}

        {/* Radar Shape */}
        <path
          d={path}
          fill={color}
          fillOpacity={0.3}
          stroke={color}
          strokeWidth={3}
          filter="url(#glow)"
        />

        {/* Labels */}
        {data.map((d, i) => {
          const r = radius + 20;
          const x = r * Math.sin(angleSlice * i - Math.PI);
          const y = r * Math.cos(angleSlice * i - Math.PI);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#fff"
              fontSize={12}
              fontWeight="bold"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {d.language}
            </text>
          );
        })}
      </g>
    </svg>
  );
};
