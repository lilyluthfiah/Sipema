import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useOutletContext } from "react-router-dom";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";
import { detailMeetingSekretarisPath, ruteSekretaris } from "../../router/rute";
import { useAuth } from "../../auth/AuthContext";
import { CountUp, gayaKartu, gayaKepalaKartu, gayaTitik } from "../admin/Beranda";

/* ========================================
   DATA DUMMY DASHBOARD SEKRETARIS
   (Struktur dibuat bersih agar nantinya mudah
   dihubungkan ke API/backend tanpa ubah UI)
   ======================================== */

export const statistikSekretaris = [
  { angka: "2", judul: "Meeting mendatang", tujuan: ruteSekretaris.meeting },
  { angka: "0", judul: "Notulen belum diisi", tujuan: ruteSekretaris.meeting },
  { angka: "12", judul: "Tindak lanjut belum selesai", tujuan: ruteSekretaris.tindakLanjut },
  { angka: "20", judul: "Tindak lanjut selesai", tujuan: ruteSekretaris.tindakLanjut },
];

export const meetingsSekretaris = [
  {
    id: 1,
    tanggal: "8",
    bulan: "Okt",
    judul: "Rapat Evaluasi Proyek Q3",
    waktu: "09.00 di Ruang Rapat Utama",
  },
  {
    id: 2,
    tanggal: "12",
    bulan: "Okt",
    judul: "Planning Sprint Oktober",
    waktu: "09.00 di Ruang Rapat B",
  },
];

export const tindakLanjutSekretaris = [
  {
    id: 1,
    judul: "Dokumentasikan API modul absensi",
    pic: "Budi Santoso",
    tenggat: "16 Okt 2026",
    status: "Belum dimulai",
  },
  {
    id: 2,
    judul: "Susun revisi anggaran divisi IT",
    pic: "Budi Santoso",
    tenggat: "14 Okt 2026",
    status: "Proses",
  },
  {
    id: 3,
    judul: "Kirim rekap vendor ke Keuangan",
    pic: "Agus Pratama",
    tenggat: "9 Okt 2026",
    status: "Belum dimulai",
  },
];

/* ========================================
   BADGE STATUS TINDAK LANJUT
   Konsisten dengan palet dan design tokens SIPEMA
   ======================================== */

function BadgeStatus({ status }) {
  const gaya = (() => {
    switch (status) {
      case "Proses":
        return {
          background: "#ede9fe",
          color: WARNA.ungu,
          border: "1px solid #ddd3ff",
        };
      case "Selesai":
        return {
          background: "#ecfdf5",
          color: "#16a34a",
          border: "1px solid #bbf7d0",
        };
      case "Belum dimulai":
      default:
        return {
          background: "#f4f1f8",
          color: WARNA.teksRedup,
          border: "1px solid #e5dfec",
        };
    }
  })();

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: "10px", sm: "14px" },
        py: "5px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 650,
        lineHeight: 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...gaya,
      }}
    >
      {status}
    </Box>
  );
}

/* ========================================
   HALAMAN BERANDA SEKRETARIS
   ======================================== */

