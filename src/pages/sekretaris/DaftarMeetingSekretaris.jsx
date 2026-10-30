import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate, useOutletContext } from "react-router-dom";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";
import {
  detailMeetingSekretarisPath,
  ruteSekretaris,
  ubahMeetingSekretarisPath,
} from "../../router/rute";
import {
  ambilMeetingSekretaris,
  hapusMeetingSekretaris,
} from "../../data/meetingSekretaris";

/* ========================================
   ICON (SVG inline, konsisten dengan SIPEMA)
   ======================================== */

function IkonCari() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IkonPanah({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke={WARNA.ungu}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IkonTambah() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IkonHapus() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IkonKalender() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

/* ========================================
   KONSTANTA & OPSI
   ======================================== */

const OPSI_STATUS = ["Semua status", "Dijadwalkan", "Selesai"];

/* ========================================
   STYLE OBJECTS (MUI sx tokens)
   ======================================== */

const gayaHeader = (mounted) => ({
  minHeight: "auto",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
  "& h1": {
    margin: 0,
    color: WARNA.teksGelap,
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.8px",
    lineHeight: 1.2,
  },
  "& p": {
    margin: "8px 0 0",
    color: WARNA.teksRedup,
    fontSize: 13,
    lineHeight: 1.6,
  },
  "@media (max-width:700px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "22px",
    "& h1": { fontSize: 23 },
  },
  ...(mounted ? animasiMasuk("0ms") : {}),
});

const gayaKartu = (mounted) => ({
  minWidth: 0,
  padding: "22px",
  border: `1px solid ${WARNA.garis}`,
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
  "@media (max-width:700px)": { padding: "16px 12px" },
  ...(mounted ? animasiMasuk("80ms") : {}),
});

const gayaTombolUtama = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
  padding: "10px 18px",
  minHeight: 0,
  border: 0,
  borderRadius: "9px",
  backgroundColor: WARNA.teksGelap,
  color: "#ffffff",
  fontSize: 12,
  fontWeight: 700,
  transition: "background-color 150ms ease, transform 150ms ease",
  "&:hover": {
    backgroundColor: "#150c24",
    transform: "translateY(-1px)",
  },
  "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
};

const gayaTombolBatal = {
  padding: "10px 16px",
  minHeight: 0,
  border: "1px solid #e7dcfa",
  borderRadius: "9px",
  backgroundColor: "#ffffff",
  color: WARNA.ungu,
  fontSize: 12,
  fontWeight: 600,
  "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
  "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
};

const gayaTombolBahaya = {
  padding: "10px 16px",
  minHeight: 0,
  border: 0,
  borderRadius: "9px",
  backgroundColor: WARNA.bahaya,
  color: "#ffffff",
  fontSize: 12,
  fontWeight: 700,
  "&:hover": { backgroundColor: "#a93a45" },
};

const gayaCari = {
  width: "100%",
  maxWidth: "280px",
  "& .MuiOutlinedInput-root": {
    height: 38,
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  },
  "& .MuiOutlinedInput-input": {
    padding: "8px 12px",
    fontSize: 12,
    color: WARNA.teks,
  },
  "& .MuiInputAdornment-root": {
    marginRight: "6px",
    color: WARNA.teksRedup,
  },
  "@media (max-width:700px)": { maxWidth: "none" },
};

const gayaFilter = {
  width: "fit-content",
  "& .MuiOutlinedInput-root": {
    height: 38,
    borderRadius: "8px",
    width: "fit-content",
    minWidth: 140,
    backgroundColor: "#ffffff",
  },
  "& .MuiSelect-select.MuiOutlinedInput-input": {
    padding: "8px 36px 8px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: WARNA.teks,
  },
  "& .MuiSelect-icon": { right: 10, color: WARNA.teksRedup },
};

const gayaBadgeTotal = {
  height: "auto",
  padding: "5px 10px",
  border: `1px solid ${WARNA.garis}`,
  borderRadius: "8px",
  backgroundColor: "#fbf9fe",
  color: WARNA.teksRedup,
  fontSize: 11,
  fontWeight: 600,
};

const gayaTombolAksi = {
  flexShrink: 0,
  padding: "6px 12px",
  minHeight: 0,
  border: "1px solid #e7dcfa",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: WARNA.ungu,
  fontSize: 11,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#f1eaff",
    borderColor: "#e7dcfa",
  },
  "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
};

const gayaTombolHapus = {
  flexShrink: 0,
  padding: "6px 12px",
  minHeight: 0,
  border: `1px solid ${WARNA.garisHalus}`,
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#746482",
  fontSize: 11,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: WARNA.bahayaSoft,
    borderColor: WARNA.bahayaGaris,
    color: WARNA.bahaya,
  },
  "&:focus-visible": { outline: "2px solid #c1444f", outlineOffset: 2 },
};

