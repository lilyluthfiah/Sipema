import { createTheme } from "@mui/material/styles";

export const WARNA = {
  ungu: "#6d28d9",
  unguHover: "#5b21b6",
  unguLight: "#a78bfa",
  unguSoft: "#f4efff",
  unguGaris: "#e6dcfb",
  lavendel: "#f4f1fe",
  garis: "#eae5f2",
  garisBaris: "#f2edf7",
  garisHalus: "#eee8f6",
  garisFooter: "#f0ebf6",
  teks: "#2b1d40",
  teksGelap: "#1e1430",
  teksLabel: "#26164c",
  teksRedup: "#6b5f7f",
  teksRedupLembut: "#968ca3",
  teksAbu: "#a198ad",
  bahaya: "#c1444f",
  bahayaSoft: "#fdf1f2",
  bahayaGaris: "#f2d7da",
};

export const sipemaTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: WARNA.ungu,
      dark: WARNA.unguHover,
      light: WARNA.unguLight,
      contrastText: "#ffffff",
    },
    background: { default: WARNA.lavendel, paper: "#ffffff" },
    text: { primary: WARNA.teks, secondary: WARNA.teksRedup },
    divider: WARNA.garis,
    error: { main: WARNA.bahaya },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
    fontSize: 13,
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 9, fontSize: 12, boxShadow: "none" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 11,
          backgroundColor: "#ffffff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d8ccff",
            borderWidth: "1.5px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: WARNA.unguLight },
          "&.Mui-focused": { boxShadow: "0 0 0 3px #ede9fe" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: WARNA.ungu,
            borderWidth: "1.5px",
          },
        },
        input: {
          fontSize: 12,
          padding: "11px 13px",
          "&::placeholder": { color: WARNA.teksAbu, opacity: 1 },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { fontSize: 10, color: WARNA.teksRedupLembut, marginLeft: 0 } },
    },
    MuiTableCell: {
      styleOverrides: { root: { fontSize: 12, borderColor: "#f2edf7", padding: "13px 12px" } },
    },
    MuiChip: {
      styleOverrides: { root: { fontSize: 11, fontWeight: 600, borderRadius: 8, height: "auto" } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16, padding: 24, border: `1px solid ${WARNA.garis}` } },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 11,
          boxShadow: "0 12px 30px rgba(30, 20, 48, 0.12)",
          fontSize: 11,
          fontWeight: 600,
          color: WARNA.teks,
          backgroundColor: "#ffffff",
          border: `1px solid ${WARNA.unguGaris}`,
          padding: "12px 16px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: { root: { fontSize: 12 } },
    },
  },
});
