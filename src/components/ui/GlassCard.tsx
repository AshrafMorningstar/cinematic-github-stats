import React from "react";

export const GlassCard: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, width, height, style, className }) => {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
