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

export interface Theme {
  name?: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    accent: string;
    success: string;
    error: string;
    text: string;
    textSecondary: string;
  };
  animations: {
    particleCount: number;
    particleSpeed: number;
    blurAmount: string;
  };
}

export const themes: Record<string, Theme> = {
  professional: {
    name: "Professional",
    colors: {
      primary: "#3b82f6", // blue-500
      secondary: "#6366f1", // indigo-500
      background: "#09090b", // zinc-950
      surface: "rgba(39, 39, 42, 0.6)", // zinc-800
      text: "#fafafa", // zinc-50
      textSecondary: "#a1a1aa", // zinc-400
      accent: "#06b6d4", // cyan-500
      success: "#10b981",
      error: "#ef4444",
    },
    animations: {
      particleCount: 60,
      particleSpeed: 0.8,
      blurAmount: "12px",
    },
  },
  neon: {
    name: "Neon",
    colors: {
      primary: "#d946ef", // fuchsia-500
      secondary: "#8b5cf6", // violet-500
      background: "#2e1065", // violet-950
      surface: "rgba(88, 28, 135, 0.4)", // violet-900
      text: "#fdf4ff", // fuchsia-50
      textSecondary: "#e879f9", // fuchsia-400
      accent: "#22d3ee", // cyan-400
      success: "#22c55e",
      error: "#f43f5e",
    },
    animations: {
      particleCount: 80,
      particleSpeed: 1.2,
      blurAmount: "16px",
    },
  },
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      primary: "#f472b6", // pink-400
      secondary: "#22d3ee", // cyan-400
      background: "#020617", // slate-950
      surface: "rgba(15, 23, 42, 0.4)", // slate-900
      text: "#e2e8f0", // slate-200
      textSecondary: "#94a3b8", // slate-400
      accent: "#facc15", // yellow-400
      success: "#4ade80",
      error: "#f87171",
    },
    animations: {
      particleCount: 80,
      particleSpeed: 1.5,
      blurAmount: "4px",
    },
  },
  holographic: {
    name: "Holographic",
    colors: {
      primary: "#0affff", // Neon Cyan
      secondary: "#ff00ff", // Neon Magenta
      background: "#000510", // Deep dark blue
      surface: "rgba(0, 255, 255, 0.05)",
      text: "#e0ffff",
      textSecondary: "rgba(0, 255, 255, 0.6)",
      accent: "#00ff00", // Neon Green
      success: "#00ff99",
      error: "#ff0033",
    },
    animations: {
      particleCount: 100,
      particleSpeed: 0.5,
      blurAmount: "8px",
    },
  },
};

export const defaultTheme = themes.holographic;
