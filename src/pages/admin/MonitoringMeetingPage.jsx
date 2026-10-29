import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArticleIcon from "@mui/icons-material/Article";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import ImageIcon from "@mui/icons-material/Image";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MenuItem from "@mui/material/MenuItem";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

/* ========================================
   DATA DUMMY MONITORING MEETING
   ======================================== */

const daftarMeeting = [
  { id: 1, judul: "Planning Sprint Oktober", kode: "M-015", tanggal: "12 Okt 2026", tanggalLengkap: "Senin, 12 Oktober 2026", jam: "09:00–10:30", jamLengkap: "09:00–10:30 WIB", lokasi: "Ruang Rapat B", peserta: 6, status: "Dijadwalkan", dibuatOleh: "Dewi Anggraini, Sekretaris", agenda: ["Pembahasan target sprint", "Alokasi tugas tim", "Evaluasi risiko proyek"] },
  { id: 2, judul: "Rapat Evaluasi Proyek Q3", kode: "M-014", kodeForm: "FR-02", tanggal: "8 Okt 2026", tanggalLengkap: "Rabu, 8 Oktober 2026", jam: "09:00–11:00", jamLengkap: "09:00–11:00 WIB", lokasi: "Ruang Rapat Utama", peserta: 8, status: "Dijadwalkan", dibuatOleh: "Dewi Anggraini, Sekretaris", agenda: ["Review capaian Q3", "Pembahasan kendala", "Rencana perbaikan"] },
  { id: 3, judul: "Koordinasi Anggaran 2027", kode: "M-013", kodeForm: "FR-04", tanggal: "6 Okt 2026", tanggalLengkap: "Selasa, 6 Oktober 2026", jam: "13:00–15:00", jamLengkap: "13:00–15:00 WIB", lokasi: "Ruang Rapat Utama", peserta: 7, status: "Selesai", dibuatOleh: "Dewi Anggraini, Sekretaris", agenda: ["Usulan anggaran divisi", "Review proyeksi biaya", "Pembagian prioritas anggaran"] },
  { id: 4, judul: "Review Sistem Absensi", kode: "M-012", kodeForm: "FR-03", tanggal: "28 Sep 2026", tanggalLengkap: "Minggu, 28 September 2026", jam: "10:00–12:00", jamLengkap: "10:00–12:00 WIB", lokasi: "Ruang Rapat B", peserta: 5, status: "Selesai", dibuatOleh: "Dewi Anggraini, Sekretaris", agenda: ["Evaluasi penggunaan sistem", "Perbaikan bug", "Usulan pengembangan"] },
  { id: 5, judul: "Sosialisasi SOP Baru", kode: "M-011", kodeForm: "FR-05", tanggal: "25 Sep 2026", tanggalLengkap: "Kamis, 25 September 2026", jam: "14:00–15:30", jamLengkap: "14:00–15:30 WIB", lokasi: "Aula Lantai 2", peserta: 12, status: "Selesai", dibuatOleh: "Dewi Anggraini, Sekretaris", agenda: ["Pengenalan SOP baru", "Tanya jawab", "Sosialisasi implementasi"] },
];

const opsiStatus = ["Semua status"];

const daftarPeserta = [
  { id: 1, nama: "Dewi Anggraini", divisi: "Sekretariat", inisial: "DA" },
  { id: 2, nama: "Budi Santoso", divisi: "Teknologi Informasi", inisial: "BS" },
  { id: 3, nama: "Agus Pratama", divisi: "Keuangan", inisial: "AP" },
  { id: 4, nama: "Maya Putri", divisi: "Keuangan", inisial: "MP" },
  { id: 5, nama: "Hendra Wijaya", divisi: "Operasional", inisial: "HW" },
  { id: 6, nama: "Siti Rahmawati", divisi: "HRD", inisial: "SR" },
  { id: 7, nama: "Rudi Hartono", divisi: "Direksi", inisial: "RH" },
];

