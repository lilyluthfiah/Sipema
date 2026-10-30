import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { WARNA } from "../../theme/sipemaTheme";
import {
  ambilMeetingSekretaris,
  formatTanggalMeeting,
  simpanMeetingSekretaris,
} from "../../data/meetingSekretaris";
import { ruteSekretaris } from "../../router/rute";

const DAFTAR_KARYAWAN = [
  "Budi Santoso",
  "Agus Pratama",
  "Siti Rahmawati",
  "Maya Putri",
  "Rudi Hartono",
  "Dewi Anggraini",
  "Hendra Wijaya",
  "Fajar Nugraha",
  "Nadia Permata",
  "Andi Saputra",
  "Rina Kusuma",
  "Tono Prasetyo",
];

function formKosong() {
  return {
    judul: "",
    tanggalISO: "",
    jamMulai: "",
    jamSelesai: "",
    lokasi: "",
    agenda: "",
    daftarPeserta: [],
    status: "Dijadwalkan",
  };
}

function formDariMeeting(meeting) {
  return {
    judul: meeting.judul,
    tanggalISO: meeting.tanggalISO,
    jamMulai: meeting.jamMulai,
    jamSelesai: meeting.jamSelesai,
    lokasi: meeting.lokasi,
    agenda: meeting.agenda.join("\n"),
    daftarPeserta: [...meeting.daftarPeserta],
    status: meeting.status,
  };
}

