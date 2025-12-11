/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";

interface NeonTextProps {
  text: string | number;
  color?: string;
  size?: number;
  weight?: number;
  style?: React.CSSProperties;
  glow?: boolean;
}

export const NeonText: React.FC<NeonTextProps> = ({
  text,
  color = "#0affff",
  size = 24,
  weight = 700,
  style,
  glow = true,
}) => {
  return (
    <h1
      style={{
        margin: 0,
        fontSize: size,
        fontWeight: weight,
        color: "#fff",
        textShadow: glow
          ? `
            0 0 5px ${color},
            0 0 10px ${color},
            0 0 20px ${color},
            0 0 40px ${color}
          `
          : "none",
        fontFamily: "'Orbitron', 'Inter', sans-serif", // Tech/Sci-fi font
        letterSpacing: "0.05em",
        ...style,
      }}
    >
      {text}
    </h1>
  );
};
