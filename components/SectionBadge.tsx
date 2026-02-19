/**
 * Pill-shaped badge for section pre-titles (e.g. Welcome, About Us, Services, Pricing).
 * Primary color at 10% opacity background, primary text, uppercase.
 */
export function SectionBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block w-fit rounded-full bg-taxes-cyan/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-taxes-cyan ${className}`}
    >
      {children}
    </span>
  );
}
