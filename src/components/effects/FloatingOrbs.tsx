export function FloatingOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Orb 1 — top-right greenish */}
      <div
        className="absolute rounded-full blur-[100px] opacity-30 dark:opacity-20"
        style={{
          width: "500px",
          height: "500px",
          top: "-10%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(77,158,46,0.35) 0%, transparent 70%)",
          animation: "float-orb 12s ease-in-out infinite",
        }}
      />
      {/* Orb 2 — bottom-left warm */}
      <div
        className="absolute rounded-full blur-[120px] opacity-20 dark:opacity-15"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-15%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(184,150,46,0.25) 0%, transparent 70%)",
          animation: "float-orb 16s ease-in-out infinite reverse",
        }}
      />
      {/* Orb 3 — center subtle accent */}
      <div
        className="absolute rounded-full blur-[80px] opacity-20 dark:opacity-10"
        style={{
          width: "400px",
          height: "400px",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(77,158,46,0.2) 0%, transparent 70%)",
          animation: "float-orb 20s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />
    </div>
  );
}
