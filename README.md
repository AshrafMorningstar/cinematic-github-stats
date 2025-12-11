# 🎬 Cinematic GitHub Stats (Ultimate Edition)

![Premium GitHub Stats](https://github.com/AshrafMorningstar/cinematic-github-stats/blob/main/out/stats.gif?raw=true)

> **"The Best of Best"** - A premium, cinematic visualizer for your GitHub profile.
> Created by **AshrafMorningstar**.

[![Render Cinematic Stats](https://github.com/AshrafMorningstar/cinematic-github-stats/actions/workflows/render.yml/badge.svg)](https://github.com/AshrafMorningstar/cinematic-github-stats/actions/workflows/render.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Premium Features (v2.0)

### 📊 Ultimate Dashboard

- **Bento-Grid Layout**: Modern, structured design for maximum information density.
- **3D Heatmap**: Tilted, glowing visualization of your contribution calendar.
- **Language Radar**: Animated hexagonal chart showcasing your top 5 technologies.
- **Glassmorphism**: Frosted glass cards with dynamic borders and shadows.

### 🎨 Cinematic Effects

- **Infinite 3D Floor**: Subtle perspective grid loop.
- **Particle Nebula**: Interactive background with depth of field.
- **Typewriter Reveal**: Smooth character-by-character text animation.
- **Physics-Based Motion**: Spring animations for every element.

### 🤖 Full Automation

- **Daily Updates**: GitHub Actions pipeline runs daily to keep stats fresh.
- **Zero Config**: Just fork, add token (optional), and enable Actions.

---

## 🚀 Quick Start

### Option 1: Use the Template (Easiest)

1.  **Fork** this repository.
2.  Go to **Settings > Actions > General** and select **"Read and write permissions"**.
3.  Go to **Actions** tab, select **"Render Cinematic Stats"**, and click **Run workflow**.
4.  Wait for the run to complete. Your new GIF is in `out/stats.gif`.

### Option 2: Local Development

```bash
# Clone
git clone https://github.com/AshrafMorningstar/cinematic-github-stats.git
cd cinematic-github-stats

# Install
npm install

# Fetch Your Data
npm run fetch

# Preview Studio
npm start

# Render Video
npm run render:gif
```

---

## 🛠 Configuration

### Environment Variables

To fetch private stats or avoid rate limits, create a `.env` file:

```env
GH_TOKEN=your_github_personal_access_token
```

### Customization

Edit `src/config/themes.ts` to change colors:

```typescript
export const defaultTheme = {
  colors: {
    primary: "#3b82f6", // Blue
    secondary: "#ec4899", // Pink
    accent: "#8b5cf6", // Purple
    // ...
  },
};
```

---

## 📂 Project Structure

```
src/
├── Scenes/           # Main composition layouts
├── components/
│   ├── viz/          # Data visualizations (Heatmap, Radar)
│   ├── ui/           # UI elements (GlassCard)
│   └── animations/   # Background effects
├── scripts/          # Data fetching logic
└── config/           # Theme and settings
```

---

## 📜 License

MIT © [AshrafMorningstar](https://github.com/AshrafMorningstar)

---

<p align="center">
  <sub>Built with Remotion, React, and Passion by AshrafMorningstar.</sub>
</p>