const gayaTabel = {
  width: "100%",
  minWidth: 680,
  borderCollapse: "collapse",
  "& thead th": {
    padding: "0 12px 12px",
    borderBottom: `1px solid ${WARNA.garis}`,
    color: WARNA.teksRedupLembut,
    fontSize: 10,
    fontWeight: 750,
    letterSpacing: "1.1px",
    textTransform: "uppercase",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  "& tbody td": {
    padding: "14px 12px",
    borderBottom: `1px solid ${WARNA.garisBaris}`,
    color: WARNA.teks,
    fontSize: 12,
  },
  "& tbody tr": {
    transition: "background-color 140ms ease",
  },
  "& tbody tr:hover": {
    backgroundColor: "#faf8fe",
  },
  "& tbody tr:last-child td": {
    borderBottom: "none",
  },
};

/* ========================================
   BADGE STATUS PILL
   ======================================== */

function BadgeStatus({ status }) {
  const isSelesai = status === "Selesai";

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: "14px",
        py: "4px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 650,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        background: isSelesai ? "#ecfdf5" : "#ede9fe",
        color: isSelesai ? "#16a34a" : WARNA.ungu,
        border: `1px solid ${isSelesai ? "#bbf7d0" : "#ddd3ff"}`,
      }}
    >
      {status}
    </Box>
  );
}

/* ========================================
   DIALOG KONFIRMASI HAPUS
   ======================================== */

