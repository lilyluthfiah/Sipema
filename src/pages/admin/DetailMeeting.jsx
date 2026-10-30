import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";
import { meetings } from "./Beranda";
import { rute } from "../../router/rute";

/* ========================================
   DETAIL MEETING (useParams)
   Membuka detail satu meeting berdasarkan :id pada URL.
   ======================================== */

export default function DetailMeeting({
  kembaliPath = rute.monitoringMeeting,
  labelKembali = "Monitoring meeting",
  meetingsData = meetings,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const meeting = meetingsData.find(
    (item) =>
      String(item.id) === String(id) ||
      String(item.kode || "").toLowerCase() === String(id).toLowerCase()
  );

  if (!meeting) {
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
        <Typography component="h1" sx={{ m: 0, color: "#302040", fontSize: "22px", fontWeight: 800 }}>
          Meeting tidak ditemukan
        </Typography>
        <Typography sx={{ maxWidth: 440, mt: "12px", mb: "22px", color: "#90869e", fontSize: "12px", lineHeight: 1.8 }}>
          Data meeting dengan ID atau kode <strong>{id}</strong> tidak tersedia.
        </Typography>
        <Button
          onClick={() => navigate(kembaliPath)}
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
          ← Kembali ke {labelKembali}
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box component="header" sx={{ mb: "24px", ...animasiMasuk("0ms") }}>
        <Button
          onClick={() => navigate(kembaliPath)}
          sx={{
            mb: "14px",
            p: 0,
            minHeight: 0,
            background: "transparent",
            color: WARNA.ungu,
            fontSize: "11px",
            fontWeight: 700,
            "&:hover": { background: "transparent", color: WARNA.unguHover },
          }}
        >
          ← Kembali
        </Button>
        <Typography component="h1" sx={{ m: 0, color: WARNA.teksGelap, fontSize: { xs: "23px", md: "28px" }, fontWeight: 800, letterSpacing: "-0.8px" }}>
          {meeting.judul}
        </Typography>
        <Typography sx={{ mt: "8px", color: WARNA.teksRedup, fontSize: "13px", lineHeight: 1.6 }}>
          {meeting.kode ? `${meeting.kode} · ` : ""}Detail meeting {meeting.id}
        </Typography>
      </Box>

      <Box
        component="section"
        sx={{
          p: { xs: "16px 12px", md: "22px" },
          border: `1px solid ${WARNA.garis}`,
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
          ...animasiMasuk("80ms"),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "14px", mb: "18px" }}>
          <Box
            sx={{
              width: 54,
              height: 60,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              background: "#f1eaff",
              color: WARNA.ungu,
            }}
          >
            <Typography sx={{ fontSize: "22px", lineHeight: 1, fontWeight: 800 }}>{meeting.tanggal}</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px" }}>{meeting.bulan}</Typography>
          </Box>
          <Box>
            <Typography sx={{ m: 0, color: WARNA.teks, fontSize: "16px", fontWeight: 700 }}>{meeting.judul}</Typography>
            <Typography sx={{ mt: "4px", color: WARNA.teksRedup, fontSize: "12px" }}>
              {meeting.waktu} · {meeting.lokasi}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${WARNA.garis}`, pt: "16px", mt: "16px" }}>
          <Typography sx={{ color: WARNA.teksRedup, fontSize: "12px", lineHeight: 1.8 }}>
            Halaman detail meeting ini menampilkan informasi lengkap meeting, agenda pembahasan, dan notulen yang terkait.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
