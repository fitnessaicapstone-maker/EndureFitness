interface ProgressDotsProps {
  total: number;
  current: number;
}

/**
 * Progress indicator showing dots for multi-step flows
 * Current step is elongated, completed steps are dimmed, future steps are faded
 */
export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current
              ? 'w-8 bg-[#92B8FF]' // Active step - elongated
              : i < current
              ? 'w-2 bg-[#92B8FF]/60' // Completed steps - dimmed
              : 'w-2 bg-white/20' // Future steps - faded
          }`}
        />
      ))}
    </div>
  );
}
