import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { ambilTindakLanjutSekretaris } from "../../data/tindakLanjutSekretaris";
import {
  detailTindakLanjutSekretarisPath,
  ruteSekretaris,
  ubahTindakLanjutSekretarisPath,
} from "../../router/rute";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";

const statusTersedia = ["Semua", "Belum dimulai", "Proses", "Selesai"];

function gayaStatus(status) {
  if (status === "Selesai") {
    return { backgroundColor: "#f0fdf4", color: "#15803d", borderColor: "#bbf7d0" };
  }
  if (status === "Proses") {
    return { backgroundColor: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" };
  }
  return { backgroundColor: "#fffbeb", color: "#b45309", borderColor: "#fde68a" };
}

function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  const namaBulan = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "Mei",
    "06": "Jun",
    "07": "Jul",
    "08": "Agu",
    "09": "Sep",
    "10": "Okt",
    "11": "Nov",
    "12": "Des",
  };
  return `${Number(hari)} ${namaBulan[bulan] ?? bulan} ${tahun}`;
}

export default function TindakLanjutSekretaris() {
  const navigate = useNavigate();
  const [daftar] = useState(() => ambilTindakLanjutSekretaris());
  const [cari, setCari] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterPic, setFilterPic] = useState("Semua PIC");
  const [filterMeeting, setFilterMeeting] = useState("Semua meeting");
  const daftarPIC = [...new Set(daftar.map((item) => item.pic))];
  const daftarMeeting = [...new Set(daftar.map((item) => item.meeting))];
  const daftarTersaring = useMemo(() => {
    const kataKunci = cari.trim().toLowerCase();
    return daftar.filter((item) => {
      const cocokStatus =
        filterStatus === "Semua" || item.status === filterStatus;
      const cocokPic = filterPic === "Semua PIC" || item.pic === filterPic;
      const cocokMeeting =
        filterMeeting === "Semua meeting" || item.meeting === filterMeeting;
      const cocokCari =
        !kataKunci ||
        item.judul.toLowerCase().includes(kataKunci) ||
        item.kode.toLowerCase().includes(kataKunci) ||
        item.meeting.toLowerCase().includes(kataKunci) ||
        item.pic.toLowerCase().includes(kataKunci);
      return cocokStatus && cocokPic && cocokMeeting && cocokCari;
    });
  }, [cari, daftar, filterMeeting, filterPic, filterStatus]);

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto", paddingBottom: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap, mb: 0.5 }}>
              Tindak lanjut
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Buat tindak lanjut dan tentukan PIC.
            </Typography>
          </Box>
          <Button
            onClick={() => navigate(ruteSekretaris.tindakLanjutBaru)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#1f2937",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#374151" },
            }}
          >
            Buat tindak lanjut
          </Button>
        </Box>

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            padding: 3,
            border: `1px solid ${WARNA.garis}`,
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
            {statusTersedia.map((status) => {
              const aktif = filterStatus === status;
              const jumlah =
                status === "Semua"
                  ? daftar.length
                  : daftar.filter((item) => item.status === status).length;
              return (
                <Button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    padding: "6px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    backgroundColor: aktif ? "#1f2937" : "#f3f4f6",
                    color: aktif ? "#ffffff" : "#4b5563",
                    "&:hover": { backgroundColor: aktif ? "#111827" : "#e5e7eb" },
                  }}
                >
                  {status} <Box component="span" sx={{ ml: 1, opacity: 0.8 }}>{jumlah}</Box>
                </Button>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <TextField
              placeholder="Cari tindak lanjut"
              size="small"
              value={cari}
              onChange={(event) => setCari(event.target.value)}
              sx={{ width: { xs: "100%", sm: "320px" }, backgroundColor: "#ffffff" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 },
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                width: { xs: "100%", sm: "auto" },
                flexWrap: "wrap",
              }}
            >
              <TextField
                select
                size="small"
                value={filterPic}
                onChange={(event) => setFilterPic(event.target.value)}
                sx={{ minWidth: { xs: "calc(50% - 6px)", sm: "140px" }, flex: { xs: 1, sm: "initial" } }}
                SelectProps={{ sx: { borderRadius: 2 } }}
              >
                <MenuItem value="Semua PIC">Semua PIC</MenuItem>
                {daftarPIC.map((pic) => (
                  <MenuItem key={pic} value={pic}>{pic}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                size="small"
                value={filterMeeting}
                onChange={(event) => setFilterMeeting(event.target.value)}
                sx={{ minWidth: { xs: "calc(50% - 6px)", sm: "150px" }, flex: { xs: 1, sm: "initial" } }}
                SelectProps={{ sx: { borderRadius: 2 } }}
              >
                <MenuItem value="Semua meeting">Semua meeting</MenuItem>
                {daftarMeeting.map((meeting) => (
                  <MenuItem key={meeting} value={meeting}>{meeting}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                  <TableCell sx={{ fontWeight: 700, color: "#6b7280", fontSize: 13 }}>
                    Tindak lanjut
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#6b7280", fontSize: 13 }}>PIC</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#6b7280", fontSize: 13 }}>
                    Tenggat
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#6b7280", fontSize: 13 }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#6b7280", fontSize: 13 }}>
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daftarTersaring.map((item) => (
                  <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "#fbfbfe" } }}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: WARNA.teksGelap, mb: 0.5 }}>
                        {item.judul}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                        {item.kode} · {item.meeting}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: 12,
                            backgroundColor: "#e5e7eb",
                            color: "#374151",
                            fontWeight: 600,
                          }}
                        >
                          {item.pic.split(" ").slice(0, 2).map((bagian) => bagian[0]).join("")}
                        </Avatar>
                        <Typography sx={{ fontSize: 13, color: WARNA.teksGelap, fontWeight: 500 }}>
                          {item.pic}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 13, color: "#4b5563" }}>
                      {formatTanggal(item.tenggat)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          ...gayaStatus(item.status),
                          border: "1px solid",
                          fontWeight: 600,
                          fontSize: 12,
                          borderRadius: "16px",
                          height: "26px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityOutlinedIcon />}
                          onClick={() =>
                            navigate(detailTindakLanjutSekretarisPath(item.id))
                          }
                          sx={{
                            borderColor: "#d1d5db",
                            color: "#374151",
                            textTransform: "none",
                            borderRadius: 1.5,
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "2px 12px",
                            "&:hover": { backgroundColor: "#f3f4f6", borderColor: "#9ca3af" },
                          }}
                        >
                          Lihat
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditOutlinedIcon />}
                          onClick={() =>
                            navigate(ubahTindakLanjutSekretarisPath(item.id))
                          }
                          sx={{
                            borderColor: "#d1d5db",
                            color: "#374151",
                            textTransform: "none",
                            borderRadius: 1.5,
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "2px 12px",
                            "&:hover": { backgroundColor: "#f3f4f6", borderColor: "#9ca3af" },
                          }}
                        >
                          Ubah
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {daftarTersaring.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: WARNA.teksRedup }}>
                      Tidak ada tindak lanjut yang cocok.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
