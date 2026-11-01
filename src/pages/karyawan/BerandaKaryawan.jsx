import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ambilMeetingKaryawan, ambilTindakLanjutKaryawan } from "../../data/karyawan";
import {
  detailMeetingKaryawanPath,
  detailTindakLanjutKaryawanPath,
  ruteKaryawan,
} from "../../router/rute";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";
import {
  gayaKartu,
  gayaKepalaKartu,
  gayaTitik,
} from "../admin/Beranda";

function tanggalMeeting(meeting) {
  const [hari, bulan] = meeting.tanggalLengkap.split(" ");
  return { hari, bulan };
}

function gayaBadge(status) {
  if (status === "Proses") {
    return {
      background: "#ede9fe",
      color: WARNA.ungu,
      border: "1px solid #ddd3ff",
    };
  }
  if (status === "Selesai") {
    return {
      background: "#ecfdf5",
      color: "#16a34a",
      border: "1px solid #bbf7d0",
    };
  }
  return {
    background: "#f4f1f8",
    color: WARNA.teksRedup,
    border: "1px solid #e5dfec",
  };
}

function BadgeStatus({ status }) {
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
        ...gayaBadge(status),
      }}
    >
      {status}
    </Box>
  );
}

export default function BerandaKaryawan() {
  const navigate = useNavigate();
  const { mounted = true, namaUser = "Budi Santoso" } = useOutletContext() || {};
  const [meetings] = useState(() => ambilMeetingKaryawan(namaUser));
  const [tindakLanjut] = useState(() => ambilTindakLanjutKaryawan(namaUser));
  const belumSelesai = tindakLanjut.filter((item) => item.status !== "Selesai");
  const selesai = tindakLanjut.filter((item) => item.status === "Selesai");
  const statistik = [
    { angka: meetings.length, judul: "Meeting mendatang", tujuan: ruteKaryawan.meeting },
    { angka: belumSelesai.length, judul: "Tindak lanjut belum selesai", tujuan: ruteKaryawan.tindakLanjut },
    { angka: selesai.length, judul: "Tindak lanjut selesai", tujuan: ruteKaryawan.tindakLanjut },
  ];

  return (
    <>
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
            Selamat pagi, {namaUser.split(" ")[0]}
          </Typography>
          <Typography sx={{ mt: "8px", color: WARNA.teksRedup, fontSize: "13px", lineHeight: 1.6 }}>
            Meeting yang Anda ikuti dan tindak lanjut yang menjadi tanggung jawab Anda.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: "16px",
          mb: "24px",
        }}
      >
        {statistik.map((item, index) => (
          <Box
            key={item.judul}
            role="button"
            tabIndex={0}
            onClick={() => navigate(item.tujuan)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") navigate(item.tujuan);
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
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 24px rgba(109, 40, 217, 0.08)",
                borderColor: "#ddd3ff",
              },
              "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
              ...(mounted ? animasiMasuk(`${index * 80}ms`) : {}),
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
                {item.angka}
              </Typography>
              <Typography sx={{ m: 0, color: WARNA.teksRedup, fontSize: { xs: "10px", md: "12px" } }}>
                {item.judul}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.6fr) minmax(0, 1fr)" },
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        <Box sx={{ ...gayaKartu(mounted), ...(mounted ? animasiMasuk("160ms") : {}) }}>
          <Box sx={gayaKepalaKartu}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={gayaTitik} />
              <Typography sx={{ m: 0, color: WARNA.teks, fontSize: { xs: "14px", md: "15px" }, fontWeight: 700 }}>
                Meeting mendatang
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(ruteKaryawan.meeting)}
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
              }}
            >
              Lihat semua
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            {meetings.slice(0, 2).map((meeting) => {
              const { hari, bulan } = tanggalMeeting(meeting);
              return (
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
                    "&:hover": { borderColor: "#ddd3ff", boxShadow: "0 4px 12px rgba(109, 40, 217, 0.04)" },
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
                    <Typography sx={{ fontSize: { xs: "19px", md: "20px" }, lineHeight: 1, fontWeight: 800 }}>
                      {hari}
                    </Typography>
                    <Typography sx={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.8px" }}>
                      {bulan}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ m: "0 0 6px", color: WARNA.teks, fontSize: { xs: "12px", md: "13px" }, fontWeight: 600, lineHeight: 1.4 }}>
                      {meeting.judul}
                    </Typography>
                    <Typography sx={{ m: 0, color: WARNA.teksRedup, fontSize: { xs: "10px", md: "11px" } }}>
                      {meeting.jamMulai} di {meeting.lokasi}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => navigate(detailMeetingKaryawanPath(meeting.id))}
                    sx={{
                      flexShrink: 0,
                      px: { xs: "10px", md: "14px" },
                      py: "7px",
                      minHeight: 0,
                      border: "1px solid #e7dcfa",
                      borderRadius: "8px",
                      background: "#fff",
                      color: WARNA.ungu,
                      fontSize: { xs: "10px", md: "11px" },
                      fontWeight: 600,
                      "&:hover": { background: "#f1eaff" },
                    }}
                  >
                    Detail
                  </Button>
                </Box>
              );
            })}
            {!meetings.length && (
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                Belum ada meeting mendatang yang terjadwal untuk Anda.
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ ...gayaKartu(mounted), ...(mounted ? animasiMasuk("240ms") : {}) }}>
          <Box sx={gayaKepalaKartu}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={gayaTitik} />
              <Typography sx={{ m: 0, color: WARNA.teks, fontSize: { xs: "14px", md: "15px" }, fontWeight: 700 }}>
                Tindak lanjut saya
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(ruteKaryawan.tindakLanjut)}
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
              }}
            >
              Lihat semua
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {belumSelesai.slice(0, 2).map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: "10px", sm: "14px" },
                  py: "14px",
                  px: "6px",
                  borderBottom: index < Math.min(belumSelesai.length, 2) - 1 ? `1px solid ${WARNA.garis}` : "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#faf8fd" },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ m: "0 0 5px", color: WARNA.teks, fontSize: { xs: "12px", md: "13px" }, fontWeight: 600, lineHeight: 1.4 }}>
                    {item.judul}
                  </Typography>
                  <Typography sx={{ m: 0, color: WARNA.teksRedup, fontSize: { xs: "10px", md: "11px" } }}>
                    Deadline {item.tenggat.split("-").reverse().join(" ")}
                  </Typography>
                </Box>
                <BadgeStatus status={item.status} />
                <Button
                  onClick={() => navigate(detailTindakLanjutKaryawanPath(item.id))}
                  sx={{
                    flexShrink: 0,
                    px: { xs: "10px", md: "14px" },
                    py: "7px",
                    minHeight: 0,
                    border: 0,
                    borderRadius: "8px",
                    backgroundColor: WARNA.teksGelap,
                    color: "#fff",
                    fontSize: { xs: "10px", md: "11px" },
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#150c24" },
                  }}
                >
                  Update
                </Button>
              </Box>
            ))}
            {!belumSelesai.length && (
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                Tidak ada tindak lanjut yang perlu diperbarui.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