const daftarNotulen = {
  pembahasan: [
    "Pembahasan alokasi anggaran untuk seluruh divisi berdasarkan usulan.",
    "Review proyeksi biaya operasional tahun 2027.",
    "Pembagian prioritas anggaran antara program wajib dan pengembangan.",
  ],
  keputusan: [
    "Disetujui alokasi anggaran awal untuk divisi prioritas.",
    "Keuangan wajib menyesuaikan rincian anggaran sesuai usulan revisi.",
    "Hasil final akan dibahas pada rapat lanjutan minggu berikutnya.",
  ],
  lampiran: { nama: "Usulan-Anggaran-v2.xlsx", ukuran: "214 KB" },
};

const daftarTindakLanjut = [
  { id: 1, judul: "Susun revisi anggaran divisi IT", kode: "TL-031", pic: "Budi Santoso", picInisial: "BS", tanggal: "14 Okt 2026", status: "Proses" },
  { id: 2, judul: "Kirim rekap vendor ke Keuangan", kode: "TL-030", pic: "Agus Pratama", picInisial: "AP", tanggal: "9 Okt 2026", status: "Belum dimulai" },
];

const daftarDokumentasi = [
  { id: 1, nama: "Foto-meeting-1.jpg", ukuran: "1.2 MB", icon: <InsertDriveFileIcon /> },
  { id: 2, nama: "Foto-meeting-2.jpg", ukuran: "980 KB", icon: <InsertDriveFileIcon /> },
  { id: 3, nama: "Daftar-hadir.pdf", ukuran: "320 KB", icon: <DescriptionIcon /> },
  { id: 4, nama: "Materi-paparan.pptx", ukuran: "4.6 MB", icon: <ArticleIcon /> },
];

/* ========================================
   HALAMAN MONITORING MEETING ADMIN - 100% MUI
   ======================================== */

