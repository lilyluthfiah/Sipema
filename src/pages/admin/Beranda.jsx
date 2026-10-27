import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";
import { detailMeetingPath, rute } from "../../router/rute";

/* ========================================
   DATA RINGKASAN BERANDA
   ======================================== */

export const statistik = [
  { angka: "8", judul: "Meeting bulan ini", tujuan: rute.monitoringMeeting },
  { angka: "12", judul: "Tindak lanjut belum selesai", tujuan: rute.tindakLanjut },
  { angka: "20", judul: "Tindak lanjut selesai", tujuan: rute.tindakLanjut },
  { angka: "24", judul: "Pengguna terdaftar", tujuan: rute.pengguna },
];

export const meetings = [
  { id: 1, tanggal: "08", bulan: "OKT", judul: "Rapat Evaluasi Proyek Q3", waktu: "09.00–10.30 WIB", lokasi: "Ruang Meeting A" },
  { id: 2, tanggal: "12", bulan: "OKT", judul: "Planning Sprint Oktober", waktu: "13.30–15.00 WIB", lokasi: "Ruang Meeting B" },
];

/* ========================================
   KOMPONEN PENDUKUNG
   ======================================== */

export function CountUp({ end, duration = 900 }) {
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

export const gayaKartu = (mounted, delay) => ({
  minWidth: 0,
  p: { xs: "16px 12px", md: "22px" },
  border: `1px solid ${WARNA.garis}`,
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
  ...(mounted ? animasiMasuk(delay) : {}),
});

export const gayaKepalaKartu = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  mb: "18px",
};

export const gayaTitik = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: WARNA.ungu,
};

export const gayaTombolStatus = {
  width: "100%",
  justifyContent: "flex-start",
  gap: "8px",
  px: "4px",
  py: "6px",
  minHeight: 0,
  borderRadius: "8px",
  color: WARNA.teks,
  "&:hover": { background: "#f7f3ff" },
};

/* ========================================
   HALAMAN BERANDA ADMIN
   ======================================== */

