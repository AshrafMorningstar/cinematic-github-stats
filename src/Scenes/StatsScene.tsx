/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import React from "react";
import stats from "../data/stats.json";
import { GlassCard } from "../components/ui/GlassCard";
import { ParticleBackground } from "../components/animations/ParticleBackground";
import { defaultTheme } from "../config/themes";

const StatItem = ({
  title,
  value,
  delay,
  color,
}: {
  title: string;
  value: string | number;
  delay: number;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animate scale on entry
  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
  });

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div style={{ transform: `scale(${scale})`, opacity }}>
      <GlassCard
        width={280}
        height={160}
        style={{
          borderColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
            color.slice(3, 5),
            16
          )}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`,
        }}
      >
        <h3
          style={{
            margin: 0,
            color: defaultTheme.colors.textSecondary,
            fontSize: 16,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {title}
        </h3>
        <h1
          style={{
            margin: "10px 0 0",
            color: color,
            fontSize: 48,
            fontWeight: 800,
            filter: `drop-shadow(0 0 10px ${color}40)`,
          }}
        >
          {value}
        </h1>
      </GlassCard>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Gentle zoom out for background feel
  const bgScale = interpolate(frame, [0, 300], [1, 1.1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: defaultTheme.colors.background,
        fontFamily: "'Outfit', 'Inter', sans-serif", // Ensure font is loaded in Root or imported
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
        <ParticleBackground theme={defaultTheme} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: interpolate(frame, [0, 30], [0, 1]),
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              margin: 0,
              background: `linear-gradient(to right, #fff, ${defaultTheme.colors.textSecondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,255,255,0.2))",
              letterSpacing: "-2px",
            }}
          >
            {stats.name || stats.username}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 16,
            }}
          >
            <div
              style={{
                width: 40,
                height: 2,
                background: defaultTheme.colors.primary,
              }}
            />
            <p
              style={{
                fontSize: 20,
                color: defaultTheme.colors.accent,
                letterSpacing: "0.2em",
                fontWeight: 600,
                margin: 0,
              }}
            >
              GITHUB ACTIVITY REPORT
            </p>
            <div
              style={{
                width: 40,
                height: 2,
                background: defaultTheme.colors.primary,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            perspective: 1000,
          }}
        >
          <StatItem
            title="Total Commits"
            value={stats.totalCommits}
            delay={20}
            color={defaultTheme.colors.primary}
          />
          <StatItem
            title="Pull Requests"
            value={stats.totalPRs}
            delay={25}
            color={defaultTheme.colors.success}
          />
          <StatItem
            title="Issues Solved"
            value={stats.totalIssues}
            delay={30}
            color={defaultTheme.colors.secondary}
          />
          <StatItem
            title="Contributions"
            value={stats.totalContribs}
            delay={35}
            color={defaultTheme.colors.accent}
          />
          <StatItem
            title="Repositories"
            value={stats.repos}
            delay={40}
            color="#fcc419" // Gold
          />
          <StatItem
            title="Stars Earned"
            value={stats.stars}
            delay={45}
            color="#fbbf24" // Amber
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
