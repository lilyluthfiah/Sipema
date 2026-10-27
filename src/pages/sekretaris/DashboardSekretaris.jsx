import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet, useNavigate } from "react-router-dom";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { menuNavigasiSekretaris, rute, ruteSekretaris } from "../../router/rute";
import { useAuth } from "../../auth/AuthContext";
import { SidebarContent, Topbar } from "../admin/DashboardAdmin";

/* ========================================
   LAYOUT DASHBOARD SEKRETARIS
   Menggunakan komponen Sidebar & Topbar yang sama persis
   dengan Dashboard Admin, disesuaikan untuk menu & role Sekretaris.
   ======================================== */

export default function DashboardSekretaris() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, pengguna } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(rute.login, { replace: true });
  };

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileDrawerOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen((prev) => !prev);
    }
  };

  const namaUser = pengguna?.username
    ? pengguna.username.charAt(0).toUpperCase() + pengguna.username.slice(1)
    : "Dewi";
  const inisialUser = namaUser.charAt(0).toUpperCase();

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          background: WARNA.lavendel,
          color: WARNA.teks,
          fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
          fontSize: 13,
        }}
      >
        {/* SIDEBAR DESKTOP */}
        {!isMobile && (
          <Box
            sx={{
              width: desktopSidebarOpen ? 190 : 0,
              transition: "width 200ms ease",
              overflow: "hidden",
              flexShrink: 0,
              position: "sticky",
              top: 0,
              alignSelf: "flex-start",
              height: "100vh",
            }}
          >
            <Box sx={{ width: 190 }}>
              <SidebarContent
                menu={menuNavigasiSekretaris}
                homePath={ruteSekretaris.beranda}
              />
            </Box>
          </Box>
        )}

        {/* SIDEBAR MOBILE (DRAWER) */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            slotProps={{
              modal: { keepMounted: true },
              paper: { sx: { width: 70, backgroundColor: WARNA.teksGelap } },
            }}
          >
            <SidebarContent
              menu={menuNavigasiSekretaris}
              homePath={ruteSekretaris.beranda}
              onItemClick={() => setMobileDrawerOpen(false)}
            />
          </Drawer>
        )}

        {/* AREA KONTEN UTAMA */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Topbar
            user={{
              nama: namaUser,
              peran: "Sekretaris",
              inisial: inisialUser,
            }}
            onToggleSidebar={handleToggleSidebar}
            onLogout={handleLogout}
          />

          <Box
            sx={{
              maxWidth: 1400,
              mx: "auto",
              px: { xs: "16px", md: "32px" },
              py: { xs: "20px", md: "28px" },
            }}
          >
            <Outlet context={{ mounted }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

