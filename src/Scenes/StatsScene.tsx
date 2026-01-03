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
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import React from "react";
import stats from "../data/stats.json";
import { HolographicCard } from "../components/ui/HolographicCard";
import { NeonText } from "../components/ui/NeonText";
import { ParticleBackground } from "../components/animations/ParticleBackground";
import { defaultTheme } from "../config/themes";
import { RadarChart } from "../components/charts/RadarChart";
import { Heatmap } from "../components/charts/Heatmap";

// Transform language data for Radar Chart
// Use topLanguages or fallback to languages
const langSource =
  (stats as any).topLanguages || (stats as any).languages || [];
const radarData = langSource.slice(0, 5).map((l: any) => ({
  language: l.name,
  value: l.value || l.size || 0,
}));

const StatBox = ({
  title,
  value,
  delay,
  color,
  style,
}: {
  title: string;
  value: string | number;
  delay: number;
  color: string;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 14 },
  });

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        height: "100%",
        ...style,
      }}
    >
      <HolographicCard
        width="100%"
        height="100%"
        color={color}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 24,
        }}
      >
        <NeonText
          text={title}
          size={14}
          color={color}
          glow={false}
          style={{
            opacity: 0.8,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        />
        <div style={{ alignSelf: "flex-end", marginTop: 10 }}>
          <NeonText
            text={value}
            size={36}
            color={color}
            style={{ textShadow: `0 0 15px ${color}` }}
          />
        </div>
      </HolographicCard>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // Background animation
  const bgScale = interpolate(frame, [0, 300], [1, 1.1]);

  // Entrance
  const contentOpacity = interpolate(frame, [10, 40], [0, 1]);
  const contentY = interpolate(frame, [10, 40], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Safe checks
  const weeks = (stats as any).contributionCalendar?.weeks || [];
  const totalContribs =
    (stats as any).totalContribs ||
    (stats as any).contributionCalendar?.totalContributions ||
    0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: defaultTheme.colors.background,
        fontFamily: "'Orbitron', 'Inter', sans-serif",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background Layer */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, zIndex: 0 }}>
        <ParticleBackground theme={defaultTheme} />
      </AbsoluteFill>

      {/* Main Container */}
      <AbsoluteFill
        style={{
          padding: 40,
          zIndex: 10,
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Avatar Area */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${defaultTheme.colors.primary}`,
              boxShadow: `0 0 15px ${defaultTheme.colors.primary}`,
              background: "#000",
            }}
          >
            {(stats as any).avatar && (
              <img
                src={(stats as any).avatar}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="avatar"
              />
            )}
          </div>

          <div>
            <NeonText
              text={stats.name || stats.username}
              size={32}
              color={defaultTheme.colors.primary}
            />
            <NeonText
              text={`@${stats.username} • Premium Stats`}
              size={14}
              color={defaultTheme.colors.textSecondary}
              glow={false}
              style={{ marginTop: 5, letterSpacing: "1px" }}
            />
          </div>
        </div>

        {/* Bento Grid Layout - CSS Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 210px)",
            gap: 24,
            width: "100%",
          }}
        >
          {/* Row 1, Col 1-3: Heatmap (Wide) */}
          <div style={{ gridColumn: "span 3", position: "relative" }}>
            <div
              style={{
                height: "100%",
                transform: `scale(${spring({ fps: 30, frame: frame - 10, config: { damping: 15 } })})`,
                opacity: interpolate(frame - 10, [0, 20], [0, 1]),
              }}
            >
              <HolographicCard
                width="100%"
                height="100%"
                color={defaultTheme.colors.success}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <NeonText
                    text="CONTRIBUTION ACTIVITY"
                    size={14}
                    color={defaultTheme.colors.success}
                    glow={false}
                  />
                  <NeonText
                    text={`${totalContribs} Total`}
                    size={14}
                    color={defaultTheme.colors.success}
                    glow={false}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Heatmap
                    weeks={weeks}
                    width={780}
                    height={130}
                    color={defaultTheme.colors.success}
                  />
                </div>
              </HolographicCard>
            </div>
          </div>

          {/* Row 1, Col 4: Total Commits */}
          <div style={{ gridColumn: "span 1" }}>
            <StatBox
              title="Commits"
              value={stats.totalCommits}
              delay={20}
              color={defaultTheme.colors.primary}
            />
          </div>

          {/* Row 2, Col 1: PRs & Issues */}
          <div style={{ gridColumn: "span 1" }}>
            <StatBox
              title="PRs & Issues"
              value={`${stats.totalPRs + stats.totalIssues}`}
              delay={25}
              color={defaultTheme.colors.accent}
            />
          </div>

          {/* Row 2, Col 2-3: Radar Chart (Skills) */}
          <div style={{ gridColumn: "span 2", position: "relative" }}>
            <div
              style={{
                height: "100%",
                transform: `scale(${spring({ fps: 30, frame: frame - 30, config: { damping: 15 } })})`,
                opacity: interpolate(frame - 30, [0, 20], [0, 1]),
              }}
            >
              <HolographicCard
                width="100%"
                height="100%"
                color={defaultTheme.colors.secondary}
              >
                <div style={{ position: "absolute", top: 20, left: 20 }}>
                  <NeonText
                    text="SKILLS RADAR"
                    size={14}
                    color={defaultTheme.colors.secondary}
                    glow={false}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <RadarChart
                    data={radarData}
                    width={220}
                    height={220}
                    color={defaultTheme.colors.secondary}
                  />
                </div>
              </HolographicCard>
            </div>
          </div>

          {/* Row 2, Col 4: Stars/Repos */}
          <div style={{ gridColumn: "span 1" }}>
            <StatBox
              title="Repositories"
              value={stats.repos}
              delay={35}
              color={defaultTheme.colors.error} // Different color for variety
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