export default function BerandaSekretaris() {
  const navigate = useNavigate();
  const { pengguna } = useAuth();
  const outletCtx = useOutletContext();
  const mounted = outletCtx?.mounted ?? true;

  const namaUser = pengguna?.username
    ? pengguna.username.charAt(0).toUpperCase() + pengguna.username.slice(1)
    : "Dewi";

  return (
    <>
      {/* HEADER DASHBOARD */}
      <Box
        sx={{
          minHeight: "auto",
          mb: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
          ...(mounted ? animasiMasuk("0ms") : {}),
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              m: 0,
              color: WARNA.teksGelap,
              fontSize: { xs: "23px", md: "28px" },
              fontWeight: 800,
              letterSpacing: "-0.8px",
            }}
          >
            Selamat pagi, {namaUser}
          </Typography>
          <Typography
            sx={{
              mt: "8px",
              color: WARNA.teksRedup,
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            Meeting dan tindak lanjut yang sedang Anda kelola.
          </Typography>
        </Box>
      </Box>

      {/* 4 SUMMARY CARDS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: "16px",
          mb: "24px",
        }}
      >
        {statistikSekretaris.map((item, idx) => (
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
              transition:
                "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 24px rgba(109, 40, 217, 0.08)",
                borderColor: "#ddd3ff",
              },
              "&:active": {
                transform: "translateY(-1px) scale(0.99)",
                boxShadow: "0 6px 16px rgba(109, 40, 217, 0.06)",
              },
              "&:focus-visible": {
                outline: "2px solid #6d28d9",
                outlineOffset: 2,
              },
              ...(mounted ? animasiMasuk(`${idx * 80}ms`) : {}),
            }}
          >
            <Box sx={{ height: "3px", background: WARNA.ungu }} />
            <Box sx={{ p: { xs: "14px 12px 12px", md: "16px 18px 16px" } }}>
              <Typography
                sx={{
                  display: "block",
                  mb: "6px",
                  color: WARNA.ungu,
                  fontSize: { xs: "26px", md: "28px" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                }}
              >
                <CountUp end={item.angka} />
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  color: WARNA.teksRedup,
                  fontSize: { xs: "10px", md: "12px" },
                }}
              >
                {item.judul}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* SEKSI KONTEN: MEETING MENDATANG & TINDAK LANJUT BELUM SELESAI */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        {/* SEKSI KIRI: MEETING MENDATANG */}
        <Box sx={gayaKartu(mounted, "160ms")}>
          <Box sx={gayaKepalaKartu}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={gayaTitik} />
              <Typography
                sx={{
                  m: 0,
                  color: WARNA.teks,
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: 700,
                }}
              >
                Meeting mendatang
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(ruteSekretaris.meeting)}
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
                "&:focus-visible": {
                  outline: "2px solid #6d28d9",
                  outlineOffset: 2,
                },
              }}
            >
              Lihat semua
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            {meetingsSekretaris.map((meeting) => (
              <Box
                key={meeting.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "9px", md: "14px" },
                  p: { xs: "10px 8px", md: "14px" },
                  border: "1px solid #eee8f6",
                  borderRadius: "10px",
                  background: "#fff",
                  transition: "border-color 150ms ease, box-shadow 150ms ease",
                  "&:hover": {
                    borderColor: "#ddd3ff",
                    boxShadow: "0 4px 12px rgba(109, 40, 217, 0.04)",
                  },
                }}
              >
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
                  <Typography
                    sx={{
                      fontSize: { xs: "19px", md: "20px" },
                      lineHeight: 1,
                      fontWeight: 800,
                    }}
                  >
                    {meeting.tanggal}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.8px",
                    }}
                  >
                    {meeting.bulan}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      m: "0 0 6px",
                      color: WARNA.teks,
                      fontSize: { xs: "12px", md: "13px" },
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {meeting.judul}
                  </Typography>
                  <Typography
                    sx={{
                      m: 0,
                      color: WARNA.teksRedup,
                      fontSize: { xs: "10px", md: "11px" },
                    }}
                  >
                    {meeting.waktu}
                  </Typography>
                </Box>
                <Button
                  onClick={() => navigate(detailMeetingSekretarisPath(meeting.id))}
                  sx={{
                    flexShrink: 0,
                    px: { xs: "10px", md: "14px" },
                    py: { xs: "7px", md: "7px" },
                    minHeight: 0,
                    border: "1px solid #e7dcfa",
                    borderRadius: "8px",
                    background: "#fff",
                    color: WARNA.ungu,
                    fontSize: { xs: "10px", md: "11px" },
                    fontWeight: 600,
                    "&:hover": { background: "#f1eaff" },
                    "&:focus-visible": {
                      outline: "2px solid #6d28d9",
                      outlineOffset: 2,
                    },
                  }}
                >
                  Detail
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* SEKSI KANAN: TINDAK LANJUT BELUM SELESAI */}
        <Box sx={gayaKartu(mounted, "240ms")}>
          <Box sx={gayaKepalaKartu}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={gayaTitik} />
              <Typography
                sx={{
                  m: 0,
                  color: WARNA.teks,
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: 700,
                }}
              >
                Tindak lanjut belum selesai
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(ruteSekretaris.tindakLanjut)}
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
                "&:focus-visible": {
                  outline: "2px solid #6d28d9",
                  outlineOffset: 2,
                },
              }}
            >
              Lihat semua
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {tindakLanjutSekretaris.map((item, idx) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: "10px", sm: "14px" },
                  py: "14px",
                  px: "6px",
                  borderBottom:
                    idx < tindakLanjutSekretaris.length - 1
                      ? `1px solid ${WARNA.garis}`
                      : "none",
                  transition: "background-color 150ms ease",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#faf8fd",
                  },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      m: "0 0 5px",
                      color: WARNA.teks,
                      fontSize: { xs: "12px", md: "13px" },
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.judul}
                  </Typography>
                  <Typography
                    sx={{
                      m: 0,
                      color: WARNA.teksRedup,
                      fontSize: { xs: "10px", md: "11px" },
                    }}
                  >
                    {item.pic} · tenggat {item.tenggat}
                  </Typography>
                </Box>

                <BadgeStatus status={item.status} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

