import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { WARNA } from "../../theme/sipemaTheme";
import { menuNavigasi, rute } from "../../router/rute";

/* ========================================
   HALAMAN PLACEHOLDER
   Dipakai untuk menu yang belum punya halaman khusus,
   memakai judul dari lokasi URL (bukan state palsu).
   ======================================== */

export default function HalamanPlaceholder({ judul }) {
  const navigate = useNavigate();
  const lokasi = useLocation();

  const namaHalaman =
    judul ||
    menuNavigasi.find((item) => item.path === lokasi.pathname)?.nama ||
    "Halaman";

  return (
    <Box
      sx={{
        minHeight: 390,
        p: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${WARNA.garis}`,
        borderRadius: "17px",
        background: "#fff",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 65,
          height: 65,
          mb: "22px",
          display: "grid",
          placeItems: "center",
          borderRadius: "20px",
          background: `linear-gradient(135deg, ${WARNA.unguLight}, ${WARNA.ungu})`,
          boxShadow: "0 8px 20px #6d28d926",
          color: "#fff",
          fontSize: "31px",
          fontWeight: 800,
        }}
      >
        {namaHalaman.charAt(0)}
      </Box>
      <Typography sx={{ m: "0 0 11px", color: "#8c6bc3", fontSize: "10px", fontWeight: 750, letterSpacing: "1.5px" }}>
        SIPEMA WORKSPACE
      </Typography>
      <Typography component="h1" sx={{ m: 0, color: "#302040", fontSize: "25px", fontWeight: 800 }}>
        {namaHalaman}
      </Typography>
      <Typography sx={{ maxWidth: 440, mt: "12px", mb: "22px", color: "#90869e", fontSize: "12px", lineHeight: 1.8 }}>
        Halaman {namaHalaman.toLowerCase()} sedang dikembangkan.
      </Typography>
      <Button
        onClick={() => navigate(rute.beranda)}
        sx={{
          px: "17px",
          py: "12px",
          minHeight: 0,
          borderRadius: "9px",
          background: WARNA.ungu,
          color: "#fff",
          fontSize: "12px",
          "&:hover": { background: WARNA.unguHover },
        }}
      >
        ← Kembali ke Beranda
      </Button>
    </Box>
  );
}