function DialogHapusMeeting({ konfirmasiHapus, onBatal, onKonfirmasi }) {
  return (
    <Dialog
      open={Boolean(konfirmasiHapus)}
      onClose={onBatal}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 380,
            padding: "24px",
            border: `1px solid ${WARNA.garis}`,
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            boxShadow: "0 22px 60px rgba(30, 20, 48, 0.22)",
            textAlign: "center",
          },
        },
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          margin: "0 auto 14px",
          display: "grid",
          placeItems: "center",
          borderRadius: "14px",
          backgroundColor: WARNA.bahayaSoft,
          color: WARNA.bahaya,
        }}
      >
        <IkonHapus />
      </Box>
      <DialogTitle
        sx={{
          padding: 0,
          color: "#302040",
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        Hapus meeting?
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Typography
          component="p"
          sx={{
            margin: "10px 0 20px",
            color: WARNA.teksRedup,
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          Data meeting <strong>{konfirmasiHapus?.judul}</strong> (
          {konfirmasiHapus?.kode}) akan dihapus dari jadwal meeting.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 0, justifyContent: "center", gap: "10px" }}>
        <Button
          variant="outlined"
          disableElevation
          onClick={onBatal}
          sx={gayaTombolBatal}
        >
          Batal
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={onKonfirmasi}
          sx={gayaTombolBahaya}
        >
          Hapus meeting
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ========================================
   HALAMAN UTAMA: DAFTAR MEETING SEKRETARIS
   ======================================== */

export default function DaftarMeetingSekretaris() {
  const navigate = useNavigate();
  const outletCtx = useOutletContext();
  const mounted = outletCtx?.mounted ?? true;

  const [daftarMeeting, setDaftarMeeting] = useState(ambilMeetingSekretaris);
  const [cari, setCari] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua status");
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);
  const [notifikasi, setNotifikasi] = useState("");

  // Fungsionalitas Search & Filter
  const daftarTersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return daftarMeeting.filter((item) => {
      const cocokCari =
        !q ||
        item.judul.toLowerCase().includes(q) ||
        item.kode.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q);

      const cocokStatus =
        statusFilter === "Semua status" || item.status === statusFilter;

      return cocokCari && cocokStatus;
    });
  }, [daftarMeeting, cari, statusFilter]);

  const bukaTambah = () => {
    navigate(ruteSekretaris.meetingBaru);
  };

  const bukaUbah = (item) => {
    navigate(ubahMeetingSekretarisPath(item.id));
  };

  const handleKonfirmasiHapus = () => {
    if (!konfirmasiHapus) return;
    try {
      hapusMeetingSekretaris(konfirmasiHapus.id);
      setDaftarMeeting((prev) =>
        prev.filter((item) => item.id !== konfirmasiHapus.id)
      );
      setNotifikasi(`Meeting "${konfirmasiHapus.judul}" berhasil dihapus.`);
    } catch (error) {
      setNotifikasi(
        error instanceof Error
          ? `Meeting tidak dapat dihapus: ${error.message}`
          : "Meeting tidak dapat dihapus.",
      );
    }
    setKonfirmasiHapus(null);
  };

  // Tampilkan tabel utama
  return (
    <>
      {/* CONTENT HEADER */}
      <Box component="header" sx={gayaHeader(mounted)}>
        <Box sx={{ minWidth: 0 }}>
          <h1>Daftar meeting</h1>
          <p>Buat, ubah, dan hapus jadwal meeting.</p>
        </Box>
        <Button
          variant="contained"
          disableElevation
          startIcon={<IkonTambah />}
          onClick={bukaTambah}
          sx={gayaTombolUtama}
        >
          Buat meeting
        </Button>
      </Box>

      {/* KARTU DAFTAR & FILTER */}
      <Box component="section" sx={gayaKartu(mounted)}>
        {/* AREA FILTER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            mb: "20px",
          }}
        >
          {/* SEARCH INPUT */}
          <TextField
            size="small"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="cari meeting"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IkonCari />
                  </InputAdornment>
                ),
              },
              htmlInput: { "aria-label": "Cari meeting" },
            }}
            sx={gayaCari}
          />

          {/* FILTER STATUS & TOTAL */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              slotProps={{
                select: {
                  IconComponent: IkonPanah,
                  "aria-label": "Filter status meeting",
                },
              }}
              sx={gayaFilter}
            >
              {OPSI_STATUS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>

            <Chip
              label={`${daftarTersaring.length} meeting`}
              variant="outlined"
              sx={gayaBadgeTotal}
            />
          </Box>
        </Box>

        {/* TABEL ATAU EMPTY STATE */}
        {daftarTersaring.length === 0 ? (
          <Box
            sx={{
              padding: "48px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                marginBottom: "16px",
                display: "grid",
                placeItems: "center",
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${WARNA.unguLight}, ${WARNA.ungu})`,
                color: "#ffffff",
              }}
            >
              <IkonKalender />
            </Box>
            <Typography
              sx={{
                color: WARNA.teksGelap,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Meeting tidak ditemukan
            </Typography>
            <Typography
              sx={{
                maxWidth: 400,
                color: WARNA.teksRedup,
                fontSize: 12,
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              Tidak ada jadwal meeting yang cocok dengan kata kunci &ldquo;{cari}&rdquo;
              {statusFilter !== "Semua status" ? ` dan status "${statusFilter}"` : ""}.
            </Typography>
            {(cari || statusFilter !== "Semua status") && (
              <Button
                variant="outlined"
                disableElevation
                onClick={() => {
                  setCari("");
                  setStatusFilter("Semua status");
                }}
                sx={gayaTombolBatal}
              >
                Reset pencarian
              </Button>
            )}
          </Box>
        ) : (
          <TableContainer>
            <Table sx={gayaTabel} aria-label="Tabel daftar meeting sekretaris">
              <TableHead>
                <TableRow>
                  <TableCell>Meeting</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell>Lokasi</TableCell>
                  <TableCell>Peserta</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell sx={{ textAlign: "right" }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daftarTersaring.map((meeting) => (
                  <TableRow key={meeting.id}>
                    {/* KOLOM MEETING */}
                    <TableCell>
                      <Typography
                        component="div"
                        sx={{
                          color: WARNA.teks,
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1.4,
                        }}
                      >
                        {meeting.judul}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          color: WARNA.teksRedup,
                          fontSize: 11,
                          fontWeight: 500,
                          marginTop: "2px",
                        }}
                      >
                        {meeting.kode}
                      </Typography>
                    </TableCell>

                    {/* KOLOM WAKTU */}
                    <TableCell>
                      <Typography
                        component="div"
                        sx={{
                          color: WARNA.teks,
                          fontSize: 12,
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {meeting.tanggalLengkap}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          color: WARNA.teksRedup,
                          fontSize: 11,
                          marginTop: "2px",
                        }}
                      >
                        {meeting.waktu}
                      </Typography>
                    </TableCell>

                    {/* KOLOM LOKASI */}
                    <TableCell>
                      <Typography sx={{ fontSize: 12, color: WARNA.teks }}>
                        {meeting.lokasi}
                      </Typography>
                    </TableCell>

                    {/* KOLOM PESERTA */}
                    <TableCell>
                      <Typography sx={{ fontSize: 12, color: WARNA.teks }}>
                        {meeting.peserta}
                      </Typography>
                    </TableCell>

                    {/* KOLOM STATUS */}
                    <TableCell>
                      <BadgeStatus status={meeting.status} />
                    </TableCell>

                    {/* KOLOM AKSI */}
                    <TableCell sx={{ textAlign: "right" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: "6px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          disableElevation
                          onClick={() =>
                            navigate(detailMeetingSekretarisPath(meeting.id))
                          }
                          sx={gayaTombolAksi}
                        >
                          Detail
                        </Button>
                        <Button
                          variant="outlined"
                          disableElevation
                          onClick={() => bukaUbah(meeting)}
                          sx={gayaTombolAksi}
                        >
                          Ubah
                        </Button>
                        <Button
                          variant="outlined"
                          disableElevation
                          onClick={() => setKonfirmasiHapus(meeting)}
                          sx={gayaTombolHapus}
                        >
                          Hapus
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* DIALOG KONFIRMASI HAPUS */}
      <DialogHapusMeeting
        konfirmasiHapus={konfirmasiHapus}
        onBatal={() => setKonfirmasiHapus(null)}
        onKonfirmasi={handleKonfirmasiHapus}
      />

      {/* SNACKBAR NOTIFIKASI */}
      <Snackbar
        open={Boolean(notifikasi)}
        autoHideDuration={2600}
        onClose={() => setNotifikasi("")}
        message={
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", gap: "9px" }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                flexShrink: 0,
                borderRadius: "50%",
                backgroundColor: WARNA.ungu,
                boxShadow: "0 0 0 3px rgba(109, 40, 217, 0.12)",
              }}
            />
            {notifikasi}
          </Box>
        }
      />
    </>
  );
}
