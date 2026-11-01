import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { ambilJadwalMeetingKaryawan } from "../../data/karyawan";
import { ruteKaryawan } from "../../router/rute";
import { WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

function Panel({ title, children }) {
  return (
    <Box
      component="section"
      sx={{
        minWidth: 0,
        p: { xs: "16px 12px", md: "20px" },
        border: `1px solid ${WARNA.garis}`,
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        component="h2"
        sx={{ m: 0, mb: 1.5, color: WARNA.teks, fontSize: 14, fontWeight: 700 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Info({ label, children }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={{ mb: 0.5, color: WARNA.teksRedup, fontSize: 11 }}>
        {label}
      </Typography>
      <Typography sx={{ color: WARNA.teks, fontSize: 12, fontWeight: 600 }}>
        {children || "Belum tersedia"}
      </Typography>
    </Box>
  );
}

function inisial(nama) {
  return nama
    .split(" ")
    .map((bagian) => bagian[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function DetailMeetingKaryawan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { namaUser = "Budi Santoso" } = useOutletContext() || {};
  const meeting = ambilJadwalMeetingKaryawan(namaUser).find(
    (item) => String(item.id) === String(id),
  );

  if (!meeting) {
    return (
      <Box
        sx={{
          minHeight: 300,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${WARNA.garis}`,
          borderRadius: "12px",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Typography component="h1" sx={{ color: WARNA.teksGelap, fontSize: 20, fontWeight: 700 }}>
          Meeting tidak ditemukan
        </Typography>
        <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 12 }}>
          Data meeting yang diminta tidak tersedia.
        </Typography>
        <Button
          onClick={() => navigate(ruteKaryawan.meeting)}
          sx={{ mt: 2, color: WARNA.ungu, fontSize: 12 }}
        >
          Kembali ke jadwal meeting
        </Button>
      </Box>
    );
  }

  const dokumentasi = Array.isArray(meeting.dokumentasi)
    ? meeting.dokumentasi
    : [];
  const tindakLanjut = Array.isArray(meeting.tindakLanjut)
    ? meeting.tindakLanjut
    : [];
  const agenda = Array.isArray(meeting.agenda) ? meeting.agenda : [];
  const peserta = Array.isArray(meeting.daftarPeserta)
    ? meeting.daftarPeserta
    : [];

  return (
    <>
      <Box sx={{ mb: 2, ...animasiMasuk("0ms") }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ruteKaryawan.meeting)}
          sx={{ mb: 1, px: 0, color: WARNA.teksRedup, fontSize: 12 }}
        >
          Kembali ke jadwal meeting
        </Button>
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
          {meeting.judul}
        </Typography>
        <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 12 }}>
          {meeting.kode} · {meeting.tanggalLengkap} · {meeting.lokasi}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" },
          alignItems: "start",
          gap: 2,
          ...(animasiMasuk("80ms")),
        }}
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          <Panel title="Informasi meeting">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, minmax(0, 1fr))" },
                gap: 2,
              }}
            >
              <Info label="Kode meeting">{meeting.kode}</Info>
              <Info label="Tanggal">{meeting.tanggalLengkap}</Info>
              <Info label="Waktu">{meeting.waktu}</Info>
              <Info label="Lokasi">{meeting.lokasi}</Info>
              <Info label="Jumlah peserta">{peserta.length} orang</Info>
              <Box>
                <Typography sx={{ mb: 0.5, color: WARNA.teksRedup, fontSize: 11 }}>
                  Status
                </Typography>
                <Chip
                  size="small"
                  label={meeting.status}
                  color={meeting.status === "Selesai" ? "success" : "primary"}
                  variant="outlined"
                />
              </Box>
            </Box>
          </Panel>

          <Panel title="Agenda">
            {agenda.length ? (
              <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                {agenda.map((item, index) => (
                  <Typography
                    component="li"
                    key={`${item}-${index}`}
                    sx={{ mb: 0.75, color: WARNA.teks, fontSize: 12, lineHeight: 1.6 }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                Agenda belum tersedia.
              </Typography>
            )}
          </Panel>

          <Panel title="Peserta">
            <Typography sx={{ mb: 1.25, color: WARNA.teksRedup, fontSize: 11 }}>
              {peserta.length} peserta meeting
            </Typography>
            {peserta.length ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                  gap: 1,
                }}
              >
                {peserta.map((nama) => (
                  <Box
                    key={nama}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      border: `1px solid ${WARNA.garis}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: WARNA.lavendel,
                        color: WARNA.ungu,
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {inisial(nama)}
                    </Avatar>
                    <Typography sx={{ color: WARNA.teks, fontSize: 11 }}>
                      {nama}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                Peserta belum tersedia.
              </Typography>
            )}
          </Panel>
        </Box>

        <Box sx={{ display: "grid", gap: 2 }}>
          <Panel title="Notulen / hasil meeting">
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Info label="Pembahasan">{meeting.notulen?.pembahasan}</Info>
              <Info label="Keputusan">{meeting.notulen?.keputusan}</Info>
            </Box>
          </Panel>

          <Panel title="Tindak lanjut">
            {tindakLanjut.length ? (
              <Box sx={{ display: "grid", gap: 1 }}>
                {tindakLanjut.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
                      alignItems: "center",
                      gap: 1.25,
                      p: 1.25,
                      border: `1px solid ${WARNA.garis}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Box>
                      <Typography sx={{ color: WARNA.teks, fontSize: 12, fontWeight: 600 }}>
                        {item.deskripsi}
                      </Typography>
                      <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 11 }}>
                        PIC: {item.pic} · Tenggat: {item.deadline}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={item.status}
                      color={item.status === "Selesai" ? "success" : "default"}
                      variant="outlined"
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                Belum ada tindak lanjut untuk meeting ini.
              </Typography>
            )}
          </Panel>

          <Panel title="Dokumentasi">
            {dokumentasi.length ? (
              <Box sx={{ display: "grid", gap: 0.75 }}>
                {dokumentasi.map((file) => (
                  <Box
                    key={file.id || file.nama}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1.25,
                      border: `1px solid ${WARNA.garis}`,
                      borderRadius: "8px",
                    }}
                  >
                    {file.nama.toLowerCase().endsWith(".pdf") ? (
                      <DescriptionIcon sx={{ color: WARNA.teksRedup, fontSize: 19 }} />
                    ) : (
                      <InsertDriveFileIcon sx={{ color: WARNA.teksRedup, fontSize: 19 }} />
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ color: WARNA.teks, fontSize: 11, overflowWrap: "anywhere" }}>
                        {file.nama}
                      </Typography>
                      <Typography sx={{ color: WARNA.teksRedup, fontSize: 10 }}>
                        {file.ukuran || "Ukuran tidak tersedia"}
                      </Typography>
                    </Box>
                    {file.dataUrl && (
                      <Button
                        component="a"
                        href={file.dataUrl}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ minWidth: 0, color: WARNA.ungu, fontSize: 10 }}
                      >
                        Lihat
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                Dokumentasi belum tersedia.
              </Typography>
            )}
          </Panel>
        </Box>
      </Box>
    </>
  );
}
