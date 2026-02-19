"use client";

/**
 * Icon wrapper that loads SVGs from /icons/ and supports shape, size, color, and wrapper styling.
 * Uses CSS mask for color control so any SVG works with any color.
 *
 * Usage:
 *   <Icon name="file" color="#fff" size={32} shape="square" wrapperColor="#06B6D4" />
 *   <Icon name="globe" color="taxes-white" shape="circle" wrapperColor="taxes-cyan" />
 */

/** Theme color keys that map to hex values (from tailwind.config) */
const THEME_COLORS: Record<string, string> = {
  "taxes-white": "#FFFFFF",
  "taxes-cyan": "#06B6D4",
  "taxes-cyan-light": "#22D3EE",
  "taxes-gray-100": "#F3F4F6",
  "taxes-gray-200": "#E5E7EB",
  "taxes-gray-300": "#D1D5DB",
  "taxes-gray-500": "#6B7280",
  "taxes-gray-600": "#4B5563",
  "taxes-gray-700": "#374151",
  "taxes-gray-900": "#111827",
  "taxes-black": "#000000",
  "brand-primary": "#0f766e",
  "brand-secondary": "#134e4a",
  "brand-accent": "#2dd4bf",
};

function resolveColor(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("#") || value.startsWith("rgb")) return value;
  return THEME_COLORS[value] ?? value;
}

export const ICON_NAMES = [
  "attention",
  "shield",
  "clock",
  "savings",
  "headphones",
  "logo",
  "globe",
  "person",
  "building",
  "chart",
  "file",
  "calendar",
  "location-pin",
  "phone",
  "email",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps {
  /** Icon file name (without .svg) from public/icons/ */
  name: IconName;
  /** Shape wrapper: square (rounded), circle, or none */
  shape?: "square" | "circle" | null;
  /** SVG size in pixels (icon size, not wrapper). Default 32 */
  size?: number;
  /** SVG/icon color - hex, rgb, or theme key (e.g. taxes-white, taxes-cyan) */
  color?: string;
  /** Wrapper background color - hex, rgb, or theme key. Default: primary (taxes-cyan) */
  wrapperColor?: string;
  /** Additional class for the wrapper */
  className?: string;
}

export function Icon({
  name,
  shape = null,
  size = 24,
  color,
  wrapperColor,
  className = "",
}: IconProps) {
  const resolvedColor = resolveColor(color);
  const resolvedWrapperColor = resolveColor(wrapperColor ?? "taxes-cyan");

  const iconEl = (
    <span
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        maskImage: `url(/icons/${name}.svg)`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        backgroundColor: resolvedColor ?? "currentColor",
      }}
      aria-hidden
    />
  );

  if (!shape) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        {iconEl}
      </span>
    );
  }

  const isCircle = shape === "circle";
  const wrapperSize = size + 30; // padding around icon

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: wrapperSize,
        height: wrapperSize,
        borderRadius: isCircle ? "50%" : 12,
        backgroundColor: resolvedWrapperColor,
      }}
    >
      {iconEl}
    </span>
  );
}
