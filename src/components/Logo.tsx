function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 46L22 20L30 32L38 21L58 46H6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="46" cy="14" r="3" fill="currentColor" />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const color = variant === "dark" ? "text-ink" : "text-cream";

  return (
    <span className={`inline-flex items-center gap-2.5 ${color} ${className}`}>
      <Mark className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-title text-[1.15rem] italic tracking-tight">
          R&apos;Eve
        </span>
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.28em] opacity-70">
          Ski Montagne
        </span>
      </span>
    </span>
  );
}
