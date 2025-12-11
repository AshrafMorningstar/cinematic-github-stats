# 🎬 Cinematic GitHub Stats - Premium Edition

[![Render Video](https://github.com/AshrafMorningstar/cinematic-github-stats/actions/workflows/render.yml/badge.svg)](https://github.com/AshrafMorningstar/cinematic-github-stats/actions/workflows/render.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0affff.svg)](https://opensource.org/licenses/MIT)
[![Remotion](https://img.shields.io/badge/Made%20with-Remotion-ff00ff)](https://www.remotion.dev/)

> **The Ultimate Holographic GitHub Analytics Experience.**

Turn your GitHub activity into a stunning, high-quality **Cyberpunk/Holographic** video. Featuring advanced data visualization, neon typography, and cinematic particle effects.

![Preview](out/stats.gif)

## ✨ Premium Features

- **🔮 Holographic UI**: Next-gen glassmorphism with scanlines, chromatic aberration, and neon glows.
- **📊 Advanced Data Viz**:
  - **Radar Charts**: Visualize your top languages in a sci-fi radar view.
  - **Isometric Activity Graphs**: See your contribution history in 3D.
- **⚡ Cyberpunk Aesthetics**:
  - **Neon Typography**: Glowing text effects using the `Orbitron` font.
  - **Warp Speed Particles**: Dynamic background systems that react to the theme.
- **🎨 Multiple Themes**:
  - `Holographic` (Default): Neon Cyan & Magenta
  - `Cyberpunk`: Pink & Cyan
  - `Neon`: Violet & Fuchsia
  - `Professional`: Clean Blue & Zinc

## 🚀 Quick Start

### 1. Create Repository

Click [Use this template](https://github.com/new?template_name=cinematic-github-stats&template_owner=AshrafMorningstar) or create a new repo.

### 2. Configure Secrets

Go to **Settings > Secrets > Actions** and add `GH_TOKEN` (Your Personal Access Token).

### 3. Run Locally

```bash
npm install
npm start
```

## 🛠 Configuration

Edit `.env` or `src/config/themes.ts`:

```typescript
// Select your theme
export const defaultTheme = themes.holographic;
```

## 📦 Tech Stack

- **Framework**: [Remotion](https://www.remotion.dev/)
- **Styling**: React, CSS Modules
- **Charts**: D3.js (d3-shape, d3-scale)
- **Icons**: Lucide React

---

**Created by [AshrafMorningstar](https://github.com/AshrafMorningstar)** 🌟
