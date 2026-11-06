import { useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { ambilTindakLanjutKaryawan } from "../../data/karyawan";
import { detailTindakLanjutKaryawanPath } from "../../router/rute";
import { animasiMasuk } from "../../theme/animasi";
import { WARNA } from "../../theme/sipemaTheme";

const FILTER_STATUS = ["Semua", "Belum dimulai", "Proses", "Selesai"];

function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  const namaBulan = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${Number(hari)} ${namaBulan[Number(bulan) - 1] ?? bulan} ${tahun}`;
}

function gayaStatus(status) {
  if (status === "Selesai") {
    return { backgroundColor: "rgba(46, 125, 50, 0.1)", color: "#2e7d32", border: "1px solid rgba(46, 125, 50, 0.4)" };
  }
  if (status === "Proses") {
    return { backgroundColor: "rgba(255, 152, 0, 0.14)", color: "#ed6c02", border: "1px solid rgba(255, 152, 0, 0.5)" };
  }
  return { backgroundColor: "rgba(158, 158, 158, 0.16)", color: "#616161", border: "1px solid rgba(158, 158, 158, 0.55)" };
}

export default function TindakLanjutKaryawan() {
  const navigate = useNavigate();
  const { namaUser = "Budi Santoso", mounted = true } = useOutletContext() || {};
  const [daftar] = useState(() => ambilTindakLanjutKaryawan(namaUser));
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [cari, setCari] = useState("");
  const [meetingFilter, setMeetingFilter] = useState("Semua meeting");

  const daftarMeeting = useMemo(
    () => [...new Set(daftar.map((item) => item.meeting))],
    [daftar],
  );
  const daftarTersaring = useMemo(() => {
    const query = cari.trim().toLowerCase();
    return daftar.filter((item) => {
      const cocokCari =
        !query ||
        item.judul.toLowerCase().includes(query) ||
        item.kode.toLowerCase().includes(query) ||
        item.kodeMeeting.toLowerCase().includes(query);
      return (
        cocokCari &&
        (statusFilter === "Semua" || item.status === statusFilter) &&
        (meetingFilter === "Semua meeting" || item.meeting === meetingFilter)
      );
    });
  }, [daftar, cari, meetingFilter, statusFilter]);

  return (
    <>
      <Box component="header" sx={{ mb: 2.5, ...(mounted ? animasiMasuk("0ms") : {}) }}>
        <Typography
          component="h1"
          sx={{
            m: 0,
            color: WARNA.teksGelap,
            fontSize: { xs: 23, md: 28 },
            fontWeight: 800,
            letterSpacing: "-0.8px",
          }}
        >
          Tindak lanjut saya
        </Typography>
        <Typography sx={{ mt: 0.75, color: WARNA.teksRedup, fontSize: 13 }}>
          Tindak lanjut yang ditugaskan kepada Anda sebagai PIC.
        </Typography>
      </Box>

      <Box
        component="section"
        aria-label="Daftar tindak lanjut karyawan"
        sx={{
          minWidth: 0,
          p: { xs: "16px 12px", md: "18px 16px" },
          border: `1px solid ${WARNA.garis}`,
          borderRadius: "3px",
          backgroundColor: "#fff",
          ...(mounted ? animasiMasuk("80ms") : {}),
        }}
      >
        <Tabs
          value={statusFilter}
          onChange={(_, value) => setStatusFilter(value)}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="Filter status tindak lanjut"
          sx={{
            minHeight: 34,
            mb: 1.5,
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-root": {
              minHeight: 32,
              minWidth: 0,
              mr: 0.75,
              px: 1.5,
              py: 0.5,
              border: `1px solid ${WARNA.garis}`,
              borderRadius: "20px",
              color: WARNA.teksRedup,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "none",
            },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: WARNA.teksGelap,
              borderColor: WARNA.teksGelap,
              color: "#fff",
            },
          }}
        >
          {FILTER_STATUS.map((status) => {
            const jumlah =
              status === "Semua"
                ? daftar.length
                : daftar.filter((item) => item.status === status).length;
            return (
              <Tab key={status} value={status} label={`${status} ${jumlah}`} />
            );
          })}
        </Tabs>

        <Box
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <TextField
            value={cari}
            onChange={(event) => setCari(event.target.value)}
            placeholder="Cari tindak lanjut"
            aria-label="Cari tindak lanjut"
            size="small"
            sx={{
              width: { xs: "100%", sm: 280 },
              "& .MuiOutlinedInput-root": { height: 38, borderRadius: "3px", backgroundColor: "#fff" },
              "& .MuiOutlinedInput-input": { py: 1, fontSize: 12 },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: WARNA.teksRedup, fontSize: 17 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            value={meetingFilter}
            onChange={(event) => setMeetingFilter(event.target.value)}
            aria-label="Filter meeting"
            size="small"
            sx={{
              width: { xs: "100%", sm: 180 },
              "& .MuiOutlinedInput-root": { height: 38, borderRadius: "3px", backgroundColor: "#fff" },
              "& .MuiSelect-select": { py: 1, fontSize: 12 },
            }}
          >
            <MenuItem value="Semua meeting">Semua meeting</MenuItem>
            {daftarMeeting.map((meeting) => (
              <MenuItem key={meeting} value={meeting}>{meeting}</MenuItem>
            ))}
          </TextField>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table
            aria-label="Tabel tindak lanjut saya"
            sx={{
              minWidth: 720,
              "& thead th": {
                px: "12px",
                py: "10px",
                borderBottom: `1px solid ${WARNA.garis}`,
                color: WARNA.teksRedupLembut,
                fontSize: 10,
                fontWeight: 750,
                textAlign: "left",
                whiteSpace: "nowrap",
              },
              "& tbody td": {
                px: "12px",
                py: "10px",
                borderBottom: `1px solid ${WARNA.garisBaris}`,
                color: WARNA.teks,
                fontSize: 11,
              },
              "& tbody tr:last-child td": { borderBottom: "none" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Tindak lanjut</TableCell>
                <TableCell>PIC</TableCell>
                <TableCell>Tenggat</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {daftarTersaring.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Typography sx={{ color: WARNA.teks, fontSize: 11, fontWeight: 700 }}>
                      {item.judul}
                    </Typography>
                    <Typography sx={{ color: WARNA.teksRedup, fontSize: 10 }}>
                      {item.kode} · {item.kodeMeeting}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: "rgba(109, 40, 217, 0.14)",
                          color: WARNA.ungu,
                          fontSize: 9,
                          fontWeight: 700,
                        }}
                      >
                        {item.pic.split(" ").map((bagian) => bagian[0]).slice(0, 2).join("")}
                      </Avatar>
                      <Typography sx={{ color: WARNA.teks, fontSize: 11, whiteSpace: "nowrap" }}>
                        {item.pic}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>{formatTanggal(item.tenggat)}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{ height: 24, fontSize: 10, fontWeight: 600, borderRadius: 2, ...gayaStatus(item.status) }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => navigate(detailTindakLanjutKaryawanPath(item.id))}
                      sx={{
                        minWidth: 0,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "3px",
                        backgroundColor: WARNA.teksGelap,
                        color: "#fff",
                        fontSize: 10,
                        "&:hover": { backgroundColor: "#374151" },
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {daftarTersaring.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                      Tidak ada tindak lanjut yang cocok dengan pencarian atau filter.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
