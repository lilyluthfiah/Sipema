import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
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

const NAMA_TAB = ["Info", "Peserta", "Notulen", "Tindak lanjut", "Dokumentasi"];

function inisial(nama) {
  return nama
    .split(" ")
    .map((bagian) => bagian[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function daftarLampiran(...sumber) {
  const berkas = sumber.flatMap((item) =>
    Array.isArray(item) ? item : item ? [item] : [],
  );
  const dilihat = new Set();

  return berkas
    .filter((file) => file && (typeof file === "object" || typeof file === "string"))
    .map((file, index) => {
      const data = typeof file === "string" ? { nama: file } : file;
      const ukuran = data.ukuran ?? data.sizeLabel ?? data.size ?? "";
      return {
        id: data.id ?? `${data.nama ?? data.name ?? "lampiran"}-${index}`,
        nama: data.nama ?? data.name ?? data.fileName ?? "Lampiran",
        ukuran: typeof ukuran === "number" ? `${ukuran} byte` : ukuran,
        href: data.dataUrl ?? data.url ?? data.href ?? "",
      };
    })
    .filter((file) => {
      if (dilihat.has(file.nama)) return false;
      dilihat.add(file.nama);
      return true;
    });
}

function BarisLampiran({ file, mode = "lihat" }) {
  return (
    <Box
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
      {mode === "unduh" ? (
        <Button
          component="a"
          href={file.href || undefined}
          download={file.nama}
          disabled={!file.href}
          startIcon={<DownloadIcon />}
          title={file.href ? `Unduh ${file.nama}` : "File asli belum tersedia"}
          sx={{
            minWidth: 0,
            flexShrink: 0,
            color: WARNA.ungu,
            fontSize: 10,
            "&.Mui-disabled": { color: WARNA.teksAbu },
          }}
        >
          Unduh
        </Button>
      ) : file.href ? (
        <Button
          component="a"
          href={file.href}
          target="_blank"
          rel="noreferrer"
          sx={{ minWidth: 0, flexShrink: 0, color: WARNA.ungu, fontSize: 10 }}
        >
          Lihat
        </Button>
      ) : null}
    </Box>
  );
}

export default function DetailMeetingKaryawan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { namaUser = "Budi Santoso" } = useOutletContext() || {};
  const [tabAktif, setTabAktif] = useState(2);
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
  const pembahasan = String(meeting.notulen?.pembahasan || "").trim();
  const keputusan = String(meeting.notulen?.keputusan || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const lampiranNotulen = daftarLampiran(
    meeting.notulen?.lampiran,
    meeting.notulen?.lampiranNotulen,
    meeting.notulen?.file,
    meeting.lampiranNotulen,
    meeting.notulenFile
      ? {
          nama: meeting.notulenFile,
          ukuran: meeting.notulenSize,
          dataUrl: meeting.notulenDataUrl,
          url: meeting.notulenUrl,
        }
      : null,
  );

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

      <Card
        variant="outlined"
        sx={{
          borderColor: WARNA.garis,
          borderRadius: "3px",
          overflow: "hidden",
          ...animasiMasuk("80ms"),
        }}
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
                {[
                  ["Judul meeting", meeting.judul],
                  ["Kode meeting", meeting.kode],
                  ["Tanggal", meeting.tanggalLengkap],
                  ["Jam", meeting.waktu],
                  ["Lokasi", meeting.lokasi],
                  ["Jumlah peserta", `${peserta.length} orang`],
                ].map(([label, value]) => (
                  <Box key={label}>
                    <Typography sx={{ mb: 0.5, color: WARNA.teksRedup, fontSize: 11 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ color: WARNA.teks, fontSize: 13, fontWeight: 600 }}>
                      {value || "—"}
                    </Typography>
                  </Box>
                ))}
                <Box>
                  <Typography sx={{ mb: 0.5, color: WARNA.teksRedup, fontSize: 11 }}>
                    Status meeting
                  </Typography>
                  <Chip
                    size="small"
                    label={meeting.status}
                    color={meeting.status === "Selesai" ? "success" : "primary"}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ mb: 1, color: WARNA.teksRedup, fontSize: 11 }}>
                  Agenda
                </Typography>
                {agenda.length ? (
                  <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                    {agenda.map((item, index) => (
                      <Typography
                        component="li"
                        key={`${item}-${index}`}
                        sx={{ mb: 0.5, color: WARNA.teks, fontSize: 13 }}
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
              </Box>
            </Box>
          )}

          {tabAktif === 1 && (
            <Box>
              <Typography sx={{ mb: 1.5, fontSize: 14, fontWeight: 700 }}>
                Peserta ({peserta.length})
              </Typography>
              <Box sx={{ display: "grid", gap: 1 }}>
                {peserta.map((nama) => (
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
                {!peserta.length && (
                  <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                    Belum ada peserta meeting.
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {tabAktif === 2 && (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Box>
                <Typography sx={{ mb: 1, fontSize: 12, fontWeight: 700 }}>
                  Pembahasan
                </Typography>
                {pembahasan ? (
                  <Typography sx={{ color: WARNA.teks, fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                    {pembahasan}
                  </Typography>
                ) : (
                  <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                    Pembahasan belum tersedia.
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography sx={{ mb: 1, fontSize: 12, fontWeight: 700 }}>
                  Hasil dan keputusan
                </Typography>
                {keputusan.length ? (
                  <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                    {keputusan.map((item, index) => (
                      <Typography
                        component="li"
                        key={`${item}-${index}`}
                        sx={{ mb: 0.5, color: WARNA.teks, fontSize: 12, lineHeight: 1.7 }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                    Keputusan belum tersedia.
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography sx={{ mb: 1, fontSize: 12, fontWeight: 700 }}>
                  Lampiran
                </Typography>
                {lampiranNotulen.length ? (
                  <Box sx={{ display: "grid", gap: 0.75 }}>
                    {lampiranNotulen.map((file) => (
                      <BarisLampiran key={file.id} file={file} />
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                    Lampiran notulen belum tersedia.
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {tabAktif === 3 && (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table
                aria-label="Tindak lanjut meeting"
                sx={{
                  minWidth: 640,
                  "& thead th": {
                    px: 1.5,
                    py: 1.25,
                    borderBottom: `1px solid ${WARNA.garis}`,
                    color: WARNA.teksRedupLembut,
                    fontSize: 11,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  },
                  "& tbody td": {
                    px: 1.5,
                    py: 1.5,
                    borderBottom: `1px solid ${WARNA.garisBaris}`,
                    color: WARNA.teks,
                    fontSize: 12,
                  },
                  "& tbody tr:last-child td": { borderBottom: "none" },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "42%" }}>Tindak lanjut</TableCell>
                    <TableCell sx={{ width: "23%" }}>PIC</TableCell>
                    <TableCell sx={{ width: "20%" }}>Tenggat</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tindakLanjut.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
                        {item.deskripsi}
                      </TableCell>
                      <TableCell>{item.pic}</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {item.deadline || item.tenggat || "—"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={item.status}
                          color={item.status === "Selesai" ? "success" : "default"}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {!tindakLanjut.length && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                          Belum ada tindak lanjut untuk meeting ini.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tabAktif === 4 && (
            <Box sx={{ display: "grid", gap: 0.75 }}>
              {daftarLampiran(dokumentasi).map((file) => (
                <BarisLampiran key={file.id} file={file} mode="unduh" />
              ))}
              {!dokumentasi.length && (
                <Typography sx={{ color: WARNA.teksRedup, fontSize: 12 }}>
                  Dokumentasi belum tersedia.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}
