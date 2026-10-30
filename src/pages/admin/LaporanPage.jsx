import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SearchIcon from "@mui/icons-material/Search";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

const dataRekap = [
  {
    id: 1, kode: "M-001", nama: "Rapat Koordinasi Anggaran 2026",
    tanggal: "6 Okt 2026", peserta: 8, notulen: "Ada", tl: "6/8",
    status: "Selesai", waktu: "09.00 - 11.00",
    lokasi: "Ruang Meeting A", penyelenggara: "Divisi Keuangan",
    sekretaris: "Rina",
    agenda: [
      "Pembahasan anggaran tahunan",
      "Evaluasi penggunaan anggaran",
      "Perencanaan anggaran berikutnya"
    ],
    ringkasan: "Rapat membahas alokasi anggaran tahunan, evaluasi realisasi anggaran periode sebelumnya, serta perencanaan anggaran untuk tahun berikutnya. Seluruh divisi sepakat untuk merevisi usulan anggaran dengan batas waktu yang telah disepakati.",
    notulenFile: "Notulen_M001.pdf",
    notulenSize: "2.4 MB",
    rekapTl: [
      { tugas: "Buat laporan anggaran", pic: "Andi", target: "10 Okt 2026", status: "Selesai" },
      { tugas: "Evaluasi biaya", pic: "Sinta", target: "12 Okt 2026", status: "Proses" },
      { tugas: "Susun dokumen", pic: "Rina", target: "15 Okt 2026", status: "Selesai" },
    ]
  },
  {
    id: 2, kode: "M-002", nama: "Rapat Evaluasi Proyek",
    tanggal: "9 Okt 2026", peserta: 10, notulen: "Ada", tl: "4/6",
    status: "Selesai", waktu: "13.00 - 15.00",
    lokasi: "Ruang Meeting B",
    penyelenggara: "Divisi Teknologi Informasi",
    sekretaris: "Budi",
    agenda: [
      "Review capaian proyek",
      "Identifikasi kendala",
      "Rencana perbaikan"
    ],
    ringkasan: "Evaluasi capaian proyek Q3 menunjukkan beberapa kendala teknis yang perlu ditindaklanjuti. Tim sepakat menyusun rencana perbaikan dan pembagian tugas.",
    notulenFile: "Notulen_M002.pdf",
    notulenSize: "1.8 MB",
    rekapTl: [
      { tugas: "Perbaiki modul laporan", pic: "Agus", target: "12 Okt 2026", status: "Proses" },
      { tugas: "Update dokumentasi", pic: "Maya", target: "14 Okt 2026", status: "Belum dimulai" },
      { tugas: "Uji integrasi", pic: "Hendra", target: "16 Okt 2026", status: "Proses" },
    ]
  },
  {
    id: 3, kode: "M-003", nama: "Diskusi SOP Divisi IT",
    tanggal: "12 Okt 2026", peserta: 12, notulen: "Ada", tl: "8/8",
    status: "Selesai", waktu: "09.00 - 10.30",
    lokasi: "Aula Lantai 2", penyelenggara: "Divisi HRD",
    sekretaris: "Siti",
    agenda: [
      "Penyusunan SOP baru",
      "Pembahasan alur kerja",
      "Sosialisasi rencana"
    ],
    ringkasan: "Disepakati draf SOP Divisi IT yang akan direvisi berdasarkan masukan rapat dan disosialisasikan minggu berikutnya.",
    notulenFile: "Notulen_M003.pdf",
    notulenSize: "2.1 MB",
    rekapTl: [
      { tugas: "Finalisasi draft SOP", pic: "Hendra", target: "15 Okt 2026", status: "Selesai" },
      { tugas: "Review legal", pic: "Rina", target: "16 Okt 2026", status: "Selesai" },
      { tugas: "Sosialisasi SOP", pic: "Siti", target: "18 Okt 2026", status: "Selesai" },
    ]
  },
  {
    id: 4, kode: "M-004", nama: "Rapat Persiapan Presentasi",
    tanggal: "15 Okt 2026", peserta: 7, notulen: "Ada", tl: "3/5",
    status: "Selesai", waktu: "14.00 - 15.00",
    lokasi: "Ruang Meeting A", penyelenggara: "Direksi",
    sekretaris: "Dewi",
    agenda: [
      "Pembagian materi",
      "Latihan presentasi",
      "Persiapan teknis"
    ],
    ringkasan: "Pembagian materi presentasi telah disepakati. Tim akan melakukan gladi bersih sebelum presentasi ke Direksi.",
    notulenFile: "Notulen_M004.pdf",
    notulenSize: "1.6 MB",
    rekapTl: [
      { tugas: "Siapkan slide", pic: "Budi", target: "16 Okt 2026", status: "Selesai" },
      { tugas: "Siapkan data keuangan", pic: "Agus", target: "17 Okt 2026", status: "Proses" },
      { tugas: "Cek perangkat", pic: "Andi", target: "17 Okt 2026", status: "Belum dimulai" },
    ]
  },
  {
    id: 5, kode: "M-005", nama: "Rapat Pembahasan Vendor",
    tanggal: "18 Okt 2026", peserta: 9, notulen: "Ada", tl: "7/9",
    status: "Selesai", waktu: "10.00 - 12.00",
    lokasi: "Ruang Meeting B", penyelenggara: "Divisi Pengadaan",
    sekretaris: "Maya",
    agenda: [
      "Evaluasi penawaran vendor",
      "Negosiasi harga",
      "Rekomendasi vendor terpilih"
    ],
    ringkasan: "Setelah evaluasi, direkomendasikan vendor A untuk proyek pengadaan. Proses negosiasi akan dilanjutkan oleh tim pengadaan.",
    notulenFile: "Notulen_M005.pdf",
    notulenSize: "1.9 MB",
    rekapTl: [
      { tugas: "Negosiasi harga", pic: "Sinta", target: "19 Okt 2026", status: "Selesai" },
      { tugas: "Buat perbandingan vendor", pic: "Andi", target: "19 Okt 2026", status: "Selesai" },
      { tugas: "Ajukan rekomendasi", pic: "Maya", target: "20 Okt 2026", status: "Proses" },
    ]
  },
];

