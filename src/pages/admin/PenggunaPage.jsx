import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { sipemaTheme, WARNA } from "../../theme/sipemaTheme";
import { animasiMasuk } from "../../theme/animasi";

/* ========================================
   TOKEN PENDUKUNG
   ======================================== */

const FOKUS = "#ede9fe";

/* ========================================
   ICON (SVG inline, sama seperti gaya SIPEMA)
   ======================================== */

function IkonCari() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* PERBAIKAN: menerima className supaya MUI bisa memposisikan panah
   (class .MuiSelect-icon) di sisi kanan kotak dropdown. */
function IkonPanah({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke={WARNA.ungu}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IkonTambah() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IkonHapus() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

/* ========================================
   DATA & KONSTANTA
   ======================================== */

const DIVISI_LIST = [
  "Umum",
  "Sekretariat",
  "Teknologi Informasi",
  "Keuangan",
  "HRD",
  "Operasional",
];

const PERAN_LIST = ["Admin", "Sekretaris", "Karyawan"];

const FILTER_PERAN = ["Semua peran", ...PERAN_LIST];

const DATA_AWAL = [
  { id: 1, nama: "Rina Marlina", username: "rina.marlina", divisi: "Sekretariat", peran: "Admin" },
  { id: 2, nama: "Budi Santoso", username: "budi.santoso", divisi: "Teknologi Informasi", peran: "Karyawan" },
  { id: 3, nama: "Siti Rahmawati", username: "siti.rahmawati", divisi: "Sekretariat", peran: "Sekretaris" },
  { id: 4, nama: "Andi Prasetyo", username: "andi.prasetyo", divisi: "Operasional", peran: "Karyawan" },
  { id: 5, nama: "Dewi Lestari", username: "dewi.lestari", divisi: "Keuangan", peran: "Karyawan" },
  { id: 6, nama: "Fajar Nugroho", username: "fajar.nugroho", divisi: "HRD", peran: "Karyawan" },
  { id: 7, nama: "Maya Puspita", username: "maya.puspita", divisi: "Umum", peran: "Karyawan" },
  { id: 8, nama: "Rizky Ananda", username: "rizky.ananda", divisi: "Teknologi Informasi", peran: "Karyawan" },
];

const FORM_AWAL = {
  nama: "",
  divisi: "",
  username: "",
  sandi: "",
  peran: "Karyawan",
};

function inisial(nama) {
  return (nama || "").trim().charAt(0).toUpperCase() || "?";
}

/* ========================================
   STYLE OBJECT (MUI sx)
   ======================================== */

const gayaHeader = (mounted) => ({
  minHeight: "auto",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
  "& h1": {
    margin: 0,
    color: WARNA.teksGelap,
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.8px",
    lineHeight: 1.2,
  },
  "& p": {
    margin: "8px 0 0",
    color: WARNA.teksRedup,
    fontSize: 13,
    lineHeight: 1.6,
  },
  "@media (max-width:700px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "22px",
    "& h1": { fontSize: 23 },
  },
  ...(mounted ? animasiMasuk("0ms") : {}),
});

const gayaKartu = (mounted) => ({
  minWidth: 0,
  padding: "22px",
  border: `1px solid ${WARNA.garis}`,
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(30, 20, 48, 0.02)",
  "@media (max-width:700px)": { padding: "16px 12px" },
  ...(mounted ? animasiMasuk("80ms") : {}),
});

const gayaTombolUtama = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
  padding: "11px 16px",
  minHeight: 0,
  border: 0,
  borderRadius: "9px",
  backgroundColor: WARNA.ungu,
  color: "#ffffff",
  fontSize: 12,
  fontWeight: 700,
  "&:hover": { backgroundColor: WARNA.unguHover },
  "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
};

const gayaTombolBatal = {
  padding: "10px 16px",
  minHeight: 0,
  border: "1px solid #e7dcfa",
  borderRadius: "9px",
  backgroundColor: "#ffffff",
  color: WARNA.ungu,
  fontSize: 12,
  fontWeight: 600,
  "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
  "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 2 },
};

const gayaTombolBahaya = {
  padding: "10px 16px",
  minHeight: 0,
  border: 0,
  borderRadius: "9px",
  backgroundColor: WARNA.bahaya,
  color: "#ffffff",
  fontSize: 12,
  fontWeight: 700,
  "&:hover": { backgroundColor: "#a93a45" },
};