export default function Beranda({ mounted, progressWidth }) {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ minHeight: "auto", mb: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", ...(mounted ? animasiMasuk("0ms") : {}) }}>
        <Box>
          <Typography component="h1" sx={{ m: 0, color: WARNA.teksGelap, fontSize: { xs: "23px", md: "28px" }, fontWeight: 800, letterSpacing: "-0.8px" }}>
            Selamat pagi, Rina
          </Typography>
          <Typography sx={{ mt: "8px", color: WARNA.teksRedup, fontSize: "13px", lineHeight: 1.6 }}>
            Ringkasan seluruh meeting dan tindak lanjut.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
          gap: "16px",
          mb: "24px",
        }}
      >
        {statistik.map((item, idx) => (
          <Box
            key={item.judul}
            role="button"
            tabIndex={0}
            onClick={() => navigate(item.tujuan)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(item.tujuan);
            }}
            sx={{
              minWidth: 0,
              overflow: "hidden",
              border: `1px solid ${WARNA.garis}`,
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
              cursor: "pointer",
              transition: "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 24px rgba(109, 40, 217, 0.08)", borderColor: "#ddd3ff" },
              "&:active": { transform: "translateY(-1px) scale(0.99)", boxShadow: "0 6px 16px rgba(109, 40, 217, 0.06)" },
              "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
              ...(mounted ? animasiMasuk(`${idx * 80}ms`) : {}),
            }}
          >
            <Box sx={{ height: "3px", background: WARNA.ungu }} />
            <Box sx={{ p: { xs: "14px 12px 12px", md: "16px 18px 16px" } }}>
              <Typography sx={{ display: "block", mb: "6px", color: WARNA.ungu, fontSize: { xs: "26px", md: "28px" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px" }}>
                <CountUp end={item.angka} />
              </Typography>
              <Typography sx={{ m: 0, color: WARNA.teksRedup, fontSize: { xs: "10px", md: "12px" } }}>
                {item.judul}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.4fr) minmax(290px, 0.9fr)" }, alignItems: "stretch", gap: "20px" }}>
        <Box sx={gayaKartu(mounted, "160ms")}>
          <Box sx={gayaKepalaKartu}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={gayaTitik} />
              <Typography sx={{ m: 0, color: WARNA.teks, fontSize: { xs: "14px", md: "15px" }, fontWeight: 700 }}>Meeting mendatang</Typography>
            </Box>
            <Button
              onClick={() => navigate(rute.monitoringMeeting)}
              sx={{
                flexShrink: 0,
                px: "10px",
                py: "6px",
                minHeight: 0,
                border: "1px solid #e7dcfa",
                borderRadius: "8px",
                background: "#fff",
                color: WARNA.ungu,
                fontSize: "11px",
                fontWeight: 600,
                "&:hover": { background: "#f1eaff" },
                "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
              }}
            >
              Lihat semua
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            {meetings.map((meeting) => (
              <Box key={meeting.id} sx={{ display: "flex", alignItems: "center", gap: { xs: "9px", md: "14px" }, p: { xs: "10px 8px", md: "14px" }, border: "1px solid #eee8f6", borderRadius: "10px", background: "#fff" }}>
                <Box
                  sx={{
                    width: { xs: 45, md: 48 },
                    height: { xs: 55, md: 56 },
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                    borderRadius: "8px",
                    background: "#f1eaff",
                    color: WARNA.ungu,
                  }}
                >
                  <Typography sx={{ fontSize: { xs: "20px", md: "20px" }, lineHeight: 1, fontWeight: 800 }}>{meeting.tanggal}</Typography>
                  <Typography sx={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.8px" }}>{meeting.bulan}</Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ m: "0 0 6px", color: WARNA.teks, fontSize: { xs: "11px", md: "13px" }, fontWeight: 600, lineHeight: 1.4 }}>{meeting.judul}</Typography>
                  <Typography sx={{ m: 0, color: WARNA.teksRedup, fontSize: { xs: "9px", md: "11px" } }}>{meeting.waktu} di {meeting.lokasi}</Typography>
                </Box>
                <Button
                  onClick={() => navigate(detailMeetingPath(meeting.id))}
                  sx={{
                    flexShrink: 0,
                    px: { xs: "8px", md: "12px" },
                    py: { xs: "8px", md: "7px" },
                    minHeight: 0,
                    border: "1px solid #e7dcfa",
                    borderRadius: "8px",
                    background: "#fff",
                    color: WARNA.ungu,
                    fontSize: { xs: "9px", md: "11px" },
                    fontWeight: 600,
                    "&:hover": { background: "#f1eaff" },
                    "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
                  }}
                >
                  Detail
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={gayaKartu(mounted, "240ms")}>
          <Box sx={gayaKepalaKartu}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={gayaTitik} />
              <Typography sx={{ m: 0, color: WARNA.teks, fontSize: { xs: "14px", md: "15px" }, fontWeight: 700 }}>Status tindak lanjut</Typography>
            </Box>
            <Box sx={{ px: "10px", py: "6px", border: "1px solid #e6dcfb", borderRadius: "8px", background: "#f4efff", color: WARNA.ungu, fontSize: "11px", fontWeight: 600 }}>32 total</Box>
          </Box>

          <Box sx={{ width: "100%", height: "10px", overflow: "hidden", display: "flex", borderRadius: "8px", background: "#eeeaf3" }}>
            <Box sx={{ height: "100%", width: progressWidth === 100 ? "62.5%" : "0%", background: "#22c55e", transition: "width 600ms ease" }} />
            <Box sx={{ height: "100%", width: progressWidth === 100 ? "25%" : "0%", background: WARNA.ungu, transition: "width 600ms ease" }} />
            <Box sx={{ height: "100%", flex: progressWidth === 100 ? 1 : 0, background: "#d6d3e0", transition: "flex 600ms ease" }} />
          </Box>

          <Box sx={{ mt: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button onClick={() => navigate(rute.tindakLanjut)} sx={gayaTombolStatus}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <Typography sx={{ fontSize: "12px" }}>Selesai (20)</Typography>
            </Button>
            <Button onClick={() => navigate(rute.tindakLanjut)} sx={gayaTombolStatus}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: WARNA.ungu }} />
              <Typography sx={{ fontSize: "12px" }}>Proses (8)</Typography>
            </Button>
            <Button onClick={() => navigate(rute.tindakLanjut)} sx={gayaTombolStatus}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#a3a3a3" }} />
              <Typography sx={{ fontSize: "12px" }}>Belum dimulai (4)</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
