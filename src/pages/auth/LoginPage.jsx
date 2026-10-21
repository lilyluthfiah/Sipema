import "./LoginPage.css";
import { useState } from "react";

function Logo({ light = false }) {
  return (
    <div className={`brand-logo ${light ? "logo-light" : ""}`}>
      <svg viewBox="0 0 48 48" aria-hidden="true" className="sipema-symbol">
        <defs>
          <linearGradient
            id={light ? "logoGradientLight" : "logoGradient"}
            x1="0" y1="0" x2="1" y2="1"
          >
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <path
          d="M32 7H22C14 7 10 12 10 18C10 22 12 25 17 28L27 33C30 35 29 38 25 40L16 44C12 46 8 43 10 39L12 35L20 31L15 28C9 25 6 21 6 16C6 8 12 3 22 3H32C37 3 39 7 36 11L33 15L25 19C21 21 22 24 26 26L32 29C38 32 40 36 37 41C34 46 28 48 20 48H16L25 43C32 40 34 36 29 33L19 28C13 25 10 22 10 18C10 12 14 7 22 7Z"
          fill={`url(#${light ? "logoGradientLight" : "logoGradient"})`}
          transform="translate(2 -1) scale(.92)"
        />
      </svg>
      <span className="logo-text" style={{ marginLeft: '-10px' }}><span className="logo-s">S</span>ipema</span>
    </div>
  );
}

function CalendarIllustration() {
  return (
    <div className="illustration">
      <div className="illustration-glow" />
      <div className="calendar-art">
        <div className="calendar-top"><i /><i /><i /><i /></div>
        <div className="calendar-grid">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className={i === 9 ? "checked" : ""}>
              {i === 9 ? "✓" : ""}
            </span>
          ))}
        </div>
      </div>
      <div className="message-art"><span /><span /><span /></div>
      <div className="checklist-art">
        <div className="checklist-line" />
        <div><b>✓</b><span /></div>
        <div><b>✓</b><span /></div>
      </div>
      <div className="people-art">
        <span /><span /><span />
        <div /><div /><div />
      </div>
      <div className="send-art">➤</div>
    </div>
  );
}

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !password) {
      setPesan("Username dan password wajib diisi.");
      return;
    }

    onLoginSuccess();
  }

  return (
    <main className="login-page">
      <section className="login-left">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="left-content">
          <Logo light />
          <div className="brand-description">
            <h1>
              Kelola Meeting,
              <br />
              Dokumentasi, dan
              <br />
              <span>Tindak Lanjut</span>
            </h1>
            <p>
              Sipema membantu Anda mengelola jadwal meeting,
              mencatat hasil, dan memantau tindak lanjut
              dalam satu sistem yang terintegrasi.
            </p>
          </div>
          <CalendarIllustration />
        </div>
      </section>

      <section className="login-right">
        <div className="decor-circle circle-one" />
        <div className="decor-circle circle-two" />
        <div className="login-card">
          <header className="login-brand">
            <Logo />
            <p>
              Sistem Informasi Pengelolaan Meeting
              <br />
              dan Tindak Lanjut
            </p>
          </header>
          <div className="login-divider" />
          <div className="login-heading">
            <h2>Selamat Datang!</h2>
          </div>

          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Masukkan username"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setPesan("");
                }}
                required
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <path d="M12 14v3" />
              </svg>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPesan("");
                }}
                required
              />
            </div>

            <button className="login-button" type="submit">
              Masuk <span></span>
            </button>
          </form>

          {pesan && <p role="status">{pesan}</p>}
          <footer className="login-footer" />
        </div>
      </section>
    </main>
  );
}