const gayaTombolKembali = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  margin: "0 0 14px",
  padding: 0,
  minHeight: 0,
  border: 0,
  backgroundColor: "transparent",
  color: WARNA.ungu,
  fontSize: 11,
  fontWeight: 700,
  "&:hover": { backgroundColor: "transparent", color: WARNA.unguHover },
  "&:focus-visible": { outline: "2px solid #6d28d9", outlineOffset: 3 },
};

const gayaCari = {
  width: "100%",
  maxWidth: "320px",
  "& .MuiOutlinedInput-root": { height: 42 },
  "& .MuiOutlinedInput-input": { padding: "11px 13px" },
  "& .MuiInputAdornment-root": { marginRight: "10px", color: WARNA.unguLight },
  "@media (max-width:700px)": { maxWidth: "none" },
};

/* PERBAIKAN: lebar kotak mengikuti isi (fit-content), minWidth agar tidak
   berubah-ubah saat pilihan diganti, dan panah diberi jarak dari pinggir. */
const gayaFilter = {
  width: "fit-content",
  "& .MuiOutlinedInput-root": {
    height: 42,
    width: "fit-content",
    minWidth: 150,
  },
  "& .MuiSelect-select.MuiOutlinedInput-input": {
    padding: "11px 40px 11px 14px",
    fontWeight: 600,
    minWidth: 0,
  },
  "& .MuiSelect-icon": { right: 14, color: WARNA.ungu },
};

const gayaSel = {
  "& .MuiOutlinedInput-input": { fontWeight: 600, color: WARNA.teks },
};

const gayaBadgeTotal = {
  height: "auto",
  padding: "6px 10px",
  border: `1px solid ${WARNA.unguGaris}`,
  borderRadius: "8px",
  backgroundColor: WARNA.unguSoft,
  color: WARNA.ungu,
  fontSize: 11,
  fontWeight: 600,
};

const gayaPeranBadge = (peran) => {
  const gaya = {
    Admin: { backgroundColor: WARNA.ungu, borderColor: WARNA.ungu, color: "#ffffff" },
    Sekretaris: { backgroundColor: WARNA.unguSoft, borderColor: WARNA.unguGaris, color: WARNA.ungu },
    Karyawan: { backgroundColor: "#f6f4fb", borderColor: WARNA.garis, color: WARNA.teksRedup },
  }[peran];
  return {
    height: "auto",
    padding: "5px 10px",
    border: "1px solid",
    borderRadius: "8px",
    fontSize: 10,
    fontWeight: 700,
    ...gaya,
  };
};

const gayaTombolUbah = {
  flexShrink: 0,
  padding: "7px 12px",
  minHeight: 0,
  border: "1px solid #e7dcfa",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: WARNA.ungu,
  fontSize: 11,
  fontWeight: 600,
  "&:hover": { backgroundColor: "#f1eaff", borderColor: "#e7dcfa" },
};

const gayaTombolHapus = {
  flexShrink: 0,
  padding: "7px 12px",
  minHeight: 0,
  border: `1px solid ${WARNA.garisHalus}`,
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#746482",
  fontSize: 11,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: WARNA.bahayaSoft,
    borderColor: WARNA.bahayaGaris,
    color: WARNA.bahaya,
  },
};

const gayaSelPeran = (terpilih) => ({
  minWidth: 160,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  border: `1.5px solid ${terpilih ? WARNA.ungu : WARNA.garis}`,
  borderRadius: "11px",
  backgroundColor: terpilih ? WARNA.unguSoft : "#ffffff",
  boxShadow: terpilih ? `0 0 0 3px ${FOKUS}` : "none",
  cursor: "pointer",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  "&:hover": { borderColor: terpilih ? WARNA.ungu : "#ddd3ff" },
  "@media (max-width:700px)": { minWidth: 0, flex: 1 },
});

const gayaLabelField = {
  color: WARNA.teksLabel,
  fontSize: 12,
  fontWeight: 700,
};

