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
} from "remotion";
import React from "react";
import stats from "../data/stats.json";
import { GlassCard } from "../components/ui/GlassCard";
import { ParticleBackground } from "../components/animations/ParticleBackground";
import { Heatmap } from "../components/viz/Heatmap";
import { LanguageRadar } from "../components/viz/LanguageRadar";
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
    <div style={{ transform: `scale(${scale})`, opacity, flex: 1 }}>
      <GlassCard
        style={{
          borderColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
            color.slice(3, 5),
            16
          )}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`,
          height: "100%",
          padding: 15,
        }}
      >
        <h3
          style={{
            margin: 0,
            color: defaultTheme.colors.textSecondary,
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {title}
        </h3>
        <h1
          style={{
            margin: "5px 0 0",
            color: color,
            fontSize: 32,
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
        fontFamily: "'Outfit', 'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
        <ParticleBackground theme={defaultTheme} />
      </AbsoluteFill>

      {/* Main Container */}
      <AbsoluteFill
        style={{
          padding: 60,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          zIndex: 10,
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: interpolate(frame, [0, 30], [0, 1]),
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 64,
                fontWeight: 900,
                margin: 0,
                background: `linear-gradient(to right, #fff, ${defaultTheme.colors.textSecondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,255,255,0.2))",
              }}
            >
              {stats.name || stats.username}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 3,
                  background: defaultTheme.colors.primary,
                }}
              />
              <p
                style={{
                  fontSize: 18,
                  color: defaultTheme.colors.accent,
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Premium GitHub Audit
              </p>
            </div>
          </div>
          <img
            src={stats.avatar}
            alt="Profile"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: `3px solid ${defaultTheme.colors.primary}`,
              boxShadow: `0 0 20px ${defaultTheme.colors.primary}40`,
            }}
          />
        </div>

        {/* Bento Grid Layout */}
        <div style={{ display: "flex", gap: 30, flex: 1 }}>
          {/* Left Column: Heatmap & Key Stats */}
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            <Heatmap weeks={stats.contributionCalendar.weeks} />

            <div style={{ display: "flex", gap: 20 }}>
              <StatItem
                title="Total Commits"
                value={stats.totalCommits}
                delay={20}
                color={defaultTheme.colors.primary}
              />
              <StatItem
                title="Contributions"
                value={stats.totalContribs}
                delay={25}
                color={defaultTheme.colors.success}
              />
              <StatItem
                title="Repositories"
                value={stats.repos}
                delay={30}
                color="#fcc419" // Gold
              />
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <StatItem
                title="Pull Requests"
                value={stats.totalPRs}
                delay={35}
                color={defaultTheme.colors.secondary}
              />
              <StatItem
                title="Issues Solved"
                value={stats.totalIssues}
                delay={40}
                color={defaultTheme.colors.accent}
              />
              <StatItem
                title="Stars Earned"
                value={stats.stars}
                delay={45}
                color="#fbbf24" // Amber
              />
            </div>
          </div>

          {/* Right Column: Radar Chart */}
          <div style={{ flex: 1 }}>
            <LanguageRadar languages={stats.topLanguages} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.15)",
          fontSize: 12,
          fontFamily: "monospace",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Designed by AshrafMorningstar
      </div>
    </AbsoluteFill>
  );
};
