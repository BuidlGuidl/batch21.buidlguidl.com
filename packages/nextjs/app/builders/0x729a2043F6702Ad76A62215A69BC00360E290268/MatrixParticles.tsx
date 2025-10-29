"use client";

export function MatrixParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 2) % 100}%`,
    delay: `${(i * 0.3) % 5}s`,
    duration: `${6 + (i % 3)}s`,
    char: ["0", "1", "{", "}", "[", "]", "→", "λ", "Ξ"][i % 9],
    size: i % 3 === 0 ? "text-sm" : i % 2 === 0 ? "text-base" : "text-xs",
  }));

  return (
    <>
      <style jsx global>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(var(--matrix-distance)) rotate(180deg);
            opacity: 0;
          }
        }
        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute ${particle.size} font-mono text-primary animate-matrix-fall`}
            style={
              {
                left: particle.left,
                top: "-20px",
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                "--matrix-distance": "110vh",
                opacity: 0.7,
              } as React.CSSProperties
            }
          >
            {particle.char}
          </div>
        ))}
      </div>
    </>
  );
}
