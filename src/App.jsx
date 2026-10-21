import { useEffect, useRef, useState } from "react";
import "./App.css";

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

function CountUp({ end, duration = 900 }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const target = Number(end) || 0;
    if (target === 0) {
      setValue(0);
      return;
    }
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [end, duration]);

  return <>{value}</>;
}

function Dashboard({ onLogout }) {
  const [menuAktif, setMenuAktif] = useState("Beranda");
  const [mounted, setMounted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setProgressWidth(100), 120);
    return () => clearTimeout(timer);
  }, []);

  const menuIcons = {
    Beranda: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    Pengguna: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "Hak akses": (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    "Monitoring meeting": (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    ),
    "Tindak lanjut": (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
    Laporan: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" x2="18" y1="20" y2="10" />
        <line x1="12" x2="12" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="14" />
      </svg>
    ),
  };

  const menu = [
    { nama: "Beranda" },
    { nama: "Pengguna" },
    { nama: "Hak akses" },
    { nama: "Monitoring meeting" },
    { nama: "Tindak lanjut" },
    { nama: "Laporan" },
  ];

  const statistik = [
    { angka: "8", judul: "Meeting bulan ini", icon: "▦" },
    { angka: "12", judul: "Tindak lanjut belum selesai", icon: "◷" },
    { angka: "20", judul: "Tindak lanjut selesai", icon: "✓" },
    { angka: "24", judul: "Pengguna terdaftar", icon: "♙" },
  ];

  const meetings = [
    {
      tanggal: "08",
      bulan: "OKT",
      judul: "Rapat Evaluasi Proyek Q3",
      waktu: "09.00–10.30 WIB",
      lokasi: "Ruang Meeting A",
    },
    {
      tanggal: "12",
      bulan: "OKT",
      judul: "Planning Sprint Oktober",
      waktu: "13.30–15.00 WIB",
      lokasi: "Ruang Meeting B",
    },
  ];

  return (
    <div className={`notula-layout${sidebarOpen ? " sidebar-open" : " sidebar-closed"}`}>
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`notula-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="notula-brand">
          <div className="brand-logo logo-light" style={{ justifyContent: 'flex-start', marginBottom: 0 }}>
            <svg viewBox="0 0 48 48" aria-hidden="true" className="sipema-symbol">
              <defs>
                <linearGradient id="logoGradientSidebarWhite" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
              </defs>
              <path
                d="M32 7H22C14 7 10 12 10 18C10 22 12 25 17 28L27 33C30 35 29 38 25 40L16 44C12 46 8 43 10 39L12 35L20 31L15 28C9 25 6 21 6 16C6 8 12 3 22 3H32C37 3 39 7 36 11L33 15L25 19C21 21 22 24 26 26L32 29C38 32 40 36 37 41C34 46 28 48 20 48H16L25 43C32 40 34 36 29 33L19 28C13 25 10 22 10 18C10 12 14 7 22 7Z"
                fill="url(#logoGradientSidebarWhite)"
                transform="translate(2 -1) scale(.92)"
              />
            </svg>
            <span className="logo-text" style={{ marginLeft: '-10px' }}><span className="logo-s">S</span>ipema</span>
          </div>
        </div>

        <p className="notula-menu-label">MENU UTAMA</p>

        <nav className="notula-nav">
          {menu.map((item) => (
            <button
              key={item.nama}
              className={`notula-nav-item ${
                menuAktif === item.nama ? "selected" : ""
              }`}
              onClick={() => {
                setMenuAktif(item.nama);
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <span className="notula-nav-icon">{menuIcons[item.nama]}</span>
              <span>{item.nama}</span>
              {menuAktif === item.nama && (
                <span className="notula-active-mark" />
              )}
            </button>
          ))}
        </nav>

        <div className="notula-sidebar-footer">
          <span className="online-dot" />
          <div>
            <strong>Sipema Workspace v1.0</strong>
          </div>
        </div>
      </aside>

      <main className="notula-main">
        <header className="notula-topbar">
          <div className="notula-topbar-left">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              type="button"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          <div className="notula-account">
            <div className="notula-account-avatar">R</div>
            <div className="notula-account-info">
              <strong>Rina</strong>
              <span>Administrator</span>
            </div>
            <button
              className="notula-logout"
              onClick={onLogout}
              aria-label="Keluar"
              title="Keluar"
              type="button"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="notula-content">
          {menuAktif === "Beranda" ? (
            <>
              <section className="notula-welcome">
                <div>
                  <h1>Selamat pagi, Rina</h1>
                  <p>
                    Ringkasan seluruh meeting dan tindak lanjut.
                  </p>
                </div>
              </section>

              <section className="notula-stats">
                {statistik.map((item, idx) => {
                  const handleStatClick = () => {
                    if (item.judul === "Meeting bulan ini") {
                      setMenuAktif("Monitoring meeting");
                    } else if (item.judul === "Tindak lanjut belum selesai") {
                      setMenuAktif("Tindak lanjut");
                    } else if (item.judul === "Tindak lanjut selesai") {
                      setMenuAktif("Tindak lanjut");
                    } else if (item.judul === "Pengguna terdaftar") {
                      setMenuAktif("Pengguna");
                    }
                  };
                  return (
                    <article
                      className={`notula-stat-card stat-interactive${mounted ? " fade-in-up" : ""}`}
                      key={item.judul}
                      style={{ animationDelay: `${idx * 80}ms` }}
                      onClick={handleStatClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStatClick();
                        }
                      }}
                    >
                      <div className="notula-stat-top" />
                      <div className="notula-stat-content">
                        <span className="notula-stat-number">
                          <CountUp end={item.angka} />
                        </span>
                        <p>{item.judul}</p>
                      </div>
                    </article>
                  );
                })}
              </section>

              <section className="notula-bottom-grid">
                <article className={`notula-panel meeting-section${mounted ? " fade-in-up" : ""}`} style={{ animationDelay: "160ms" }}>
                  <div className="notula-panel-heading">
                    <div className="notula-panel-heading-title">
                      <span className="notula-dot" />
                      <h2>Meeting mendatang</h2>
                    </div>
                    <button
                      className="notula-view-all interactive-btn"
                      onClick={() => setMenuAktif("Monitoring meeting")}
                    >
                      Lihat semua
                    </button>
                  </div>

                  <div className="notula-meeting-list">
                    {meetings.map((meeting) => (
                      <div
                        className="notula-meeting-card"
                        key={meeting.judul}
                      >
                        <div className="notula-date-badge">
                          <strong>{meeting.tanggal}</strong>
                          <span>{meeting.bulan}</span>
                        </div>

                        <div className="notula-meeting-info">
                          <h3>{meeting.judul}</h3>
                          <p>
                            {meeting.waktu} di {meeting.lokasi}
                          </p>
                        </div>

                        <button
                          className="notula-detail-button interactive-btn"
                          onClick={() =>
                            setMenuAktif("Monitoring meeting")
                          }
                        >
                          Detail
                        </button>
                      </div>
                    ))}
                  </div>
                </article>

                <article className={`notula-panel progress-section${mounted ? " fade-in-up" : ""}`} style={{ animationDelay: "240ms" }}>
                  <div className="notula-panel-heading">
                    <div className="notula-panel-heading-title">
                      <span className="notula-dot" />
                      <h2>Status tindak lanjut</h2>
                    </div>
                    <span className="notula-total-badge">32 total</span>
                  </div>

                  <div
                    className="notula-progress-bar"
                    role="img"
                    aria-label="20 selesai, 8 proses, dan 4 belum dimulai dari 32 tindak lanjut"
                  >
                    <span className="progress-complete" style={{ width: progressWidth === 100 ? "62.5%" : "0%" }} />
                    <span className="progress-process" style={{ width: progressWidth === 100 ? "25%" : "0%" }} />
                    <span className="progress-not-started" style={{ flex: progressWidth === 100 ? 1 : 0 }} />
                  </div>

                  <div className="notula-legend">
                    <button
                      className="notula-legend-item legend-clickable"
                      onClick={() => setMenuAktif("Tindak lanjut")}
                      type="button"
                    >
                      <span className="legend-dot legend-green" />
                      <div>
                        <p>Selesai (20)</p>
                      </div>
                    </button>

                    <button
                      className="notula-legend-item legend-clickable"
                      onClick={() => setMenuAktif("Tindak lanjut")}
                      type="button"
                    >
                      <span className="legend-dot legend-purple" />
                      <div>
                        <p>Proses (8)</p>
                      </div>
                    </button>

                    <button
                      className="notula-legend-item legend-clickable"
                      onClick={() => setMenuAktif("Tindak lanjut")}
                      type="button"
                    >
                      <span className="legend-dot legend-gray" />
                      <div>
                        <p>Belum dimulai (4)</p>
                      </div>
                    </button>
                  </div>
                </article>
              </section>
            </>
          ) : (
            <section className="notula-placeholder">
              <div className="placeholder-symbol">N</div>
              <p className="notula-eyebrow">NOTULA WORKSPACE</p>
                <h1>{menuAktif}</h1>
                <p>
                  Halaman {menuAktif.toLowerCase()} sedang dikembangkan.
                </p>
              <button
                className="notula-back-button"
                onClick={() => setMenuAktif("Beranda")}
              >
                ← Kembali ke Beranda
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const [sudahLogin, setSudahLogin] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !password) {
      setPesan("Username dan password wajib diisi.");
      return;
    }

    setSudahLogin(true);
  }

  if (sudahLogin) {
    return <Dashboard onLogout={() => {
      setSudahLogin(false);
      setUsername("");
      setPassword("");
      setPesan("");
    }} />;
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

export default App;