function DetailMeetingView({ meeting, onKembali }) {
  const [activeTab, setActiveTab] = useState(0);

  const statusStyle = (status) => {
    if (status === "Selesai") {
      return {
        backgroundColor: "rgba(46, 125, 50, 0.08)",
        color: "#2e7d32",
        border: "1px solid rgba(46, 125, 50, 0.3)",
      };
    }
    return {
      backgroundColor: "rgba(109, 40, 217, 0.1)",
      color: WARNA.ungu,
      border: "1px solid rgba(109, 40, 217, 0.35)",
    };
  };

  const statusTlStyle = (status) => {
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
  };

  const avatarStyle = {
    width: 34,
    height: 34,
    bgcolor: "rgba(109, 40, 217, 0.14)",
    color: WARNA.ungu,
    fontSize: 11,
    fontWeight: 700,
  };

  const lavSoft = "#f8f6fe";

  return (
    <Box sx={{ ...animasiMasuk("0ms") }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: WARNA.teksGelap, lineHeight: 1.3, mb: 0.5 }}>
          {meeting.judul || "Planning Sprint Oktober"}
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
          border: `1px solid ${WARNA.garis}`,
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            px: { xs: 1.5, md: 2.5 },
            minHeight: 48,
            borderBottom: `1px solid ${WARNA.garis}`,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              color: WARNA.teksRedup,
              minHeight: 48,
              px: { xs: 1.5, md: 2 },
            },
            "& .Mui-selected": {
              color: WARNA.ungu,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: WARNA.ungu,
              height: 2,
            },
          }}
        >
          <Tab label="Info" />
          <Tab label="Peserta" />
          <Tab label="Notulen" />
          <Tab label="Tindak lanjut" />
          <Tab label="Dokumentasi" />
        </Tabs>

        {activeTab === 0 && (
          <Box sx={{ p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: lavSoft,
                p: { xs: 2, md: 2.5 },
              }}
            >
              <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.5, fontSize: 14 }}>Informasi Meeting</Typography>
              <Grid container spacing={{ xs: 2, md: 2.5 }}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: WARNA.teksRedupLembut }}>Tanggal</Typography>
                  <Typography sx={{ color: WARNA.teks, fontWeight: 600 }}>{meeting.tanggalLengkap || "Senin, 12 Oktober 2026"}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: WARNA.teksRedupLembut }}>Waktu</Typography>
                  <Typography sx={{ color: WARNA.teks, fontWeight: 600 }}>{meeting.jamLengkap || "09.00-10.30 WIB"}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: WARNA.teksRedupLembut }}>Lokasi</Typography>
                  <Typography sx={{ color: WARNA.teks, fontWeight: 600 }}>{meeting.lokasi || "Ruang Rapat B"}</Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5, color: WARNA.teksRedupLembut }}>Dibuat oleh</Typography>
                <Typography sx={{ color: WARNA.teks, fontWeight: 600 }}>{meeting.dibuatOleh || "Dewi Anggraini, Sekretaris"}</Typography>
              </Box>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: lavSoft,
                p: { xs: 2, md: 2.5 },
              }}
            >
              <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.5, fontSize: 14 }}>Agenda</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(meeting.agenda || ["Pembahasan target sprint", "Alokasi tugas tim", "Evaluasi risiko proyek"]).map((item, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: "rgba(109, 40, 217, 0.16)",
                        color: WARNA.ungu,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Typography sx={{ color: WARNA.teks, fontSize: 14, lineHeight: 1.8 }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.5, fontSize: 14 }}>Daftar Peserta</Typography>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                overflow: "hidden",
              }}
            >
              <TableContainer sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Nama</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Divisi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {daftarPeserta.map((peserta) => (
                      <TableRow key={peserta.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                            <Avatar sx={{ ...avatarStyle }}>{peserta.inisial}</Avatar>
                            <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600 }}>{peserta.nama}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                          <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{peserta.divisi}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: lavSoft,
                p: { xs: 2, md: 2.5 },
              }}
            >
              <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.25, fontSize: 14 }}>Pembahasan</Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 0.9 }}>
                {daftarNotulen.pembahasan.map((item, idx) => (
                  <Box component="li" key={idx} sx={{ color: WARNA.teks, fontSize: 14, lineHeight: 1.8 }}>{item}</Box>
                ))}
              </Box>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: lavSoft,
                p: { xs: 2, md: 2.5 },
              }}
            >
              <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.25, fontSize: 14 }}>Hasil dan Keputusan</Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 0.9 }}>
                {daftarNotulen.keputusan.map((item, idx) => (
                  <Box component="li" key={idx} sx={{ color: WARNA.teks, fontSize: 14, lineHeight: 1.8 }}>{item}</Box>
                ))}
              </Box>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: lavSoft,
                p: { xs: 2, md: 2.5 },
              }}
            >
              <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.25, fontSize: 14 }}>Lampiran File</Typography>
              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: { xs: 1.75, md: 2 },
                  borderRadius: 2,
                  border: `1px solid ${WARNA.garis}`,
                  backgroundColor: "#ffffff",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                  <InsertDriveFileIcon sx={{ color: WARNA.ungu, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{daftarNotulen.lampiran.nama}</Typography>
                    <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{daftarNotulen.lampiran.ukuran}</Typography>
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
          </Box>
        )}

        {activeTab === 3 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.5, fontSize: 14 }}>Daftar Tindak Lanjut</Typography>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2.5,
                border: `1px solid ${WARNA.garis}`,
                overflow: "hidden",
              }}
            >
              <TableContainer sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Tindak Lanjut</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>PIC</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Tanggal</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {daftarTindakLanjut.map((tl) => (
                      <TableRow key={tl.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                          <Box>
                            <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600 }}>{tl.judul}</Typography>
                            <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{tl.kode}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ ...avatarStyle }}>{tl.picInisial}</Avatar>
                            <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{tl.pic}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                          <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{tl.tanggal}</Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                          <Chip label={tl.status} size="small" sx={{ height: 26, fontSize: 11, fontWeight: 600, borderRadius: 2, ...statusTlStyle(tl.status) }} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        )}

        {activeTab === 4 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography sx={{ fontWeight: 700, color: WARNA.teks, mb: 1.5, fontSize: 14 }}>Daftar Dokumentasi</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {daftarDokumentasi.map((file) => {
                const getIcon = () => {
                  const n = file.nama.toLowerCase();
                  if (n.endsWith(".jpg") || n.endsWith(".jpeg") || n.endsWith(".png")) {
                    return <ImageIcon sx={{ color: WARNA.ungu }} />;
                  }
                  if (n.endsWith(".pdf")) {
                    return <PictureAsPdfIcon sx={{ color: "#d32f2f" }} />;
                  }
                  if (n.endsWith(".ppt") || n.endsWith(".pptx")) {
                    return <SlideshowIcon sx={{ color: "#ed6c02" }} />;
                  }
                  return <ArticleIcon sx={{ color: WARNA.ungu }} />;
                };
                return (
                  <Card
                    key={file.id}
                    elevation={0}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: { xs: 1.75, md: 2 },
                      borderRadius: 2,
                      border: `1px solid ${WARNA.garis}`,
                      backgroundColor: "#fbfaff",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{getIcon()}</Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.nama}</Typography>
                        <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{file.ukuran}</Typography>
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
                );
              })}
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default function MonitoringMeetingPage() {
  const [mounted, setMounted] = useState(true);
  const [cari, setCari] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua status");
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const daftarTersaring = useMemo(() => {
    const kunci = cari.trim().toLowerCase();
    return daftarMeeting.filter((item) => {
      const cocokCari = kunci === "" || item.judul.toLowerCase().includes(kunci) || item.kode.toLowerCase().includes(kunci);
      const cocokStatus = statusFilter === "Semua status" || item.status === statusFilter;
      return cocokCari && cocokStatus;
    });
  }, [cari, statusFilter]);

  const statusStyle = (status) => {
    if (status === "Selesai") {
      return {
        backgroundColor: "rgba(46, 125, 50, 0.08)",
        color: "#2e7d32",
        border: "1px solid rgba(46, 125, 50, 0.3)",
      };
    }
    return {
      backgroundColor: "rgba(109, 40, 217, 0.08)",
      color: WARNA.ungu,
      border: "1px solid rgba(109, 40, 217, 0.3)",
    };
  };

  if (selectedMeeting) {
    return (
      <ThemeProvider theme={sipemaTheme}>
        <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
          <DetailMeetingView meeting={selectedMeeting} onKembali={() => setSelectedMeeting(null)} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
        <Box sx={{ mb: 3, ...(mounted ? animasiMasuk("0ms") : {}) }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap }}>
            Monitoring meeting
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <TextField
              size="small"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari judul atau kode meeting"
              sx={{
                width: "100%",
                maxWidth: 340,
                "@media (max-width:700px)": { maxWidth: "100%" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
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
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Meeting</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Waktu</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Lokasi</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: WARNA.teks, fontSize: 13, py: 1.5, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}`, width: 110, minWidth: 110, textAlign: "center", pr: 4 }}>Peserta</TableCell>
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
                        <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{item.kode}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Box>
                        <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{item.tanggal}</Typography>
                        <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 12, mt: 0.25 }}>{item.jam}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>{item.lokasi}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}`, width: 110, minWidth: 110, textAlign: "center", pr: 4 }}>
                      <Typography sx={{ color: WARNA.teks, fontSize: 13, textAlign: "center" }}>{item.peserta}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          height: 26,
                          fontSize: 11,
                          fontWeight: 600,
                          borderRadius: 2,
                          ...statusStyle(item.status),
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1.25, borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelectedMeeting(item)}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          borderColor: "#e7dcfa",
                          color: WARNA.ungu,
                          "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
                        }}
                      >
                        Detail
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
