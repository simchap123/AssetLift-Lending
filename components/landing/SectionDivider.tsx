'use client';

interface SectionDividerProps {
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  flip = false,
  className = '',
}: SectionDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      aria-hidden="true"
    >
      <svg
        className="block w-full"
        style={{ height: '70px' }}
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {flip ? (
          <polygon points="0,0 1440,70 0,70" fill="currentColor" />
        ) : (
          <polygon points="0,0 1440,0 1440,70" fill="currentColor" />
        )}
      </svg>
    </div>
  );
}
