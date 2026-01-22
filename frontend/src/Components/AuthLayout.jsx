export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          padding: "40px 32px",
          width: 360,
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2575fc", marginBottom: 6 }}>{title}</h2>
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>
          {subtitle}
        </p>

        {children}

        <div style={{ marginTop: 20, fontSize: 14 }}>
          {footer}
        </div>
      </div>
    </div>
  );
}