function inisial(nama) {
  return nama
    .split(" ")
    .map((bagian) => bagian[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Field({ label, htmlFor, children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography
        component="label"
        htmlFor={htmlFor}
        sx={{ color: WARNA.teksLabel, fontSize: 12, fontWeight: 700 }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function FormMeetingSekretarisView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = useMemo(
    () =>
      id
        ? ambilMeetingSekretaris().find(
            (item) => String(item.id) === String(id),
          )
        : null,
    [id],
  );
  const [form, setForm] = useState(() =>
    meeting ? formDariMeeting(meeting) : formKosong(),
  );
  const [pesertaDipilih, setPesertaDipilih] = useState("");
  const [pesanError, setPesanError] = useState("");
  const isEdit = Boolean(id);

  const ubahField = (field) => (event) => {
    setForm((sebelumnya) => ({ ...sebelumnya, [field]: event.target.value }));
    setPesanError("");
  };

  const tambahPeserta = () => {
    if (!pesertaDipilih || form.daftarPeserta.includes(pesertaDipilih)) return;
    setForm((sebelumnya) => ({
      ...sebelumnya,
      daftarPeserta: [...sebelumnya.daftarPeserta, pesertaDipilih],
    }));
    setPesertaDipilih("");
  };

  const hapusPeserta = (nama) => {
    setForm((sebelumnya) => ({
      ...sebelumnya,
      daftarPeserta: sebelumnya.daftarPeserta.filter(
        (peserta) => peserta !== nama,
      ),
    }));
  };

  const simpan = (event) => {
    event.preventDefault();
    if (
      !form.judul.trim() ||
      !form.tanggalISO ||
      !form.jamMulai ||
      !form.jamSelesai ||
      !form.lokasi.trim()
    ) {
      setPesanError("Lengkapi judul, tanggal, jam, dan lokasi meeting.");
      return;
    }

    const daftar = ambilMeetingSekretaris();
    const idMeeting =
      meeting?.id ??
      (daftar.length
        ? Math.max(...daftar.map((item) => Number(item.id))) + 1
        : 1);
    const kode =
      meeting?.kode ?? `M-${String(idMeeting + 10).padStart(3, "0")}`;
    const tanggalLengkap = formatTanggalMeeting(form.tanggalISO);
    const [tanggal, bulan] = tanggalLengkap.split(" ");

    try {
      simpanMeetingSekretaris({
        ...meeting,
        id: idMeeting,
        judul: form.judul.trim(),
        kode,
        tanggal,
        bulan,
        tanggalISO: form.tanggalISO,
        tanggalLengkap,
        jamMulai: form.jamMulai,
        jamSelesai: form.jamSelesai,
        waktu: `${form.jamMulai}–${form.jamSelesai}`,
        lokasi: form.lokasi.trim(),
        agenda: form.agenda
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        daftarPeserta: form.daftarPeserta,
        peserta: form.daftarPeserta.length,
        status: form.status,
      });
    } catch (error) {
      setPesanError(
        error instanceof Error
          ? `Meeting tidak dapat disimpan: ${error.message}`
          : "Meeting tidak dapat disimpan.",
      );
      return;
    }
    navigate(ruteSekretaris.meeting);
  };

  if (isEdit && !meeting) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography component="h1" sx={{ fontSize: 20, fontWeight: 700 }}>
          Meeting tidak ditemukan
        </Typography>
        <Button onClick={() => navigate(ruteSekretaris.meeting)}>
          Kembali ke daftar meeting
        </Button>
      </Box>
    );
  }

  const opsiPeserta = DAFTAR_KARYAWAN.filter(
    (nama) => !form.daftarPeserta.includes(nama),
  );

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(ruteSekretaris.meeting)}
        sx={{ mb: 1.5, px: 0, color: WARNA.teksRedup }}
      >
        Kembali ke daftar meeting
      </Button>
      <Box sx={{ mb: 2 }}>
        <Typography
          component="h1"
          sx={{ m: 0, color: WARNA.teksGelap, fontSize: 24, fontWeight: 800 }}
        >
          Form meeting
        </Typography>
        <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 12 }}>
          Buat meeting baru atau ubah meeting yang sudah ada, lalu atur
          pesertanya.
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={simpan}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.5fr) minmax(280px, 1fr)" },
          gap: 1.5,
          alignItems: "start",
        }}
      >
        <Card
          variant="outlined"
          sx={{ p: { xs: 2, md: 2.5 }, borderColor: WARNA.garis }}
        >
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <Field label="Judul meeting" htmlFor="meeting-title">
              <TextField
                id="meeting-title"
                size="small"
                value={form.judul}
                onChange={ubahField("judul")}
                placeholder="Rapat Evaluasi Proyek Q3"
                required
                fullWidth
              />
            </Field>
            <Field label="Tanggal" htmlFor="meeting-date">
              <TextField
                id="meeting-date"
                type="date"
                size="small"
                value={form.tanggalISO}
                onChange={ubahField("tanggalISO")}
                required
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Field>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 1.5,
              }}
            >
              <Field label="Jam mulai" htmlFor="meeting-start">
                <TextField
                  id="meeting-start"
                  type="time"
                  size="small"
                  value={form.jamMulai}
                  onChange={ubahField("jamMulai")}
                  required
                  fullWidth
                />
              </Field>
              <Field label="Jam selesai" htmlFor="meeting-end">
                <TextField
                  id="meeting-end"
                  type="time"
                  size="small"
                  value={form.jamSelesai}
                  onChange={ubahField("jamSelesai")}
                  required
                  fullWidth
                />
              </Field>
            </Box>
            <Field label="Lokasi" htmlFor="meeting-location">
              <TextField
                id="meeting-location"
                size="small"
                value={form.lokasi}
                onChange={ubahField("lokasi")}
                placeholder="Ruang Rapat Utama"
                required
                fullWidth
              />
            </Field>
            <Field label="Agenda" htmlFor="meeting-agenda">
              <TextField
                id="meeting-agenda"
                multiline
                minRows={3}
                size="small"
                value={form.agenda}
                onChange={ubahField("agenda")}
                placeholder={
                  "1. Capaian proyek kuartal ketiga\n2. Kendala dan kebutuhan sumber daya\n3. Rencana kuartal keempat"
                }
                fullWidth
              />
            </Field>
            {pesanError && (
              <Typography role="alert" sx={{ color: WARNA.bahaya, fontSize: 12 }}>
                {pesanError}
              </Typography>
            )}
            <Box
              sx={{
                pt: 1.5,
                borderTop: `1px solid ${WARNA.garis}`,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate(ruteSekretaris.meeting)}
              >
                Batal
              </Button>
              <Button type="submit" variant="contained">
                Simpan meeting
              </Button>
            </Box>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={{ p: { xs: 2, md: 2.5 }, borderColor: WARNA.garis }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              Peserta
            </Typography>
            <Typography sx={{ color: WARNA.teksRedup, fontSize: 11 }}>
              {form.daftarPeserta.length} orang
            </Typography>
          </Box>
          <Box>
            {form.daftarPeserta.map((nama) => (
              <Box
                key={nama}
                sx={{
                  py: 0.75,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderBottom: `1px solid ${WARNA.garis}`,
                }}
              >
                <Avatar
                  sx={{
                    width: 26,
                    height: 26,
                    bgcolor: WARNA.lavendel,
                    color: WARNA.teksRedup,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {inisial(nama)}
                </Avatar>
                <Typography sx={{ flex: 1, fontSize: 12 }}>{nama}</Typography>
                <Button
                  type="button"
                  size="small"
                  onClick={() => hapusPeserta(nama)}
                  aria-label={`Hapus ${nama}`}
                >
                  Hapus
                </Button>
              </Box>
            ))}
          </Box>
          <Typography sx={{ mt: 1.5, mb: 0.75, fontSize: 11, fontWeight: 700 }}>
            Tambah peserta
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 0.75,
            }}
          >
            <TextField
              select
              size="small"
              value={pesertaDipilih}
              onChange={(event) => setPesertaDipilih(event.target.value)}
              aria-label="Pilih karyawan"
              fullWidth
            >
              <MenuItem value="">Pilih karyawan</MenuItem>
              {opsiPeserta.map((nama) => (
                <MenuItem key={nama} value={nama}>
                  {nama}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="button"
              variant="outlined"
              disabled={!pesertaDipilih}
              onClick={tambahPeserta}
            >
              + Tambah
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default function FormMeetingSekretaris() {
  const { id } = useParams();
  return <FormMeetingSekretarisView key={id || "baru"} />;
}
