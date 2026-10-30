import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import {
  ambilTindakLanjutSekretarisById,
  simpanTindakLanjutSekretaris,
} from "../../data/tindakLanjutSekretaris";
import { ruteSekretaris } from "../../router/rute";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";

const daftarMeeting = [
  "M-013 Koordinasi Anggaran 2027",
  "M-012 Evaluasi Modul Absensi",
  "M-011 Persiapan SOP Cuti",
];

const daftarPIC = [
  "Budi Santoso, Teknologi Informasi",
  "Agus Pratama, Keuangan",
  "Siti Rahmawati, SDM",
];

const keputusanNotulen = [
  { name: "pilihan1", label: "Divisi IT menyusun ulang alokasi sisa anggaran 2026." },
  { name: "pilihan2", label: "Usulan anggaran 2027 diserahkan paling lambat 14 Oktober 2026." },
  { name: "pilihan3", label: "Rekap vendor dikirim ke Keuangan sebelum 9 Oktober 2026." },
];

export default function FormTindakLanjutSekretaris() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dataAwal = id ? ambilTindakLanjutSekretarisById(id) : null;
  const isEdit = Boolean(id);
  const [meeting, setMeeting] = useState(dataAwal?.meeting ?? daftarMeeting[0]);
  const [tindakLanjut, setTindakLanjut] = useState(
    dataAwal?.judul ?? "Susun revisi alokasi sisa anggaran 2026 divisi IT",
  );
  const [pic, setPic] = useState(dataAwal?.pic ?? daftarPIC[0]);
  const [tenggat, setTenggat] = useState(dataAwal?.tenggat ?? "2026-10-14");
  const [keputusan, setKeputusan] = useState(() => {
    const pilihanTersimpan = dataAwal?.keputusan ?? [];
    return {
      pilihan1: dataAwal
        ? pilihanTersimpan.includes(keputusanNotulen[0].label)
        : true,
      pilihan2: pilihanTersimpan.includes(keputusanNotulen[1].label),
      pilihan3: pilihanTersimpan.includes(keputusanNotulen[2].label),
    };
  });
  const [pesanError, setPesanError] = useState("");

  const kembaliKeDaftar = () => navigate(ruteSekretaris.tindakLanjut);

  const simpan = (event) => {
    event.preventDefault();
    try {
      simpanTindakLanjutSekretaris({
        meeting,
        judul: tindakLanjut.trim(),
        pic,
        tenggat,
        keputusan: keputusanNotulen
          .filter((item) => keputusan[item.name])
          .map((item) => item.label),
      }, id ?? null);
    } catch (error) {
      setPesanError(
        error instanceof Error
          ? `Tindak lanjut tidak dapat disimpan: ${error.message}`
          : "Tindak lanjut tidak dapat disimpan.",
      );
      return;
    }
    navigate(ruteSekretaris.tindakLanjut);
  };

  const handleCheckboxChange = (event) => {
    setKeputusan((current) => ({
      ...current,
      [event.target.name]: event.target.checked,
    }));
  };

  if (isEdit && !dataAwal) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography component="h1" sx={{ fontSize: 20, fontWeight: 700 }}>
          Tindak lanjut tidak ditemukan
        </Typography>
        <Button onClick={kembaliKeDaftar}>Kembali ke daftar tindak lanjut</Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto", paddingBottom: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            onClick={kembaliKeDaftar}
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
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: WARNA.teksGelap, mb: 0.5 }}>
            {isEdit ? "Ubah tindak lanjut" : "Form tindak lanjut"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Buat tindak lanjut dari hasil meeting dan tentukan PIC-nya.
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={simpan}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.4fr) minmax(280px, 1fr)" },
            gap: 1.5,
            alignItems: "start",
          }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              padding: 3,
              border: `1px solid ${WARNA.garis}`,
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: WARNA.teksGelap, mb: 1 }}>
                  Dari meeting
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={meeting}
                  onChange={(event) => setMeeting(event.target.value)}
                  SelectProps={{ sx: { borderRadius: 2, fontSize: 14 } }}
                >
                  {daftarMeeting.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: WARNA.teksGelap, mb: 1 }}>
                  Tindak lanjut
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  required
                  value={tindakLanjut}
                  onChange={(event) => setTindakLanjut(event.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: 14 } }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: WARNA.teksGelap, mb: 1 }}>
                    PIC
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={pic}
                    onChange={(event) => setPic(event.target.value)}
                    SelectProps={{ sx: { borderRadius: 2, fontSize: 14 } }}
                  >
                    {daftarPIC.map((item) => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                  <Typography sx={{ fontSize: 11, color: "#9ca3af", mt: 0.8 }}>
                    Penanggung jawab yang akan menjalankan dan memperbarui tindak lanjut ini.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: WARNA.teksGelap, mb: 1 }}>
                    Tenggat
                  </Typography>
                  <TextField
                    type="date"
                    fullWidth
                    size="small"
                    required
                    value={tenggat}
                    onChange={(event) => setTenggat(event.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: 14 } }}
                  />
                </Grid>
              </Grid>
            </Box>

            {pesanError && (
              <Typography role="alert" sx={{ mt: 2, color: WARNA.bahaya, fontSize: 12 }}>
                {pesanError}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
                mt: 4,
                pt: 2,
                borderTop: `1px solid ${WARNA.garis}`,
              }}
            >
              <Button type="button" onClick={kembaliKeDaftar} variant="outlined">
                Batal
              </Button>
              <Button type="submit" variant="contained">
                {isEdit ? "Simpan perubahan" : "Simpan tindak lanjut"}
              </Button>
            </Box>
          </Card>

          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              padding: 3,
              border: `1px solid ${WARNA.garis}`,
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
              height: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: WARNA.teksGelap, mb: 0.5 }}>
              Keputusan dari notulen
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 2 }}>
              Pilih keputusan yang ingin dijadikan tindak lanjut.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {keputusanNotulen.map((item) => {
                const dipilih = keputusan[item.name];
                return (
                  <Box
                    key={item.name}
                    sx={{
                      border: `1px solid ${dipilih ? "#1f2937" : "#e5e7eb"}`,
                      borderRadius: 2,
                      padding: 1.5,
                      backgroundColor: dipilih ? "#f9fafb" : "#ffffff",
                      transition: "all 0.2s",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={dipilih}
                          onChange={handleCheckboxChange}
                          name={item.name}
                          size="small"
                          sx={{ color: "#9ca3af", "&.Mui-checked": { color: "#1f2937" } }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: 13, color: WARNA.teksGelap, fontWeight: 500 }}>
                          {item.label}
                        </Typography>
                      }
                    />
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