const barData = [
  { label: "Mei", value: 6 },
  { label: "Jun", value: 9 },
  { label: "Jul", value: 7 },
  { label: "Agu", value: 11 },
  { label: "Sep", value: 10 },
  { label: "Okt", value: 6 },
];

function DonutChart({ total, selesai, proses, belum }) {
  const size = 140;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const s1 = (selesai / total) * circumference;
  const s2 = (proses / total) * circumference;
  const s3 = (belum / total) * circumference;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
      <Box sx={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(158,158,158,0.18)" strokeWidth={strokeWidth} fill="none" />
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#2e7d32" strokeWidth={strokeWidth} fill="none" strokeDasharray={`${s1} ${circumference - s1}`} strokeDashoffset={0} />
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#ed6c02" strokeWidth={strokeWidth} fill="none" strokeDasharray={`${s2} ${circumference - s2}`} strokeDashoffset={-s1} />
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#9e9e9e" strokeWidth={strokeWidth} fill="none" strokeDasharray={`${s3} ${circumference - s3}`} strokeDashoffset={-(s1 + s2)} />
        </svg>
        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 700, fontSize: 22 }}>{total}</Typography>
          <Typography variant="body2" color="text.secondary">Total</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#2e7d32" }} />
          <Typography sx={{ fontSize: 13 }}>Selesai: {selesai} (52%)</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ed6c02" }} />
          <Typography sx={{ fontSize: 13 }}>Proses: {proses} (29%)</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#9e9e9e" }} />
          <Typography sx={{ fontSize: 13 }}>Belum dimulai: {belum} (19%)</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function statusTlDrawerStyle(status) {
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

export default function LaporanPage() {
  const [periode, setPeriode] = useState("Sep 2026");
  const [cari, setCari] = useState("");
  const [mounted, setMounted] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const maxBar = Math.max(...barData.map((b) => b.value));

  const handleLihatDetail = (row) => {
    setSelectedMeeting(row);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
        <Box sx={{ mb: 3, ...(mounted ? animasiMasuk("0ms") : {}) }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap }}>
                Laporan dan Rekapitulasi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Ringkasan kegiatan meeting dan tindak lanjut dalam periode yang dipilih.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  sx={{
                    height: 40,
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    fontSize: 13,
                    color: WARNA.teksGelap,
                    "& .MuiSelect-select": {
                      padding: "9px 36px 9px 14px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E5DDF4",
                      borderWidth: "1px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: WARNA.ungu,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: WARNA.ungu,
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-icon": {
                      color: "#777085",
                      right: 10,
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        mt: 0.5,
                        borderRadius: "8px",
                        border: "1px solid #E5DDF4",
                        boxShadow: "0 4px 12px rgba(30, 20, 50, 0.08)",
                        "& .MuiMenuItem-root": {
                          fontSize: 13,
                          minHeight: 38,
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#F3EDFF !important",
                          color: WARNA.ungu,
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="Sep 2026">Sep 2026</MenuItem>
                  <MenuItem value="Okt 2026">Okt 2026</MenuItem>
                  <MenuItem value="Agu 2026">Agu 2026</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* STATISTIK - UKURAN SEMUA KARTU SAMA */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2.5,
            mb: 3,
            maxWidth: 900,
          }}
        >
          {[
            { label: "Total", value: 51 },
            { label: "Selesai", value: 49 },
            { label: "Dijadwalkan", value: 2 },
            { label: "Belum Selesai", value: 0 },
          ].map((item) => (
            <Card
              key={item.label}
              elevation={0}
              sx={{
                width: "100%",
                height: 112,
                boxSizing: "border-box",
                borderRadius: "12px",
                border: `1px solid ${WARNA.garis}`,
                backgroundColor: "#ffffff",
                p: 2.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 0.75,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  color: WARNA.teks,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: WARNA.teksGelap,
                  lineHeight: 1.3,
                }}
              >
                {item.value}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* TABEL REKAPITULASI */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${WARNA.garis}`,
            backgroundColor: "#ffffff",
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, p: 3 }}>
            <Typography sx={{ fontWeight: 700, color: WARNA.teks }}>
              Rekapitulasi Meeting
            </Typography>

            <TextField
              size="small"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari nama meeting, tanggal..."
              sx={{
                width: "100%",
                maxWidth: 320,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
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

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Kode Meeting</TableCell>
                  <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Nama Meeting</TableCell>
                  <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Tanggal</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}`, width: 100 }}>Peserta</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}`, width: 100, pr: 3 }}>Notulen</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}`, width: 120 }}>Tindak Lanjut</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, backgroundColor: "#f7f5ff", borderBottom: `1px solid ${WARNA.garis}` }}>Aksi</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dataRekap.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ borderBottom: `1px solid ${WARNA.garis}` }}>{idx + 1}</TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${WARNA.garis}` }}>{row.kode}</TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${WARNA.garis}` }}>{row.nama}</TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${WARNA.garis}` }}>{row.tanggal}</TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${WARNA.garis}`, width: 100 }}>{row.peserta}</TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${WARNA.garis}`, width: 100, pr: 3 }}>
                      <Typography sx={{ fontSize: 13 }}>{row.notulen}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${WARNA.garis}`, width: 120 }}>
                      <Typography sx={{ fontSize: 13 }}>{row.tl}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${WARNA.garis}` }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleLihatDetail(row)}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontWeight: 600,
                          borderColor: "#e7dcfa",
                          color: WARNA.ungu,
                          px: 2,
                          "&:hover": {
                            backgroundColor: "#f1eaff",
                            borderColor: "#e7dcfa",
                          },
                        }}
                      >
                        Lihat detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, p: 2.5 }}>
            <Typography variant="body2" color="text.secondary">
              Menampilkan 1-5 dari 20 data
            </Typography>
            <Pagination count={4} shape="rounded" />
          </Box>
        </Card>

        {/* DETAIL MEETING */}
        <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
          <Box sx={{ width: { xs: "100vw", sm: 420 }, p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                    Detail Meeting
                  </Typography>
                  <Chip
                    label={selectedMeeting?.status || "Selesai"}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 2,
                      backgroundColor: "rgba(46, 125, 50, 0.1)",
                      color: "#2e7d32",
                      border: "1px solid rgba(46, 125, 50, 0.3)",
                    }}
                  />
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.25 }}>
                  {selectedMeeting?.nama}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Kode Meeting: {selectedMeeting?.kode} · {selectedMeeting?.tanggal}
                </Typography>
              </Box>

              <IconButton onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider />

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Informasi Meeting
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">Tanggal</Typography>
                  <Typography variant="body2">{selectedMeeting?.tanggal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">Waktu</Typography>
                  <Typography variant="body2">{selectedMeeting?.waktu}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">Lokasi</Typography>
                  <Typography variant="body2">{selectedMeeting?.lokasi}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">Penyelenggara</Typography>
                  <Typography variant="body2">{selectedMeeting?.penyelenggara}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">Sekretaris</Typography>
                  <Typography variant="body2">{selectedMeeting?.sekretaris}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">Peserta</Typography>
                  <Typography variant="body2">{selectedMeeting?.peserta} orang</Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Agenda Meeting
              </Typography>
              <Box component="ol" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 0.75 }}>
                {(selectedMeeting?.agenda || []).map((a, idx) => (
                  <Box component="li" key={idx} sx={{ fontSize: 14 }}>
                    {a}
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Ringkasan Hasil Meeting
              </Typography>
              <Typography sx={{ fontSize: 14, lineHeight: 1.8, color: WARNA.teks }}>
                {selectedMeeting?.ringkasan}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Dokumentasi / Notulen
              </Typography>

              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.75,
                  borderRadius: 2,
                  border: `1px solid ${WARNA.garis}`,
                  backgroundColor: "#f8f6fe",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <DescriptionIcon sx={{ color: WARNA.ungu }} />
                  <Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedMeeting?.notulenFile}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedMeeting?.notulenSize}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    borderColor: "#e7dcfa",
                    color: WARNA.ungu,
                  }}
                >
                  Unduh
                </Button>
              </Card>
            </Box>

            <Divider />

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Rekap Tindak Lanjut
              </Typography>

              <TableContainer sx={{ border: `1px solid ${WARNA.garis}`, borderRadius: 2, overflow: "hidden" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff" }}>Tugas</TableCell>
                      <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff" }}>PIC</TableCell>
                      <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff" }}>Target</TableCell>
                      <TableCell sx={{ fontWeight: 700, backgroundColor: "#f7f5ff" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(selectedMeeting?.rekapTl || []).map((tl, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{tl.tugas}</TableCell>
                        <TableCell>{tl.pic}</TableCell>
                        <TableCell>{tl.target}</TableCell>
                        <TableCell>
                          <Chip
                            label={tl.status}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 10,
                              fontWeight: 600,
                              borderRadius: 2,
                              ...statusTlDrawerStyle(tl.status),
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}