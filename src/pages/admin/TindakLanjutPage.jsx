import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

const daftarTindakLanjut = [
  { id: 1, judul: "Susun revisi anggaran divisi IT", kodeTL: "TL-031", kodeMeeting: "M-013", judulMeeting: "Koordinasi Anggaran 2027", pic: "Budi Santoso", picInisial: "BS", tenggat: "14 Okt 2026", status: "Proses", deskripsi: "Susun revisi alokasi sisa anggaran 2026 divisi IT dengan rincian per kegiatan.", dibuatOleh: "Dewi Anggraini", dibuatTanggal: "6 Okt 2026", lampiran: { nama: "Draf-revisi-anggaran-IT.xlsx", info: "Diunggah 5 Okt 2026" } },
  { id: 2, judul: "Kirim rekap vendor ke Keuangan", kodeTL: "TL-030", kodeMeeting: "M-013", judulMeeting: "Koordinasi Anggaran 2027", pic: "Agus Pratama", picInisial: "AP", tenggat: "9 Okt 2026", status: "Belum dimulai", deskripsi: "Kirim rekap vendor terkait anggaran 2027 ke divisi Keuangan.", dibuatOleh: "Dewi Anggraini", dibuatTanggal: "6 Okt 2026", lampiran: { nama: "Rekap-vendor-2027.xlsx", info: "Diunggah 6 Okt 2026" } },
  { id: 3, judul: "Verifikasi data absensi Q3", kodeTL: "TL-029", kodeMeeting: "M-012", judulMeeting: "Review Sistem Absensi", pic: "Siti Rahmawati", picInisial: "SR", tenggat: "12 Okt 2026", status: "Selesai", deskripsi: "Verifikasi rekap absensi periode Q3 untuk pelaporan.", dibuatOleh: "Dewi Anggraini", dibuatTanggal: "28 Sep 2026", lampiran: { nama: "Verifikasi-absensi-Q3.pdf", info: "Diunggah 29 Sep 2026" } },
  { id: 4, judul: "Finalisasi draft SOP", kodeTL: "TL-028", kodeMeeting: "M-011", judulMeeting: "Sosialisasi SOP Baru", pic: "Hendra Wijaya", picInisial: "HW", tenggat: "15 Okt 2026", status: "Proses", deskripsi: "Finalisasi draft SOP berdasarkan masukan hasil sosialisasi.", dibuatOleh: "Dewi Anggraini", dibuatTanggal: "25 Sep 2026", lampiran: { nama: "Draft-SOP-Final.docx", info: "Diunggah 26 Sep 2026" } },
];

const opsiPIC = ["Semua PIC"];
const opsiMeeting = ["Semua meeting"];

function statusStyle(status) {
  if (status === "Selesai") {
    return {
      backgroundColor: "rgba(46, 125, 50, 0.1)",
      color: "#2e7d32",
      border: "1px solid rgba(46, 125, 50, 0.4)",
    };
  }
  if (status === "Proses") {
    return {
      backgroundColor: "rgba(255, 152, 0, 0.14)",
      color: "#ed6c02",
      border: "1px solid rgba(255, 152, 0, 0.5)",
    };
  }
  return {
    backgroundColor: "rgba(158, 158, 158, 0.16)",
    color: "#616161",
    border: "1px solid rgba(158, 158, 158, 0.55)",
  };
}

