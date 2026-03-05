export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #EEF5FF 0%, #F5F9FF 40%, #E8F2FF 100%)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(58,154,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,126,245,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(58,154,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">{children}</div>
    </div>
  );
}
