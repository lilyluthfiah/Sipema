import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

/* ========================================
   DATA FITUR & HAK AKSES DEFAULT
   ======================================== */

const daftarFitur = [
  { id: 1, nama: "Buat dan kelola jadwal meeting", sekretaris: true, karyawan: false, ikon: <CalendarMonthIcon fontSize="small" /> },
  { id: 2, nama: "Kelola peserta meeting", sekretaris: true, karyawan: false, ikon: <PeopleIcon fontSize="small" /> },
  { id: 3, nama: "Kelola notulen meeting", sekretaris: true, karyawan: false, ikon: <DescriptionIcon fontSize="small" /> },
  { id: 4, nama: "Buat tindak lanjut dan tentukan PIC", sekretaris: true, karyawan: false, ikon: <AssignmentTurnedInIcon fontSize="small" /> },
  { id: 5, nama: "Kelola dokumentasi hasil meeting", sekretaris: true, karyawan: false, ikon: <FolderIcon fontSize="small" /> },
  { id: 6, nama: "Lihat jadwal dan detail meeting", sekretaris: true, karyawan: true, ikon: <VisibilityIcon fontSize="small" /> },
  { id: 7, nama: "Lihat notulen dan hasil meeting", sekretaris: true, karyawan: true, ikon: <ReceiptLongIcon fontSize="small" /> },
  { id: 8, nama: "Kelola tindak lanjut sebagai PIC", sekretaris: false, karyawan: true, ikon: <PersonIcon fontSize="small" /> },
];

/* ========================================
   HALAMAN HAK AKSES - 100% MUI
   ======================================== */

export default function HakAksesPage() {
  const [mounted, setMounted] = useState(false);
  const [akses, setAkses] = useState(() =>
    daftarFitur.map((fitur) => ({
      id: fitur.id,
      nama: fitur.nama,
      sekretaris: fitur.sekretaris,
      karyawan: fitur.karyawan,
      ikon: fitur.ikon,
    }))
  );
  const [aksesAwal, setAksesAwal] = useState(() =>
    daftarFitur.map((fitur) => ({
      id: fitur.id,
      nama: fitur.nama,
      sekretaris: fitur.sekretaris,
      karyawan: fitur.karyawan,
      ikon: fitur.ikon,
    }))
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const ubahAkses = (id, peran) => {
    setAkses((prev) =>
      prev.map((fitur) => (fitur.id === id ? { ...fitur, [peran]: !fitur[peran] } : fitur))
    );
  };

  const batalkan = () => {
    setAkses(aksesAwal.map((fitur) => ({ ...fitur })));
  };

  const simpan = () => {
    setAksesAwal(akses.map((fitur) => ({ ...fitur })));
  };

  const hitungSekretaris = akses.filter((f) => f.sekretaris).length;
  const hitungKaryawan = akses.filter((f) => f.karyawan).length;
  const total = akses.length;

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
        <Box
          sx={{
            mb: 3,
            ...(mounted ? animasiMasuk("0ms") : {}),
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap }}>
            Hak akses per peran
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
          }}
        >
          <TableContainer sx={{ maxWidth: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#f4f1fe",
                      borderBottom: `1px solid ${WARNA.unguGaris}`,
                      fontWeight: 700,
                      color: WARNA.teks,
                      fontSize: 13,
                    }}
                  >
                    Fitur
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#f4f1fe",
                      borderBottom: `1px solid ${WARNA.unguGaris}`,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: WARNA.teks }}>
                        <PersonIcon fontSize="small" />
                        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Sekretaris</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#f4f1fe",
                      borderBottom: `1px solid ${WARNA.unguGaris}`,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: WARNA.teks }}>
                        <PeopleIcon fontSize="small" />
                        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Karyawan</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {akses.map((fitur) => (
                  <TableRow key={fitur.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={{ color: WARNA.teks, fontSize: 13 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", color: WARNA.ungu }}>{fitur.ikon}</Box>
                        <Typography sx={{ fontSize: 13, color: WARNA.teks }}>{fitur.nama}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={fitur.sekretaris}
                        onChange={() => ubahAkses(fitur.id, "sekretaris")}
                        size="small"
                        sx={{
                          color: "#d8ccff",
                          "&.Mui-checked": {
                            color: "#6d28d9",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={fitur.karyawan}
                        onChange={() => ubahAkses(fitur.id, "karyawan")}
                        size="small"
                        sx={{
                          color: "#d8ccff",
                          "&.Mui-checked": {
                            color: "#6d28d9",
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 3, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={batalkan}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#e7dcfa",
                color: WARNA.ungu,
                "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
              }}
            >
              Batalkan
            </Button>
            <Button
              variant="contained"
              onClick={simpan}
              sx={{
                backgroundColor: "#6d28d9",
                "&:hover": { backgroundColor: "#5b21b6" },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
              }}
            >
              Simpan hak akses
            </Button>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
