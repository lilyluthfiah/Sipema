import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { ambilTindakLanjutSekretarisById } from "../../data/tindakLanjutSekretaris";
import {
  ruteSekretaris,
  ubahTindakLanjutSekretarisPath,
} from "../../router/rute";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";

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

function warnaStatus(status) {
  if (status === "Selesai") {
    return { backgroundColor: "#f0fdf4", color: "#15803d", borderColor: "#bbf7d0" };
  }
  if (status === "Proses") {
    return { backgroundColor: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" };
  }
  return { backgroundColor: "#fffbeb", color: "#b45309", borderColor: "#fde68a" };
}

function BarisDetail({ label, children }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: WARNA.teksRedupLembut, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600 }}>
        {children || "-"}
      </Typography>
    </Box>
  );
}

export default function DetailTindakLanjutSekretaris() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = ambilTindakLanjutSekretarisById(id);

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography component="h1" sx={{ fontSize: 20, fontWeight: 700 }}>
          Tindak lanjut tidak ditemukan
        </Typography>
        <Button onClick={() => navigate(ruteSekretaris.tindakLanjut)}>
          Kembali ke daftar tindak lanjut
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto", paddingBottom: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            onClick={() => navigate(ruteSekretaris.tindakLanjut)}
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none",
              color: "#4b5563",
              fontWeight: 600,
              fontSize: 14,
              padding: 0,
              "&:hover": { backgroundColor: "transparent", color: WARNA.ungu },
            }}
          >
            Kembali ke daftar tindak lanjut
          </Button>
          <Button
            onClick={() => navigate(ubahTindakLanjutSekretarisPath(data.id))}
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            sx={{
              backgroundColor: "#1f2937",
              color: "#ffffff",
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#374151" },
            }}
          >
            Ubah tindak lanjut
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap, mb: 0.5 }}>
            Detail tindak lanjut
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            {data.kode} · {data.meeting}
          </Typography>
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
          <Box sx={{ display: "grid", gap: 2.5 }}>
            <BarisDetail label="Tindak lanjut">{data.judul}</BarisDetail>
            <BarisDetail label="PIC">{data.pic}</BarisDetail>
            <BarisDetail label="Tenggat">{formatTanggal(data.tenggat)}</BarisDetail>
            <Box>
              <Typography sx={{ fontSize: 12, color: WARNA.teksRedupLembut, mb: 0.75 }}>
                Status
              </Typography>
              <Chip
                label={data.status}
                size="small"
                sx={{
                  ...warnaStatus(data.status),
                  border: "1px solid",
                  fontWeight: 600,
                  fontSize: 12,
                  borderRadius: "16px",
                  height: "26px",
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 12, color: WARNA.teksRedupLembut, mb: 0.75 }}>
                Keputusan dari notulen
              </Typography>
              {data.keputusan?.length ? (
                <Box component="ul" sx={{ m: 0, pl: 2.5, color: WARNA.teks }}>
                  {data.keputusan.map((keputusan) => (
                    <li key={keputusan}>
                      <Typography sx={{ fontSize: 13, lineHeight: 1.7 }}>
                        {keputusan}
                      </Typography>
                    </li>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ color: WARNA.teksRedup, fontSize: 13 }}>
                  Tidak ada keputusan yang dipilih.
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
