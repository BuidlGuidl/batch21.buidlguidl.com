const MatrixParticles = () => {
  const particles: Array<{
    id: number;
    left: string;
    delay: string;
    duration: string;
    char: string;
    size: string;
  }> = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      id: i,
      left: `${(i * 2) % 100}%`,
      delay: `${(i * 0.3) % 5}s`,
      duration: `${6 + (i % 3)}s`,
      char: ["0", "1", "{", "}", "[", "]", "→", "λ", "Ξ"][i % 9],
      size: i % 3 === 0 ? "text-sm" : i % 2 === 0 ? "text-base" : "text-xs",
    });
  }

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
        {particles.map(p => (
          <div
            key={p.id}
            className={`absolute ${p.size} font-mono text-primary animate-matrix-fall`}
            style={
              {
                left: p.left,
                top: "-20px",
                animationDelay: p.delay,
                animationDuration: p.duration,

                "--matrix-distance": "110vh" as any,
                opacity: 0.7,
              } as any
            }
          >
            {p.char}
          </div>
        ))}
      </div>
    </>
  );
};

export default MatrixParticles;
