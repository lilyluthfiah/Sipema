import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ambilJadwalMeetingKaryawan } from "../../data/karyawan";
import { detailMeetingKaryawanPath } from "../../router/rute";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

const OPSI_STATUS = ["Semua status", "Dijadwalkan", "Selesai"];

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

function BadgeStatus({ status }) {
  const selesai = status === "Selesai";
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: "12px",
        py: "4px",
        border: `1px solid ${selesai ? "#bbf7d0" : "#ddd3ff"}`,
        borderRadius: "20px",
        background: selesai ? "#ecfdf5" : "#ede9fe",
        color: selesai ? "#16a34a" : WARNA.ungu,
        fontSize: 11,
        fontWeight: 650,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </Box>
  );
}

export default function JadwalMeetingKaryawan() {
  const navigate = useNavigate();
  const { mounted = true, namaUser = "Budi Santoso" } = useOutletContext() || {};
  const [meetings] = useState(() => ambilJadwalMeetingKaryawan(namaUser));
  const [cari, setCari] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua status");

  const daftarTersaring = useMemo(() => {
    const query = cari.trim().toLowerCase();
    return meetings.filter((meeting) => {
      const cocokCari =
        !query ||
        meeting.judul.toLowerCase().includes(query) ||
        meeting.kode.toLowerCase().includes(query);
      const cocokStatus =
        statusFilter === "Semua status" || meeting.status === statusFilter;
      return cocokCari && cocokStatus;
    });
  }, [meetings, cari, statusFilter]);

  return (
    <>
      <Box
        component="header"
        sx={{
          mb: "24px",
          ...(mounted ? animasiMasuk("0ms") : {}),
        }}
      >
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
          Jadwal meeting
        </Typography>
        <Typography sx={{ mt: "8px", color: WARNA.teksRedup, fontSize: 13 }}>
          Jadwal meeting yang Anda ikuti.
        </Typography>
      </Box>

      <Box
        component="section"
        aria-label="Daftar jadwal meeting"
        sx={{
          minWidth: 0,
          p: { xs: "16px 12px", md: "16px" },
          border: `1px solid ${WARNA.garis}`,
          borderRadius: "3px",
          backgroundColor: "#fff",
          ...(mounted ? animasiMasuk("80ms") : {}),
        }}
      >
        <Box
          sx={{
            mb: "8px",
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
            placeholder="Cari judul atau kode meeting"
            aria-label="Cari judul atau kode meeting"
            size="small"
            sx={{
              width: { xs: "100%", sm: 280 },
              "& .MuiOutlinedInput-root": {
                height: 38,
                borderRadius: "3px",
                backgroundColor: "#fff",
              },
              "& .MuiOutlinedInput-input": { py: 1, fontSize: 12 },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ display: "flex", color: WARNA.teksRedup }}>
                      <IkonCari />
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter status"
            size="small"
            sx={{
              width: { xs: "100%", sm: 140 },
              "& .MuiOutlinedInput-root": {
                height: 38,
                borderRadius: "3px",
                backgroundColor: "#fff",
              },
              "& .MuiSelect-select": { py: 1, fontSize: 12 },
            }}
          >
            {OPSI_STATUS.map((status) => (
              <MenuItem key={status} value={status} sx={{ fontSize: 12 }}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table
            aria-label="Jadwal meeting karyawan"
            sx={{
              minWidth: 700,
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
                <TableCell>Meeting</TableCell>
                <TableCell>Waktu</TableCell>
                <TableCell>Lokasi</TableCell>
                <TableCell>Peserta</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {daftarTersaring.map((meeting) => (
                <TableRow key={meeting.id} hover>
                  <TableCell>
                    <Typography sx={{ color: WARNA.teks, fontSize: 11, fontWeight: 700 }}>
                      {meeting.judul}
                    </Typography>
                    <Typography sx={{ color: WARNA.teksRedup, fontSize: 10 }}>
                      {meeting.kode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: WARNA.teks, fontSize: 11 }}>
                      {meeting.tanggalLengkap}
                    </Typography>
                    <Typography sx={{ color: WARNA.teksRedup, fontSize: 10 }}>
                      {meeting.waktu}
                    </Typography>
                  </TableCell>
                  <TableCell>{meeting.lokasi}</TableCell>
                  <TableCell>{meeting.daftarPeserta.length}</TableCell>
                  <TableCell>
                    <BadgeStatus status={meeting.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(detailMeetingKaryawanPath(meeting.id))
                      }
                      sx={{
                        minWidth: 0,
                        px: "11px",
                        py: "5px",
                        borderColor: WARNA.garis,
                        borderRadius: "3px",
                        color: WARNA.teks,
                        fontSize: 10,
                        fontWeight: 650,
                        "&:hover": {
                          borderColor: WARNA.teksRedup,
                          backgroundColor: "#faf9fc",
                        },
                      }}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {daftarTersaring.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                      Tidak ada meeting yang cocok dengan pencarian atau filter.
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