const gayaTabel = {
  width: "100%",
  minWidth: 640,
  borderCollapse: "collapse",
  "& thead th": {
    padding: "0 12px 11px",
    borderBottom: `1px solid ${WARNA.garis}`,
    color: WARNA.teksRedupLembut,
    fontSize: 10,
    fontWeight: 750,
    letterSpacing: "1.1px",
    textTransform: "uppercase",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  "& tbody td": {
    padding: "13px 12px",
    borderBottom: `1px solid ${WARNA.garisBaris}`,
    color: WARNA.teks,
    fontSize: 12,
    verticalAlign: "middle",
  },
  "& tbody tr": { transition: "background 150ms ease" },
  "& tbody tr:hover": { backgroundColor: "#faf8ff" },
  "& tbody tr:last-child td": { borderBottom: 0 },
};

/* ========================================
   KOMPONEN PENDUKUNG
   ======================================== */

function Field({ htmlFor, label, children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <Typography component="label" htmlFor={htmlFor} sx={gayaLabelField}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function TabelPengguna({
  mounted,
  cari,
  setCari,
  peranFilter,
  setPeranFilter,
  daftarTersaring,
  daftarPengguna,
  onTambah,
  onUbah,
  onHapus,
}) {
  return (
    <>
      <Box component="header" sx={gayaHeader(mounted)}>
        <Box sx={{ minWidth: 0 }}>
          <h1>Data pengguna</h1>
        </Box>
        <Button
          variant="contained"
          disableElevation
          startIcon={<IkonTambah />}
          onClick={onTambah}
          sx={gayaTombolUtama}
        >
          Tambah pengguna
        </Button>
      </Box>

      <Box component="section" sx={gayaKartu(mounted)}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            mb: "18px",
          }}
        >
          <TextField
            size="small"
            value={cari}
            onChange={(event) => setCari(event.target.value)}
            placeholder="Cari nama atau username"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IkonCari />
                  </InputAdornment>
                ),
              },
              htmlInput: { "aria-label": "Cari nama atau username" },
            }}
            sx={gayaCari}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              "@media (max-width:700px)": {
                width: "100%",
                justifyContent: "space-between",
              },
            }}
          >
            <TextField
              select
              size="small"
              value={peranFilter}
              onChange={(event) => setPeranFilter(event.target.value)}
              slotProps={{
                select: {
                  IconComponent: IkonPanah,
                  "aria-label": "Filter peran pengguna",
                },
              }}
              sx={{ ...gayaFilter, ...gayaSel }}
            >
              {FILTER_PERAN.map((peran) => (
                <MenuItem key={peran} value={peran}>
                  {peran}
                </MenuItem>
              ))}
            </TextField>

            <Chip
              label={`${daftarTersaring.length} pengguna`}
              variant="outlined"
              sx={gayaBadgeTotal}
            />
          </Box>
        </Box>

        {daftarTersaring.length === 0 ? (
          <Box
            sx={{
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                marginBottom: "16px",
                display: "grid",
                placeItems: "center",
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${WARNA.unguLight}, ${WARNA.ungu})`,
                boxShadow: "0 8px 20px rgba(109, 40, 217, 0.15)",
                color: "#ffffff",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              ?
            </Box>
            <Typography
              component="h3"
              sx={{ margin: 0, color: "#302040", fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}
            >
              Pengguna tidak ditemukan
            </Typography>
            <Typography
              component="p"
              sx={{ margin: "8px 0 0", color: "#90869e", fontSize: 12, lineHeight: 1.6 }}
            >
              Coba ubah kata kunci pencarian atau filter peran.
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
            <Table size="small" sx={gayaTabel}>
              <TableHead>
                <TableRow>
                  <TableCell>Pengguna</TableCell>
                  <TableCell>Divisi</TableCell>
                  <TableCell>Peran</TableCell>
                  <TableCell align="right">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daftarTersaring.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "11px",
                          minWidth: 0,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            backgroundColor:
                              item.peran === "Admin" ? "transparent" : "#eee7ff",
                            backgroundImage:
                              item.peran === "Admin"
                                ? `linear-gradient(135deg, ${WARNA.unguLight}, ${WARNA.ungu})`
                                : "none",
                            color: item.peran === "Admin" ? "#ffffff" : WARNA.ungu,
                            fontSize: 14,
                            fontWeight: 750,
                          }}
                        >
                          {inisial(item.nama)}
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            component="strong"
                            sx={{
                              display: "block",
                              color: WARNA.teks,
                              fontSize: 12,
                              fontWeight: 700,
                              lineHeight: 1.35,
                            }}
                          >
                            {item.nama}
                          </Typography>
                          <Typography
                            component="small"
                            sx={{
                              display: "block",
                              marginTop: "2px",
                              color: WARNA.teksRedupLembut,
                              fontSize: 10,
                              lineHeight: 1.4,
                            }}
                          >
                            @{item.username}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        sx={{
                          color: WARNA.teksRedup,
                          fontSize: 12,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.divisi}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.peran}
                        variant="outlined"
                        sx={gayaPeranBadge(item.peran)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: "7px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          disableElevation
                          onClick={() => onUbah(item)}
                          sx={gayaTombolUbah}
                        >
                          Ubah
                        </Button>
                        {item.peran !== "Admin" && (
                          <Button
                            variant="outlined"
                            disableElevation
                            onClick={() => onHapus(item)}
                            sx={gayaTombolHapus}
                          >
                            Hapus
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box
          sx={{
            marginTop: "18px",
            paddingTop: "14px",
            borderTop: `1px solid ${WARNA.garisFooter}`,
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            color: WARNA.teksAbu,
            fontSize: 10,
          }}
        >
          <span>
            Menampilkan {daftarTersaring.length} dari {daftarPengguna.length} pengguna
          </span>
        </Box>
      </Box>
    </>
  );
}

function FormPengguna({
  mounted,
  form,
  ubahField,
  onSubmit,
  onKembali,
  opsiPeran,
  adminSedangDiedit,
  pesanError,
}) {
  return (
    <>
      <Box component="header" sx={gayaHeader(mounted)}>
        <Box sx={{ minWidth: 0 }}>
          <Button disableElevation onClick={onKembali} sx={gayaTombolKembali}>
          </Button>
          <h1>Form pengguna</h1>
        </Box>
      </Box>

      <Box component="section" sx={gayaKartu(mounted)}>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: "18px 20px",
            }}
          >
            <Field htmlFor="pengguna-nama" label="Nama lengkap">
              <TextField
                id="pengguna-nama"
                size="small"
                value={form.nama}
                onChange={ubahField("nama")}
                placeholder="Budi Santoso"
                autoComplete="off"
                fullWidth
              />
            </Field>

            <Field htmlFor="pengguna-divisi" label="Divisi">
              <TextField
                id="pengguna-divisi"
                size="small"
                value={form.divisi}
                onChange={ubahField("divisi")}
                placeholder="Teknologi Informasi"
                autoComplete="off"
                fullWidth
                slotProps={{ htmlInput: { list: "pengguna-daftar-divisi" } }}
              />
              <datalist id="pengguna-daftar-divisi">
                {DIVISI_LIST.map((divisi) => (
                  <option key={divisi} value={divisi} />
                ))}
              </datalist>
            </Field>

            <Field htmlFor="pengguna-username" label="Username">
              <TextField
                id="pengguna-username"
                size="small"
                value={form.username}
                onChange={ubahField("username")}
                placeholder="budi.santoso"
                autoComplete="off"
                fullWidth
              />
            </Field>

            <Field htmlFor="pengguna-sandi" label="Kata sandi">
              <TextField
                id="pengguna-sandi"
                size="small"
                type="password"
                value={form.sandi}
                onChange={ubahField("sandi")}
                placeholder="Isi kata sandi"
                autoComplete="new-password"
                fullWidth
              />
              <FormHelperText sx={{ margin: 0 }}>
              </FormHelperText>
            </Field>
          </Box>

          <Field label="Peran">
            <RadioGroup
              row
              value={form.peran}
              onChange={ubahField("peran")}
              aria-label="Pilih peran pengguna"
              sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              {opsiPeran.map((peran) => {
                const terkunci = adminSedangDiedit && peran === "Admin";
                const terpilih = form.peran === peran;
                return (
                  <Box
                    key={peran}
                    component="label"
                    sx={{
                      ...gayaSelPeran(terpilih),
                      opacity: terkunci ? 0.85 : 1,
                      cursor: terkunci ? "not-allowed" : "pointer",
                    }}
                  >
                    <Radio
                      value={peran}
                      disabled={terkunci}
                      disableRipple
                      size="small"
                      sx={{
                        p: 0,
                        color: "#d8ccff",
                        "&.Mui-checked": { color: WARNA.ungu },
                        "&.Mui-disabled": { color: "#d8ccff" },
                        "&.Mui-disabled.Mui-checked": { color: WARNA.ungu },
                      }}
                      icon={
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "1.5px solid #d8ccff",
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: `1.5px solid ${WARNA.ungu}`,
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            display: "grid",
                            placeItems: "center",
                            "&::after": {
                              content: '""',
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: WARNA.ungu,
                            },
                          }}
                        />
                      }
                    />
                    <Typography
                      component="span"
                      sx={{ color: WARNA.teks, fontSize: 12, fontWeight: 600 }}
                    >
                      {peran}
                    </Typography>
                  </Box>
                );
              })}
            </RadioGroup>
            <FormHelperText sx={{ margin: 0 }}>
              {adminSedangDiedit && " Peran admin tidak dapat diubah."}
            </FormHelperText>
          </Field>

          {pesanError && (
            <Box
              role="alert"
              sx={{
                margin: 0,
                padding: "10px 13px",
                border: `1px solid ${WARNA.bahayaGaris}`,
                borderRadius: "9px",
                backgroundColor: WARNA.bahayaSoft,
                color: WARNA.bahaya,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {pesanError}
            </Box>
          )}

          <Box
            sx={{
              paddingTop: "18px",
              borderTop: `1px solid ${WARNA.garisFooter}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
              flexWrap: "wrap",
              "@media (max-width:700px)": { justifyContent: "stretch" },
            }}
          >
            <Button
              variant="outlined"
              disableElevation
              onClick={onKembali}
              sx={gayaTombolBatal}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              disableElevation
              type="submit"
              sx={gayaTombolUtama}
            >
              Simpan pengguna
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function DialogHapusPengguna({ konfirmasiHapus, onBatal, onKonfirmasi }) {
  return (
    <Dialog
      open={Boolean(konfirmasiHapus)}
      onClose={onBatal}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 380,
            padding: "24px",
            border: `1px solid ${WARNA.garis}`,
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            boxShadow: "0 22px 60px rgba(30, 20, 48, 0.22)",
            textAlign: "center",
          },
        },
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          margin: "0 auto 14px",
          display: "grid",
          placeItems: "center",
          borderRadius: "14px",
          backgroundColor: WARNA.bahayaSoft,
          color: WARNA.bahaya,
        }}
      >
        <IkonHapus />
      </Box>
      <DialogTitle
        sx={{
          padding: 0,
          color: "#302040",
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        Hapus pengguna?
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Typography
          component="p"
          sx={{ margin: "10px 0 20px", color: WARNA.teksRedup, fontSize: 12, lineHeight: 1.6 }}
        >
          Data pengguna <strong>{konfirmasiHapus?.nama}</strong> (@
          {konfirmasiHapus?.username}) akan dihapus dari daftar ini.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 0, justifyContent: "center", gap: "10px" }}>
        <Button
          variant="outlined"
          disableElevation
          onClick={onBatal}
          sx={gayaTombolBatal}
        >
          Batal
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={onKonfirmasi}
          sx={gayaTombolBahaya}
        >
          Hapus pengguna
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function NotifikasiPengguna({ notifikasi, onClose }) {
  return (
    <Snackbar
      open={Boolean(notifikasi)}
      autoHideDuration={2600}
      onClose={onClose}
      message={
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", gap: "9px" }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              flexShrink: 0,
              borderRadius: "50%",
              backgroundColor: WARNA.ungu,
              boxShadow: "0 0 0 3px rgba(109, 40, 217, 0.12)",
            }}
          />
          {notifikasi}
        </Box>
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "@media (max-width:700px)": { right: 12, left: 12 },
      }}
    />
  );
}

