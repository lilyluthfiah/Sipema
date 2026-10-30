import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { WARNA } from "../../theme/sipemaTheme";
import {
  ambilMeetingSekretaris,
  hapusMeetingSekretaris,
  ukuranFile,
  simpanMeetingSekretaris,
} from "../../data/meetingSekretaris";
import { ruteSekretaris } from "../../router/rute";

const NAMA_TAB = ["Info", "Peserta", "Notulen", "Tindak lanjut", "Dokumentasi"];

function inisial(nama) {
  return nama
    .split(" ")
    .map((bagian) => bagian[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function DetailInfo({ label, children }) {
  return (
    <Box>
      <Typography sx={{ mb: 0.5, color: WARNA.teksRedup, fontSize: 11 }}>
        {label}
      </Typography>
      <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600 }}>
        {children || "—"}
      </Typography>
    </Box>
  );
}

function bacaFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Gagal membaca ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

function unduhFile(file) {
  const href = file.dataUrl
    ? file.dataUrl
    : URL.createObjectURL(
        new Blob([`Dokumentasi dummy: ${file.nama}`], { type: "text/plain" }),
      );
  const link = document.createElement("a");
  link.href = href;
  link.download = file.nama;
  document.body.append(link);
  link.click();
  link.remove();
  if (!file.dataUrl) URL.revokeObjectURL(href);
}

function DetailMeetingSekretarisView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputDokumentasi = useRef(null);
  const [meeting, setMeeting] = useState(() =>
    ambilMeetingSekretaris().find((item) => String(item.id) === String(id)),
  );
  const [tabAktif, setTabAktif] = useState(0);
  const [pembahasan, setPembahasan] = useState(
    () => meeting?.notulen?.pembahasan || "",
  );
  const [keputusan, setKeputusan] = useState(
    () => meeting?.notulen?.keputusan || "",
  );
  const [dialogHapus, setDialogHapus] = useState(false);
  const [pesan, setPesan] = useState("");

  const simpanPerubahan = (perubahan) => {
    try {
      const tersimpan = simpanMeetingSekretaris({ ...meeting, ...perubahan });
      setMeeting(tersimpan);
      return true;
    } catch (error) {
      setPesan(
        error instanceof Error
          ? `Perubahan tidak dapat disimpan: ${error.message}`
          : "Perubahan tidak dapat disimpan.",
      );
      return false;
    }
  };

  const simpanNotulen = () => {
    if (
      simpanPerubahan({
        notulen: { pembahasan, keputusan },
      })
    ) {
      setPesan("Notulen berhasil disimpan.");
    }
  };

  const unggahDokumentasi = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length || !meeting) return;

    try {
      const dokumentasiBaru = await Promise.all(
        files.map(async (file, index) => ({
          id: `${Date.now()}-${index}`,
          nama: file.name,
          ukuran: ukuranFile(file.size),
          dataUrl: await bacaFile(file),
        })),
      );
      if (
        simpanPerubahan({
          dokumentasi: [...meeting.dokumentasi, ...dokumentasiBaru],
        })
      ) {
        setPesan("Dokumentasi berhasil ditambahkan.");
      }
    } catch (error) {
      setPesan(
        error instanceof Error
          ? `Dokumentasi gagal diunggah: ${error.message}`
          : "Dokumentasi gagal diunggah.",
      );
    }
  };

  const hapusDokumentasi = (fileId) => {
    simpanPerubahan({
      dokumentasi: meeting.dokumentasi.filter((file) => file.id !== fileId),
    });
  };

  const konfirmasiHapusMeeting = () => {
    try {
      hapusMeetingSekretaris(meeting.id);
      navigate(ruteSekretaris.meeting);
    } catch (error) {
      setPesan(
        error instanceof Error
          ? `Meeting tidak dapat dihapus: ${error.message}`
          : "Meeting tidak dapat dihapus.",
      );
      setDialogHapus(false);
    }
  };

  if (!meeting) {
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

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(ruteSekretaris.meeting)}
        sx={{ mb: 1.5, px: 0, color: WARNA.teksRedup }}
      >
        Kembali ke daftar meeting
      </Button>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{ m: 0, color: WARNA.teksGelap, fontSize: 23, fontWeight: 800 }}
          >
            {meeting.judul}
          </Typography>
          <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 12 }}>
            {meeting.kode} · {meeting.tanggalLengkap} · {meeting.lokasi}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() =>
              navigate(`${ruteSekretaris.meeting}/${meeting.id}/ubah`)
            }
          >
            Ubah meeting
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setDialogHapus(true)}
          >
            Hapus meeting
          </Button>
        </Box>
      </Box>

      <Card
        variant="outlined"
        sx={{ borderColor: WARNA.garis, overflow: "hidden" }}
      >
        <Tabs
          value={tabAktif}
          onChange={(_, value) => setTabAktif(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Tab detail meeting"
          sx={{
            px: { xs: 1, md: 1.5 },
            borderBottom: `1px solid ${WARNA.garis}`,
            "& .MuiTab-root": {
              minHeight: 48,
              px: { xs: 1.5, md: 2 },
              textTransform: "none",
              color: WARNA.teksRedup,
              fontSize: 12,
              fontWeight: 600,
            },
            "& .Mui-selected": { color: WARNA.teksGelap },
            "& .MuiTabs-indicator": { height: 2, backgroundColor: WARNA.teksGelap },
          }}
        >
          {NAMA_TAB.map((nama, index) => (
            <Tab
              key={nama}
              label={nama}
              id={`meeting-tab-${index}`}
              aria-controls={`meeting-tabpanel-${index}`}
            />
          ))}
        </Tabs>

        <Box
          role="tabpanel"
          id={`meeting-tabpanel-${tabAktif}`}
          aria-labelledby={`meeting-tab-${tabAktif}`}
          sx={{ p: { xs: 2, md: 2.5 } }}
        >
          {tabAktif === 0 && (
            <Box sx={{ display: "grid", gap: 2 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                <DetailInfo label="Judul meeting">{meeting.judul}</DetailInfo>
                <DetailInfo label="Kode meeting">{meeting.kode}</DetailInfo>
                <DetailInfo label="Tanggal">{meeting.tanggalLengkap}</DetailInfo>
                <DetailInfo label="Jam mulai">{meeting.jamMulai}</DetailInfo>
                <DetailInfo label="Jam selesai">{meeting.jamSelesai}</DetailInfo>
                <DetailInfo label="Lokasi">{meeting.lokasi}</DetailInfo>
                <DetailInfo label="Status meeting">
                  <Chip
                    size="small"
                    label={meeting.status}
                    color={meeting.status === "Selesai" ? "success" : "primary"}
                    variant="outlined"
                  />
                </DetailInfo>
              </Box>
              <Box>
                <Typography
                  sx={{ mb: 1, color: WARNA.teksRedup, fontSize: 11 }}
                >
                  Agenda
                </Typography>
                <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                  {meeting.agenda.map((item, index) => (
                    <Typography
                      component="li"
                      key={`${item}-${index}`}
                      sx={{ mb: 0.5, color: WARNA.teks, fontSize: 13 }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {tabAktif === 1 && (
            <Box>
              <Typography sx={{ mb: 1.5, fontSize: 14, fontWeight: 700 }}>
                Peserta ({meeting.daftarPeserta.length})
              </Typography>
              <Box sx={{ display: "grid", gap: 1 }}>
                {meeting.daftarPeserta.map((nama) => (
                  <Box
                    key={nama}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      p: 1.25,
                      border: `1px solid ${WARNA.garis}`,
                      borderRadius: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: WARNA.lavendel,
                        color: WARNA.ungu,
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {inisial(nama)}
                    </Avatar>
                    <Typography sx={{ color: WARNA.teks, fontSize: 13 }}>
                      {nama}
                    </Typography>
                  </Box>
                ))}
                {!meeting.daftarPeserta.length && (
                  <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                    Belum ada peserta meeting.
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {tabAktif === 2 && (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <TextField
                label="Pembahasan"
                multiline
                minRows={4}
                value={pembahasan}
                onChange={(event) => setPembahasan(event.target.value)}
                placeholder="Catat hasil pembahasan meeting..."
                fullWidth
              />
              <TextField
                label="Keputusan"
                multiline
                minRows={4}
                value={keputusan}
                onChange={(event) => setKeputusan(event.target.value)}
                placeholder="Catat keputusan yang dihasilkan..."
                fullWidth
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={simpanNotulen}>
                  Simpan notulen
                </Button>
              </Box>
            </Box>
          )}

          {tabAktif === 3 && (
            <Box sx={{ display: "grid", gap: 1 }}>
              {meeting.tindakLanjut.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "minmax(0, 2fr) minmax(130px, 1fr) minmax(120px, 1fr) auto",
                    },
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    border: `1px solid ${WARNA.garis}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                    {item.deskripsi}
                  </Typography>
                  <DetailInfo label="PIC">{item.pic}</DetailInfo>
                  <DetailInfo label="Deadline">{item.deadline}</DetailInfo>
                  <Chip
                    size="small"
                    label={item.status}
                    color={item.status === "Selesai" ? "success" : "default"}
                    variant="outlined"
                  />
                </Box>
              ))}
              {!meeting.tindakLanjut.length && (
                <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                  Belum ada tindak lanjut untuk meeting ini.
                </Typography>
              )}
            </Box>
          )}

          {tabAktif === 4 && (
            <Box>
              <Box sx={{ display: "grid", gap: 0.75 }}>
                {meeting.dokumentasi.map((file) => (
                  <Box
                    key={file.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1.25,
                      border: `1px solid ${WARNA.garis}`,
                      borderRadius: 1,
                    }}
                  >
                    {file.nama.toLowerCase().endsWith(".pdf") ? (
                      <DescriptionIcon
                        sx={{ color: WARNA.teksRedup, fontSize: 19 }}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{ color: WARNA.teksRedup, fontSize: 19 }}
                      />
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {file.nama}
                      </Typography>
                      <Typography sx={{ color: WARNA.teksRedup, fontSize: 10 }}>
                        {file.ukuran}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => unduhFile(file)}
                    >
                      Unduh
                    </Button>
                    <Button
                      size="small"
                      onClick={() => hapusDokumentasi(file.id)}
                    >
                      Hapus
                    </Button>
                  </Box>
                ))}
                {!meeting.dokumentasi.length && (
                  <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                    Belum ada dokumentasi meeting.
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  mt: 1.5,
                  pt: 1.5,
                  borderTop: `1px solid ${WARNA.garis}`,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <input
                  ref={inputDokumentasi}
                  type="file"
                  multiple
                  hidden
                  onChange={unggahDokumentasi}
                  aria-label="Pilih dokumentasi meeting"
                />
                <Button
                  variant="contained"
                  startIcon={<InsertDriveFileIcon />}
                  onClick={() => inputDokumentasi.current?.click()}
                >
                  Tambah dokumentasi
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Card>

      <Dialog
        open={dialogHapus}
        onClose={() => setDialogHapus(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Hapus meeting?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: WARNA.teksRedup, fontSize: 13 }}>
            Meeting &quot;{meeting.judul}&quot; akan dihapus.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogHapus(false)}>Batal</Button>
          <Button color="error" onClick={konfirmasiHapusMeeting}>
            Hapus meeting
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(pesan)}
        autoHideDuration={3500}
        message={pesan}
        onClose={() => setPesan("")}
      />
    </Box>
  );
}

export default function DetailMeetingSekretaris() {
  const { id } = useParams();
  return <DetailMeetingSekretarisView key={id} />;
}