function DetailTindakLanjut({ data, onKembali }) {
  const avatarStyle = {
    width: 32,
    height: 32,
    bgcolor: "rgba(109, 40, 217, 0.14)",
    color: WARNA.ungu,
    fontSize: 11,
    fontWeight: 700,
  };

  return (
    <Box sx={{ ...animasiMasuk("0ms") }}>
      <Breadcrumbs sx={{ mb: 1.5 }}>
        <Link underline="hover" color="text.secondary" sx={{ cursor: "pointer" }} onClick={onKembali}>
          Tindak lanjut
        </Link>
        <Typography color="text.primary">Detail</Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap, lineHeight: 1.3 }}>
          {data.judul}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${WARNA.garis}`,
              backgroundColor: "#ffffff",
              p: { xs: 2, md: 3 },
              height: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 2, fontSize: 15 }}>Rincian tindak lanjut</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: WARNA.teksRedupLembut, mb: 0.5 }}>Deskripsi</Typography>
                <Typography sx={{ color: WARNA.teks, fontSize: 14, lineHeight: 1.8 }}>{data.deskripsi}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: WARNA.teksRedupLembut, mb: 0.75 }}>PIC</Typography>
                <Typography sx={{ color: WARNA.teks, fontWeight: 600, fontSize: 13 }}>{data.pic}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: WARNA.teksRedupLembut, mb: 0.5 }}>Tenggat</Typography>
                <Typography sx={{ color: WARNA.teks, fontWeight: 600, fontSize: 13 }}>{data.tenggat}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: WARNA.teksRedupLembut, mb: 0.5 }}>Dibuat oleh</Typography>
                <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{data.dibuatOleh} · {data.dibuatTanggal}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: WARNA.teksRedupLembut, mb: 0.75 }}>Status</Typography>
                <Chip label={data.status} size="small" sx={{ height: 26, fontSize: 11, fontWeight: 600, borderRadius: 2, ...statusStyle(data.status) }} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
                  <Typography variant="body2" sx={{ color: WARNA.teksRedupLembut }}>Progress</Typography>
                  <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600 }}>65%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: "rgba(109, 40, 217, 0.08)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: WARNA.ungu,
                      borderRadius: 999,
                    },
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${WARNA.garis}`,
              backgroundColor: "#ffffff",
              p: { xs: 2, md: 3 },
              height: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 2, fontSize: 15 }}>Hasil tindak lanjut</Typography>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 2,
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: "#f8f6fe",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                <InsertDriveFileIcon sx={{ color: WARNA.ungu, flexShrink: 0 }} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 700 }}>{data.lampiran.nama}</Typography>
                  <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{data.lampiran.info}</Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#e7dcfa",
                  color: WARNA.ungu,
                  flexShrink: 0,
                  "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
                }}
              >
                Unduh
              </Button>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function TindakLanjutPage() {
  const [mounted, setMounted] = useState(true);
  const [cari, setCari] = useState("");
  const [picFilter, setPicFilter] = useState("Semua PIC");
  const [meetingFilter, setMeetingFilter] = useState("Semua meeting");
  const [statusChip, setStatusChip] = useState("Semua");
  const [selectedTL, setSelectedTL] = useState(null);

  const avatarStyle = {
    width: 30,
    height: 30,
    bgcolor: "rgba(109, 40, 217, 0.14)",
    color: WARNA.ungu,
    fontSize: 11,
    fontWeight: 700,
  };

  const counts = useMemo(() => {
    const semua = daftarTindakLanjut.length;
    const belum = daftarTindakLanjut.filter((x) => x.status === "Belum dimulai").length;
    const proses = daftarTindakLanjut.filter((x) => x.status === "Proses").length;
    const selesai = daftarTindakLanjut.filter((x) => x.status === "Selesai").length;
    return { semua, belum, proses, selesai };
  }, []);

  const daftarTersaring = useMemo(() => {
    const kunci = cari.trim().toLowerCase();
    return daftarTindakLanjut.filter((item) => {
      const cocokCari = kunci === "" || item.judul.toLowerCase().includes(kunci) || item.kodeTL.toLowerCase().includes(kunci) || item.kodeMeeting.toLowerCase().includes(kunci);
      const cocokPic = picFilter === "Semua PIC" || item.pic === picFilter;
      const cocokMeeting = meetingFilter === "Semua meeting" || item.kodeMeeting === meetingFilter || item.judulMeeting === meetingFilter;
      const cocokStatus = statusChip === "Semua" || item.status === statusChip;
      return cocokCari && cocokPic && cocokMeeting && cocokStatus;
    });
  }, [cari, picFilter, meetingFilter, statusChip]);

  if (selectedTL) {
    return (
      <ThemeProvider theme={sipemaTheme}>
        <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
          <DetailTindakLanjut data={selectedTL} onKembali={() => setSelectedTL(null)} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
        <Box sx={{ mb: 2.5, ...(mounted ? animasiMasuk("0ms") : {}) }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap }}>
            Tindak lanjut
          </Typography>
        </Box>

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            padding: 3,
            boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
            border: `1px solid ${WARNA.garis}`,
            backgroundColor: "#ffffff",
            ...(mounted ? animasiMasuk("80ms") : {}),
            "@media (max-width:700px)": { padding: 2 },
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", mb: 3 }}>
            <TextField
              size="small"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari tindak lanjut"
              sx={{ width: "100%", maxWidth: 340, "@media (max-width:700px)": { maxWidth: "100%" }, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: WARNA.teksAbu, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer sx={{ maxWidth: "100%", borderRadius: 2, border: `1px solid ${WARNA.garis}`, overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Tindak lanjut</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>PIC</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Tenggat</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daftarTersaring.map((item) => (
                  <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13 }}>{item.judul}</Typography>
                        <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{item.kodeTL} · {item.kodeMeeting}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ ...avatarStyle }}>{item.picInisial}</Avatar>
                        <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{item.pic}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{item.tenggat}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Chip label={item.status} size="small" sx={{ height: 26, fontSize: 11, fontWeight: 600, borderRadius: 2, ...statusStyle(item.status) }} />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelectedTL(item)}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          borderColor: "#e7dcfa",
                          color: WARNA.ungu,
                          "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
                        }}
                      >
                        Lihat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
