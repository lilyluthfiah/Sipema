import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../auth/AuthContext";
import { menuNavigasiKaryawan, rute, ruteKaryawan } from "../../router/rute";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { SidebarContent, Topbar } from "../admin/DashboardAdmin";
import { ThemeProvider } from "@mui/material/styles";
import { namaKaryawanDariUsername } from "../../data/karyawan";

export default function DashboardKaryawan() {
  const mounted = true;
  const isMobile = useMediaQuery("(max-width:700px)");
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, pengguna } = useAuth();
  const namaUser = namaKaryawanDariUsername(pengguna?.username);
  const inisialUser = namaUser.charAt(0).toUpperCase();

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
              <SidebarContent menu={menuNavigasiKaryawan} homePath={ruteKaryawan.beranda} />
            </Box>
          </Box>
        )}

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
              menu={menuNavigasiKaryawan}
              homePath={ruteKaryawan.beranda}
              onItemClick={() => setMobileDrawerOpen(false)}
            />
          </Drawer>
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Topbar
            user={{ nama: namaUser, peran: "Karyawan", inisial: inisialUser }}
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
            <Outlet context={{ mounted, namaUser }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
