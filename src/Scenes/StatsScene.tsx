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
import React, { useMemo } from "react";
import stats from "../data/stats.json";
import { HolographicCard } from "../components/ui/HolographicCard";
import { NeonText } from "../components/ui/NeonText";
import { ParticleBackground } from "../components/animations/ParticleBackground";
import { defaultTheme } from "../config/themes"; // Defaults to Holographic -> Cyberpunk
import { RadarChart } from "../components/charts/RadarChart";
import { ActivityGraph } from "../components/charts/ActivityGraph";

// Transform language data for Radar Chart
const radarData = (stats.languages || []).map((l) => ({
  language: l.name,
  value: l.value,
}));

// Mock data for Activity Graph (Contribution simulation)
const activityData = Array.from(
  { length: 20 },
  (_, i) => Math.floor(Math.random() * 50) + 10 + Math.sin(i) * 10
);

const StatItem = ({
  title,
  value,
  delay,
  color,
  width = 240,
}: {
  title: string;
  value: string | number;
  delay: number;
  color: string;
  width?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 12 },
  });

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div style={{ transform: `scale(${scale})`, opacity }}>
      <HolographicCard
        width={width}
        height={140}
        color={color}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
            letterSpacing: "2px",
            marginBottom: 10,
          }}
        />
        <NeonText
          text={value}
          size={42}
          color={color}
          style={{ textShadow: `0 0 20px ${color}` }}
        />
      </HolographicCard>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Gentle zoom out for background feel
  const bgScale = interpolate(frame, [0, 300], [1, 1.2]);

  // Title Animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);
  const titleY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: defaultTheme.colors.background,
        fontFamily: "'Orbitron', 'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, zIndex: 0 }}>
        <ParticleBackground theme={defaultTheme} />
      </AbsoluteFill>

      {/* Main Content Container */}
      <AbsoluteFill style={{ padding: 40, zIndex: 10 }}>
        {/* Header Section */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <NeonText
            text={stats.username}
            size={64}
            color={defaultTheme.colors.primary}
            style={{ marginBottom: 10 }}
          />
          <NeonText
            text="PREMIUM GITHUB ANALYTICS"
            size={18}
            color={defaultTheme.colors.secondary}
            style={{ letterSpacing: "0.3em", opacity: 0.8 }}
            glow={false}
          />
        </div>

        {/* Dashboard Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 30,
            height: "100%",
            alignContent: "start",
          }}
        >
          {/* Left Column: Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StatItem
              title="Commits"
              value={stats.totalCommits}
              delay={20}
              color={defaultTheme.colors.primary}
            />
            <StatItem
              title="PRs"
              value={stats.totalPRs}
              delay={25}
              color={defaultTheme.colors.success}
            />
            <StatItem
              title="Issues"
              value={stats.totalIssues}
              delay={30}
              color={defaultTheme.colors.error}
            />
          </div>

          {/* Center Column: Radar Chart */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 480,
            }}
          >
            <HolographicCard
              width={400}
              height={460}
              color={defaultTheme.colors.secondary}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                }}
              >
                <NeonText
                  text="TOP LANGUAGES"
                  size={16}
                  color={defaultTheme.colors.secondary}
                />
              </div>
              <RadarChart
                data={radarData}
                width={300}
                height={300}
                color={defaultTheme.colors.secondary}
              />
            </HolographicCard>
          </div>

          {/* Right Column: Activity Graph & Extra Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StatItem
              title="Contributions"
              value={stats.totalContribs}
              delay={35}
              color={defaultTheme.colors.accent}
            />

            {/* Activity Graph Card */}
            <div style={{ flex: 1 }}>
              <HolographicCard
                width={240}
                height={280}
                color={defaultTheme.colors.primary}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: 0,
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <NeonText
                    text="ACTIVITY"
                    size={16}
                    color={defaultTheme.colors.primary}
                  />
                </div>
                <ActivityGraph
                  data={activityData}
                  width={200}
                  height={150}
                  color={defaultTheme.colors.primary}
                />
              </HolographicCard>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