/* ========================================
   HALAMAN
   ======================================== */

export default function PenggunaPage() {
  const [mounted, setMounted] = useState(false);
  const [daftarPengguna, setDaftarPengguna] = useState(DATA_AWAL);
  const [tampilan, setTampilan] = useState("tabel");
  const [form, setForm] = useState(FORM_AWAL);
  const [idEdit, setIdEdit] = useState(null);
  const [cari, setCari] = useState("");
  const [peranFilter, setPeranFilter] = useState("Semua peran");
  const [pesanError, setPesanError] = useState("");
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);
  const [notifikasi, setNotifikasi] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!notifikasi) return undefined;
    const timer = setTimeout(() => setNotifikasi(""), 2600);
    return () => clearTimeout(timer);
  }, [notifikasi]);

  const daftarTersaring = useMemo(() => {
    const kunci = cari.trim().toLowerCase();
    return daftarPengguna.filter((item) => {
      const cocokCari =
        kunci === "" ||
        item.nama.toLowerCase().includes(kunci) ||
        item.username.toLowerCase().includes(kunci);
      const cocokPeran = peranFilter === "Semua peran" || item.peran === peranFilter;
      return cocokCari && cocokPeran;
    });
  }, [daftarPengguna, cari, peranFilter]);

  const bukaTambah = () => {
    setIdEdit(null);
    setForm(FORM_AWAL);
    setPesanError("");
    setTampilan("form");
  };

  const bukaUbah = (item) => {
    setIdEdit(item.id);
    setForm({
      nama: item.nama,
      divisi: item.divisi,
      username: item.username,
      sandi: "",
      peran: item.peran,
    });
    setPesanError("");
    setTampilan("form");
  };

  const kembaliKeTabel = () => {
    setTampilan("tabel");
    setIdEdit(null);
    setForm(FORM_AWAL);
    setPesanError("");
  };

  const ubahField = (field) => (event) => {
    const nilai = event.target.value;
    setForm((prev) => ({ ...prev, [field]: nilai }));
    if (pesanError) setPesanError("");
  };

  const handleSimpan = (event) => {
    event.preventDefault();

    const nama = form.nama.trim();
    const username = form.username.trim();

    if (!nama) {
      setPesanError("Nama lengkap wajib diisi.");
      return;
    }
    if (!username) {
      setPesanError("Username wajib diisi.");
      return;
    }
    const usernameTerpakai = daftarPengguna.some(
      (item) => item.username.toLowerCase() === username.toLowerCase() && item.id !== idEdit
    );
    if (usernameTerpakai) {
      setPesanError("Username sudah dipakai pengguna lain.");
      return;
    }

    if (idEdit === null) {
      setDaftarPengguna((prev) => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1,
          nama,
          username,
          divisi: form.divisi.trim() || "Umum",
          peran: form.peran,
        },
      ]);
      setNotifikasi(`Pengguna "${nama}" berhasil ditambahkan.`);
    } else {
      setDaftarPengguna((prev) =>
        prev.map((item) =>
          item.id === idEdit
            ? {
                ...item,
                nama,
                username,
                divisi: form.divisi.trim() || item.divisi,
                peran: form.peran,
              }
            : item
        )
      );
      setNotifikasi(`Data pengguna "${nama}" berhasil diperbarui.`);
    }

    kembaliKeTabel();
  };

  const eksekusiHapus = () => {
    if (!konfirmasiHapus) return;
    setDaftarPengguna((prev) => prev.filter((item) => item.id !== konfirmasiHapus.id));
    setNotifikasi(`Pengguna "${konfirmasiHapus.nama}" berhasil dihapus.`);
    setKonfirmasiHapus(null);
  };

  const opsiPeran = useMemo(() => {
    if (idEdit !== null && form.peran === "Admin") {
      return PERAN_LIST;
    }
    return PERAN_LIST.filter((peran) => peran !== "Admin");
  }, [idEdit, form.peran]);

  const adminSedangDiedit = idEdit !== null && form.peran === "Admin";

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box sx={{ width: "100%" }}>
        {tampilan === "tabel" ? (
          <TabelPengguna
            mounted={mounted}
            cari={cari}
            setCari={setCari}
            peranFilter={peranFilter}
            setPeranFilter={setPeranFilter}
            daftarTersaring={daftarTersaring}
            daftarPengguna={daftarPengguna}
            onTambah={bukaTambah}
            onUbah={bukaUbah}
            onHapus={setKonfirmasiHapus}
          />
        ) : (
          <FormPengguna
            mounted={mounted}
            form={form}
            ubahField={ubahField}
            onSubmit={handleSimpan}
            onKembali={kembaliKeTabel}
            opsiPeran={opsiPeran}
            adminSedangDiedit={adminSedangDiedit}
            pesanError={pesanError}
          />
        )}

        <DialogHapusPengguna
          konfirmasiHapus={konfirmasiHapus}
          onBatal={() => setKonfirmasiHapus(null)}
          onKonfirmasi={eksekusiHapus}
        />

        <NotifikasiPengguna
          notifikasi={notifikasi}
          onClose={() => setNotifikasi("")}
        />
      </Box>
    </ThemeProvider>
  );
}