/** Faint flowing "topographic" line pattern (decorative section background). */
export function TopoLines({ className = "" }: { className?: string }) {
  const paths = [40, 95, 150, 205, 260, 315, 370, 425, 480, 535];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none select-none ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {paths.map((y, i) => (
          <path
            key={y}
            d={`M-50,${y} C200,${y - 45} 350,${y + 50} 600,${y - 10} C850,${y - 60} 1000,${y + 45} 1250,${y - 5}`}
            opacity={0.55 - i * 0.02}
          />
        ))}
      </g>
    </svg>
  );
}

/** A soft duotone blob backdrop (red + yellow brand glow). */
export function BrandGlow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-secondary/20 blur-[110px]" />
    </div>
  );
}
