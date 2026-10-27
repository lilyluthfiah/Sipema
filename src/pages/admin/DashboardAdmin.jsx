import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { menuNavigasi, rute, ruteSekretaris } from "../../router/rute";
import { useAuth } from "../../auth/AuthContext";

/* ========================================
   ICON SIDEBAR & TOPBAR
   ======================================== */

export function IkonBeranda() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IkonPengguna() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IkonHakAkses() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function IkonMeeting() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export function IkonTindakLanjut() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

export function IkonLaporan() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  );
}

export function IkonMenu() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function IkonKeluar() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

/* ========================================
   DATA IKON MENU
   Kunci memakai `path` agar sinkron dengan NavLink.
   ======================================== */

export const menuIcons = {
  [rute.beranda]: <IkonBeranda />,
  [rute.pengguna]: <IkonPengguna />,
  [rute.hakAkses]: <IkonHakAkses />,
  [rute.monitoringMeeting]: <IkonMeeting />,
  [rute.tindakLanjut]: <IkonTindakLanjut />,
  [rute.laporan]: <IkonLaporan />,
  [ruteSekretaris.beranda]: <IkonBeranda />,
  [ruteSekretaris.meeting]: <IkonMeeting />,
  [ruteSekretaris.tindakLanjut]: <IkonTindakLanjut />,
};

/* ========================================
   SIDEBAR (Link & NavLink)
   ======================================== */

export function SidebarContent({ onItemClick, menu = menuNavigasi, homePath = rute.beranda }) {
  return (
    <Box
      sx={{
        width: { xs: 70, md: 190 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        py: { xs: "18px", md: "24px" },
        px: { xs: "8px", md: "14px" },
        color: "#fff",
        background: WARNA.teksGelap,
      }}
    >
      <Box sx={{ px: { xs: 0, md: "6px" }, pb: { xs: "24px", md: "32px" }, display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
        <Box
          component={NavLink}
          to={homePath}
          onClick={onItemClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            color: "#FFFFFF",
            textDecoration: "none",
            "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2, borderRadius: "10px" },
          }}
        >
          <Box component="svg" viewBox="0 0 48 48" aria-hidden="true" sx={{ width: { xs: 38, md: 42 }, height: { xs: 38, md: 42 }, overflow: "visible", filter: "drop-shadow(0 2px 3px rgba(109, 40, 217, 0.18))" }}>
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
          </Box>
          <Typography component="span" sx={{ display: { xs: "none", md: "inline" }, fontSize: 26, fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1, ml: "-10px", color: "#FFFFFF" }}>
            ipema
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ display: { xs: "none", md: "block" }, px: "12px", mb: "13px", color: "#9f90b6", fontSize: "10px", fontWeight: 750, letterSpacing: "1.4px" }}>
        MENU UTAMA
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {menu.map((item) => (
          <Button
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onItemClick}
            sx={{
              minHeight: 46,
              width: "100%",
              justifyContent: { xs: "center", md: "flex-start" },
              px: { xs: 0, md: "13px" },
              position: "relative",
              gap: "13px",
              textDecoration: "none",
              border: "1px solid transparent",
              borderRadius: "11px",
              backgroundColor: "transparent",
              color: "#c9bfd8",
              fontSize: "12px",
              fontWeight: 400,
              textAlign: "left",
              "&:hover": {
                backgroundColor: "#ffffff0c",
                color: "#fff",
              },
              "&.active": {
                border: "1px solid #a78bfa35",
                borderRadius: "10px",
                backgroundColor: WARNA.ungu,
                color: "#fff",
                fontWeight: 700,
                "&:hover": { backgroundColor: WARNA.ungu },
              },
              "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
            }}
          >
            <Box
              component="span"
              className="menu-ikon"
              sx={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", color: "#c9bfd8", "&.active": { color: "#ffffff" } }}
            >
              {menuIcons[item.path]}
            </Box>
            <Typography component="span" sx={{ display: { xs: "none", md: "inline" }, fontSize: "12px" }}>
              {item.nama}
            </Typography>
            {item && (
              <Box
                component="span"
                aria-hidden="true"
                sx={{
                  display: "none",
                  width: 3,
                  height: 21,
                  position: "absolute",
                  right: "-1px",
                  borderRadius: "5px 0 0 5px",
                  background: "#d8c6ff",
                }}
              />
            )}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

/* ========================================
   TOPBAR
   ======================================== */

export function Topbar({ onToggleSidebar, onLogout, user }) {
  const { pengguna } = useAuth();
  const namaUser = user?.nama || (pengguna?.username ? (pengguna.username.charAt(0).toUpperCase() + pengguna.username.slice(1)) : "Rina");
  const peranUser = user?.peran || (pengguna?.peran || "Administrator");
  const inisialUser = user?.inisial || namaUser.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        height: { xs: 65, md: 72 },
        px: { xs: "12px", md: "16px 16px 0 12px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        background: "#fff",
        borderBottom: `1px solid ${WARNA.garis}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          sx={{
            border: `1px solid ${WARNA.garis}`,
            borderRadius: "8px",
            color: WARNA.teks,
            "&:hover": { background: "#f7f3ff", borderColor: "#ddd3ff" },
            "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
          }}
        >
          <IkonMenu />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "11px" }}>
        <Box
          sx={{
            width: 37,
            height: 37,
            display: "grid",
            placeItems: "center",
            borderRadius: "12px",
            background: "#eee7ff",
            color: WARNA.ungu,
            fontSize: "15px",
            fontWeight: 750,
          }}
        >
          {inisialUser}
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography sx={{ color: "#392b4b", fontSize: "12px", fontWeight: 600 }}>{namaUser}</Typography>
          <Typography sx={{ mt: "4px", color: WARNA.teksRedupLembut, fontSize: "10px" }}>{peranUser}</Typography>
        </Box>
        <IconButton
          onClick={onLogout}
          aria-label="Keluar"
          title="Keluar"
          sx={{
            width: 34,
            height: 34,
            ml: "8px",
            border: "1px solid #eee8f5",
            borderRadius: "10px",
            color: "#746482",
            "&:hover": { background: "#f4edff", color: WARNA.ungu },
          }}
        >
          <IkonKeluar />
        </IconButton>
      </Box>
    </Box>
  );
}

/* ========================================
   LAYOUT DASHBOARD (nested routes + Outlet)
   Sidebar & Topbar tetap tampil saat berpindah halaman.
   ======================================== */

export default function DashboardAdmin() {
  const [mounted, setMounted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setProgressWidth(100), 120);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(rute.login, { replace: true });
  };

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ minHeight: "100vh", display: "flex", background: WARNA.lavendel, color: WARNA.teks, fontFamily: "'Plus Jakarta Sans', Arial, sans-serif", fontSize: 13 }}>
        {!isMobile && (
          <Box sx={{ width: sidebarOpen ? 190 : 0, transition: "width 200ms ease", overflow: "hidden", flexShrink: 0, position: "sticky", top: 0, alignSelf: "flex-start", height: "100vh" }}>
            <Box sx={{ width: 190 }}>
              <SidebarContent />
            </Box>
          </Box>
        )}
        {isMobile && (
          <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            slotProps={{
              modal: { keepMounted: true },
              paper: { sx: { width: 70, backgroundColor: WARNA.teksGelap } },
            }}
          >
            <SidebarContent onItemClick={() => setSidebarOpen(false)} />
          </Drawer>
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Topbar
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            onLogout={handleLogout}
          />

          <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: "16px", md: "32px" }, py: { xs: "20px", md: "28px" } }}>
            <Outlet context={{ mounted, progressWidth }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
