import { useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  ambilTindakLanjutKaryawanById,
  simpanPembaruanTindakLanjutKaryawan,
} from "../../data/karyawan";
import { ruteKaryawan } from "../../router/rute";
import { animasiMasuk } from "../../theme/animasi";
import { WARNA } from "../../theme/sipemaTheme";

const OPSI_STATUS = ["Belum dimulai", "Proses", "Selesai"];

function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  const namaBulan = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${Number(hari)} ${namaBulan[Number(bulan) - 1] ?? bulan} ${tahun}`;
}

function Panel({ title, children }) {
  return (
    <Box
      component="section"
      sx={{
        minWidth: 0,
        p: { xs: "16px 12px", md: "20px" },
        border: `1px solid ${WARNA.garis}`,
        borderRadius: "3px",
        backgroundColor: "#fff",
      }}
    >
      <Typography component="h2" sx={{ m: 0, mb: 1.5, color: WARNA.teks, fontSize: 14, fontWeight: 700 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Info({ label, children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "100px minmax(0, 1fr)" },
        alignItems: "start",
        gap: { xs: 0.25, sm: 1.5 },
      }}
    >
      <Typography sx={{ color: WARNA.teksRedup, fontSize: 11 }}>{label}</Typography>
      <Typography sx={{ color: WARNA.teks, fontSize: 12, lineHeight: 1.7 }}>
        {children || "-"}
      </Typography>
    </Box>
  );
}

function inisial(nama) {
  return nama.split(" ").map((bagian) => bagian[0]).slice(0, 2).join("").toUpperCase();
}

export default function DetailTindakLanjutKaryawan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { namaUser = "Budi Santoso" } = useOutletContext() || {};
  const data = ambilTindakLanjutKaryawanById(id, namaUser);
  const inputFileRef = useRef(null);
  const [status, setStatus] = useState(data?.status ?? "Belum dimulai");
  const [hasil, setHasil] = useState(data?.hasil ?? null);
  const [pesanError, setPesanError] = useState("");
  const [sedangMembacaFile, setSedangMembacaFile] = useState(false);
  const [dragAktif, setDragAktif] = useState(false);

  const kembali = () => navigate(ruteKaryawan.tindakLanjut);

  const pilihFile = (file) => {
    if (!file) return;
    setPesanError("");
    setSedangMembacaFile(true);
    const reader = new FileReader();
    const sekarang = new Date();
    const tanggalUnggah = `${sekarang.getFullYear()}-${String(
      sekarang.getMonth() + 1,
    ).padStart(2, "0")}-${String(sekarang.getDate()).padStart(2, "0")}`;
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setPesanError("File tidak dapat dibaca. Silakan pilih file lain.");
      } else {
        setHasil({
          nama: file.name,
          tipe: file.type,
          ukuran: file.size,
          diunggahTanggal: tanggalUnggah,
          dataUrl: reader.result,
        });
      }
      setSedangMembacaFile(false);
    };
    reader.onerror = () => {
      setPesanError("File tidak dapat dibaca. Silakan coba kembali.");
      setSedangMembacaFile(false);
    };
    reader.readAsDataURL(file);
  };

  const simpan = (event) => {
    event.preventDefault();
    setPesanError("");
    try {
      simpanPembaruanTindakLanjutKaryawan(id, namaUser, { status, hasil });
      kembali();
    } catch (error) {
      setPesanError(
        error instanceof Error
          ? `Pembaruan tidak dapat disimpan: ${error.message}`
          : "Pembaruan tidak dapat disimpan.",
      );
    }
  };

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography component="h1" sx={{ color: WARNA.teksGelap, fontSize: 20, fontWeight: 700 }}>
          Tindak lanjut tidak ditemukan
        </Typography>
        <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 12 }}>
          Data tindak lanjut tidak tersedia atau bukan ditugaskan kepada Anda.
        </Typography>
        <Button onClick={kembali} sx={{ mt: 1, color: WARNA.ungu, fontSize: 12 }}>
          Kembali ke tindak lanjut saya
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 2, ...animasiMasuk("0ms") }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={kembali}
          sx={{ mb: 1, px: 0, color: WARNA.teksRedup, fontSize: 12 }}
        >
          Kembali ke tindak lanjut
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.25 }}>
          <Typography
            component="h1"
            sx={{
              m: 0,
              color: WARNA.teksGelap,
              fontSize: { xs: 22, md: 26 },
              fontWeight: 800,
              letterSpacing: "-0.7px",
            }}
          >
            {data.judul}
          </Typography>
          <Chip label={data.status} size="small" variant="outlined" />
        </Box>
        <Typography sx={{ mt: 0.5, color: WARNA.teksRedup, fontSize: 12 }}>
          {data.kode} · {data.kodeMeeting} {data.meeting}
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={simpan}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.4fr) minmax(300px, 0.9fr)" },
          alignItems: "start",
          gap: 1.5,
          ...animasiMasuk("80ms"),
        }}
      >
        <Panel title="Rincian tindak lanjut">
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <Info label="Deskripsi">{data.deskripsi}</Info>
            <Info label="PIC">
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: "rgba(109, 40, 217, 0.14)", color: WARNA.ungu, fontSize: 9, fontWeight: 700 }}>
                  {inisial(data.pic)}
                </Avatar>
                {data.pic}
              </Box>
            </Info>
            <Info label="Tenggat">{formatTanggal(data.tenggat)}</Info>
            <Info label="Dibuat oleh">
              {data.dibuatOleh}, {formatTanggal(data.dibuatTanggal)}
            </Info>
            <Info label="Status">
              <Chip
                label={data.status}
                size="small"
                sx={{
                  height: 24,
                  borderRadius: 2,
                  fontSize: 10,
                  ...(data.status === "Selesai"
                    ? { backgroundColor: "rgba(46, 125, 50, 0.1)", color: "#2e7d32" }
                    : data.status === "Proses"
                      ? { backgroundColor: "rgba(255, 152, 0, 0.14)", color: "#ed6c02" }
                      : { backgroundColor: "rgba(158, 158, 158, 0.16)", color: "#616161" }),
                }}
              />
            </Info>
          </Box>
        </Panel>

        <Box sx={{ display: "grid", gap: 1.5 }}>
          <Panel title="Perbarui status">
            <RadioGroup
              row
              aria-label="Status tindak lanjut"
              name="status-tindak-lanjut"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              sx={{ gap: 0.75, flexWrap: "wrap" }}
            >
              {OPSI_STATUS.map((opsi) => (
                <Box
                  key={opsi}
                  sx={{
                    px: 0.75,
                    border: `1px solid ${status === opsi ? WARNA.teksRedup : WARNA.garis}`,
                    borderRadius: "3px",
                    backgroundColor: status === opsi ? "#f7f5ff" : "#fff",
                  }}
                >
                  <FormControlLabel
                    value={opsi}
                    control={<Radio size="small" sx={{ p: 0.5 }} />}
                    label={<Typography sx={{ fontSize: 11 }}>{opsi}</Typography>}
                    sx={{ m: 0 }}
                  />
                </Box>
              ))}
            </RadioGroup>
          </Panel>

          <Panel title="Hasil tindak lanjut">
            {hasil && (
              <Box
                sx={{
                  mb: 1.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  p: 1,
                  border: `1px solid ${WARNA.garis}`,
                  borderRadius: "3px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                  <InsertDriveFileOutlinedIcon sx={{ color: WARNA.teksRedup, fontSize: 18 }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ color: WARNA.teks, fontSize: 11, fontWeight: 600 }}>
                      {hasil.nama}
                    </Typography>
                    <Typography sx={{ color: WARNA.teksRedup, fontSize: 10 }}>
                      Diunggah {formatTanggal(hasil.diunggahTanggal)}
                    </Typography>
                  </Box>
                </Box>
                {hasil.dataUrl && (
                  <Button
                    component="a"
                    href={hasil.dataUrl}
                    download={hasil.nama}
                    size="small"
                    startIcon={<DownloadOutlinedIcon />}
                    sx={{ flexShrink: 0, color: WARNA.teks, fontSize: 10 }}
                  >
                    Unduh
                  </Button>
                )}
              </Box>
            )}

            <Box
              onDragOver={(event) => {
                event.preventDefault();
                setDragAktif(true);
              }}
              onDragLeave={() => setDragAktif(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragAktif(false);
                pilihFile(event.dataTransfer.files[0]);
              }}
              sx={{
                minHeight: 116,
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: `1px dashed ${dragAktif ? WARNA.ungu : WARNA.garis}`,
                borderRadius: "3px",
                backgroundColor: dragAktif ? WARNA.unguSoft : "#fff",
                textAlign: "center",
              }}
            >
              <CloudUploadOutlinedIcon sx={{ mb: 0.5, color: WARNA.teksRedup, fontSize: 20 }} />
              <Typography sx={{ color: WARNA.teksRedup, fontSize: 11 }}>
                Tarik berkas ke sini atau
              </Typography>
              <Button
                type="button"
                onClick={() => inputFileRef.current?.click()}
                disabled={sedangMembacaFile}
                sx={{ minHeight: 28, color: WARNA.teks, fontSize: 11 }}
              >
                {sedangMembacaFile ? "Membaca file..." : "Pilih dari komputer"}
              </Button>
              <Typography sx={{ color: WARNA.teksRedupLembut, fontSize: 10 }}>
                Unggah hasil pengerjaan tindak lanjut.
              </Typography>
              <input
                ref={inputFileRef}
                type="file"
                hidden
                onChange={(event) => {
                  pilihFile(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </Box>
          </Panel>
        </Box>

        <Box
          sx={{
            gridColumn: { xs: "1", lg: "2" },
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            pt: 1.25,
            borderTop: `1px solid ${WARNA.garis}`,
          }}
        >
          {pesanError && (
            <Typography role="alert" sx={{ mr: "auto", alignSelf: "center", color: WARNA.bahaya, fontSize: 11 }}>
              {pesanError}
            </Typography>
          )}
          <Button type="button" variant="outlined" onClick={kembali}>
            Batal
          </Button>
          <Button type="submit" variant="contained" disabled={sedangMembacaFile}>
            Simpan pembaruan
          </Button>
        </Box>
      </Box>
    </>
  );
}
