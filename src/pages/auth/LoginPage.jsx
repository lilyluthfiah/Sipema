import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { sipemaTheme } from "../../theme/sipemaTheme";
import { useAuth } from "../../auth/AuthContext";
import { rute } from "../../router/rute";

/* ========================================
   PENYIMPANAN "INGAT SAYA"
   Hanya username yang disimpan (tanpa password)
   ======================================== */

const KUNCI_INGAT = "sipema_ingat_saya";
const KUNCI_USERNAME = "sipema_username";

function ambilUsernameTersimpan() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return "";
    return localStorage.getItem(KUNCI_INGAT) === "1" ? localStorage.getItem(KUNCI_USERNAME) || "" : "";
  } catch {
    return "";
  }
}

function simpanIngatSaya(username, ingat) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    if (ingat) {
      localStorage.setItem(KUNCI_INGAT, "1");
      localStorage.setItem(KUNCI_USERNAME, username);
    } else {
      localStorage.removeItem(KUNCI_INGAT);
      localStorage.removeItem(KUNCI_USERNAME);
    }
  } catch {
    /* penyimpanan tidak tersedia — abaikan */
  }
}

/* ========================================
   LOGO SIPEMA
   ======================================== */

function Logo({ light = false }) {
  const ukuran = light ? 52 : 46;
  const fontSize = light ? 39 : 35;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: light ? "flex-start" : "center",
        gap: 0,
        color: light ? "#FFFFFF" : "#6D28D9",
        mb: light ? "55px" : 0,
        "@media (max-width:1000px)": { mb: light ? "40px" : 0 },
        "@media (max-width:700px)": { mb: light ? "30px" : 0 },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 48 48"
        aria-hidden="true"
        sx={{
          width: `${ukuran}px`,
          height: `${ukuran}px`,
          flex: "0 0 auto",
          overflow: "visible",
          color: light ? "#A78BFA" : undefined,
          filter: "drop-shadow(0 2px 3px rgba(109, 40, 217, 0.18))",
        }}
      >
        <defs>
          <linearGradient id={light ? "logoGradientLight" : "logoGradient"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <path
          d="M32 7H22C14 7 10 12 10 18C10 22 12 25 17 28L27 33C30 35 29 38 25 40L16 44C12 46 8 43 10 39L12 35L20 31L15 28C9 25 6 21 6 16C6 8 12 3 22 3H32C37 3 39 7 36 11L33 15L25 19C21 21 22 24 26 26L32 29C38 32 40 36 37 41C34 46 28 48 20 48H16L25 43C32 40 34 36 29 33L19 28C13 25 10 22 10 18C10 12 14 7 22 7Z"
          fill={`url(#${light ? "logoGradientLight" : "logoGradient"})`}
          transform="translate(2 -1) scale(.92)"
        />
      </Box>
      {/* Huruf "S" diwakili simbol SVG, wordmark menampilkan "ipema" */}
      <Box
        component="span"
        sx={{
          display: "inline",
          marginLeft: "-10px",
          fontSize: `${fontSize}px`,
          fontWeight: 800,
          letterSpacing: "-1.5px",
        }}
      >
        ipema
      </Box>
    </Box>
  );
}

/* ========================================
   IKON INPUT
   ======================================== */

const gayaIkon = {
  width: "21px",
  height: "21px",
  flex: "0 0 auto",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function IkonUser() {
  return (
    <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={gayaIkon}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </Box>
  );
}

function IkonKunci() {
  return (
    <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={gayaIkon}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </Box>
  );
}

/* ========================================
   ILUSTRASI KALENDER (khas panel kiri)
   ======================================== */

function CalendarIllustration() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "270px",
        maxWidth: "480px",
        margin: "28px auto 0",
        "@media (min-width:1500px)": { height: "310px" },
        "@media (max-width:1000px)": {
          transform: "scale(0.9)",
          transformOrigin: "top center",
          marginBottom: "-25px",
        },
        "@media (max-width:700px)": {
          height: "210px",
          maxWidth: "400px",
          marginTop: "12px",
          transform: "scale(0.85)",
          transformOrigin: "top center",
          marginBottom: "-25px",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "78%",
          height: "75%",
          left: "10%",
          top: "15%",
          borderRadius: "50%",
          background: "rgba(109, 40, 217, 0.18)",
          filter: "blur(22px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "35px",
          left: "12%",
          width: "43%",
          height: "165px",
          padding: "13px",
          borderRadius: "15px",
          background: "linear-gradient(145deg, #FFFFFF, #D9C9FF)",
          boxShadow: "0 18px 35px #10072480",
          transform: "rotate(-9deg)",
        }}
      >
        <Box sx={{ height: "25px", borderBottom: "2px solid #C4B5FD", display: "flex", justifyContent: "space-around" }}>
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              component="i"
              sx={{ height: "18px", width: "7px", borderRadius: "5px", background: "#6D28D9", marginTop: "-14px" }}
            />
          ))}
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "7px", paddingTop: "12px" }}>
          {Array.from({ length: 16 }, (_, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                height: "19px",
                borderRadius: "5px",
                background: i === 9 ? "#6D28D9" : "#D9CCFA",
                color: "white",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              {i === 9 ? "✓" : ""}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "43px",
          right: "8%",
          width: "27%",
          padding: "15px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #7C3AED, #5521A8)",
          transform: "rotate(-6deg)",
          boxShadow: "0 12px 25px #10072450",
        }}
      >
        <Box component="span" sx={{ display: "block", height: "5px", margin: "4px 0", borderRadius: "5px", background: "#C4B5FD" }} />
        <Box component="span" sx={{ display: "block", height: "5px", margin: "4px 0", borderRadius: "5px", background: "#C4B5FD" }} />
        <Box
          component="span"
          sx={{ display: "block", height: "5px", margin: "4px 0", borderRadius: "5px", background: "#C4B5FD", width: "55%" }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "5px",
          left: "37%",
          width: "42%",
          padding: "17px",
          borderRadius: "14px",
          background: "linear-gradient(140deg, white, #E4D8FF)",
          boxShadow: "0 15px 35px #10072470",
          transform: "rotate(-5deg)",
        }}
      >
        <Box sx={{ width: "60%", height: "7px", borderRadius: "5px", background: "#A78BFA", marginBottom: "12px" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "9px", margin: "10px 0" }}>
          <Box component="b" sx={{ color: "#6D28D9", fontSize: "23px" }}>
            ✓
          </Box>
          <Box component="span" sx={{ height: "6px", width: "75%", borderRadius: "5px", background: "#D1C4F5" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "9px", margin: "10px 0" }}>
          <Box component="b" sx={{ color: "#6D28D9", fontSize: "23px" }}>
            ✓
          </Box>
          <Box component="span" sx={{ height: "6px", width: "75%", borderRadius: "5px", background: "#D1C4F5" }} />
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "8px",
          right: "3%",
          width: "22%",
          height: "68px",
          borderRadius: "13px",
          background: "#6D28D9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          boxShadow: "0 12px 24px #10072450",
          transform: "rotate(-8deg)",
        }}
      >
        <Box component="span" sx={{ position: "absolute", top: "13px", left: "20%", width: "13px", height: "13px", borderRadius: "50%", background: "#D9CCFA" }} />
        <Box component="span" sx={{ position: "absolute", top: "13px", left: "44%", width: "13px", height: "13px", borderRadius: "50%", background: "#D9CCFA" }} />
        <Box component="span" sx={{ position: "absolute", top: "13px", left: "68%", width: "13px", height: "13px", borderRadius: "50%", background: "#D9CCFA" }} />
        <Box component="div" sx={{ marginTop: "25px", width: "19px", height: "15px", borderRadius: "12px 12px 4px 4px", background: "#D9CCFA" }} />
        <Box component="div" sx={{ marginTop: "25px", width: "19px", height: "15px", borderRadius: "12px 12px 4px 4px", background: "#D9CCFA" }} />
        <Box component="div" sx={{ marginTop: "25px", width: "19px", height: "15px", borderRadius: "12px 12px 4px 4px", background: "#D9CCFA" }} />
      </Box>

      <Box sx={{ position: "absolute", top: "8px", left: "65%", color: "#A78BFA", fontSize: "34px", transform: "rotate(-20deg)" }}>
        ➤
      </Box>
    </Box>
  );
}

/* ========================================
   HALAMAN LOGIN
   ======================================== */

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState(() => ambilUsernameTersimpan());
  const [password, setPassword] = useState("");
  const [ingatSaya, setIngatSaya] = useState(() => ambilUsernameTersimpan() !== "");
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !password) {
      setPesan("Username dan password wajib diisi.");
      return;
    }

    simpanIngatSaya(username.trim(), ingatSaya);
    login({ username: username.trim(), peran: "Admin" });
    if (onLoginSuccess) onLoginSuccess();
    navigate(rute.beranda, { replace: true });
  }

  const gayaInput = {
    height: "53px",
    alignItems: "center",
    gap: "12px",
    px: "15px",
    mb: "25px",
    borderRadius: "11px",
    backgroundColor: "#FFFFFF",
    color: "#7253BF",
    transition: "border-color 0.2s, box-shadow 0.2s",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D8CCFF", borderWidth: "1.5px" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#D8CCFF" },
    "&.Mui-focused": { boxShadow: "0 0 0 3px #EDE9FE" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6D28D9", borderWidth: "1.5px" },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      fontFamily: "inherit",
      lineHeight: "normal",
      letterSpacing: "normal",
      color: "#1E1430",
      padding: "1px 2px",
      minWidth: 0,
      "&::placeholder": { color: "#9286BB", opacity: 1 },
    },
    "& .MuiInputAdornment-root": { margin: "0", color: "#7253BF" },
  };

  const gayaLabel = {
    display: "block",
    margin: "0 0 10px",
    color: "#26164C",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "normal",
    letterSpacing: "normal",
  };

  return (
    <ThemeProvider theme={sipemaTheme}>
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#EDE9FE",
          "@media (max-width:1000px)": { gridTemplateColumns: "0.9fr 1.1fr" },
          "@media (max-width:700px)": { gridTemplateColumns: "1fr" },
        }}
      >
        <Box
          component="section"
          sx={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "55px clamp(35px, 7vw, 110px)",
            color: "white",
            background:
              "radial-gradient(ellipse at 100% 0%, #35176F 0%, transparent 48%), linear-gradient(145deg, #1E1430, #190D35)",
            "@media (max-width:1000px)": { padding: "40px 35px" },
            "@media (max-width:700px)": { minHeight: "auto", padding: "35px 28px 15px" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              width: "190px",
              height: "190px",
              top: "-105px",
              left: "-85px",
              background: "#6D28D9",
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              width: "300px",
              height: "300px",
              bottom: "-220px",
              left: "-150px",
              border: "2px solid #6D28D9",
              boxShadow: "0 0 0 35px rgba(109, 40, 217, 0.13)",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "560px" }}>
            <Logo light />

            <Box>
              <Typography
                component="h1"
                sx={{
                  color: "inherit",
                  fontSize: "clamp(29px, 3vw, 40px)",
                  lineHeight: 1.28,
                  letterSpacing: "-1.3px",
                  margin: "0 0 18px",
                  fontWeight: 800,
                  "@media (max-width:700px)": { fontSize: "29px" },
                }}
              >
                Kelola Meeting,
                <br />
                Dokumentasi, dan
                <br />
                <Box component="span" sx={{ color: "#A78BFA" }}>
                  Tindak Lanjut
                </Box>
              </Typography>
              <Typography
                component="p"
                sx={{
                  maxWidth: "480px",
                  fontSize: "15px",
                  lineHeight: 1.9,
                  letterSpacing: "normal",
                  fontWeight: 400,
                  color: "#D8CCFF",
                  margin: 0,
                  "@media (max-width:700px)": { fontSize: "14px" },
                }}
              >
                Sipema membantu Anda mengelola jadwal meeting, mencatat hasil, dan memantau tindak lanjut dalam satu sistem yang
                terintegrasi.
              </Typography>
            </Box>

            <CalendarIllustration />
          </Box>
        </Box>

        <Box
          component="section"
          sx={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "45px clamp(24px, 5vw, 80px)",
            background: "radial-gradient(ellipse at 50% 50%, #F9F7FF 0%, transparent 72%), #EDE9FE",
            "@media (max-width:1000px)": { padding: "30px 24px" },
            "@media (max-width:700px)": { minHeight: "auto", padding: "25px 18px 40px" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              border: "2px solid #D5C5FF",
              borderRadius: "50%",
              pointerEvents: "none",
              width: "90px",
              height: "90px",
              top: "8%",
              right: "8%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              border: "2px solid #D5C5FF",
              borderRadius: "50%",
              pointerEvents: "none",
              width: "38px",
              height: "38px",
              bottom: "7%",
              right: "6%",
              background: "rgba(167, 139, 250, 0.12)",
            }}
          />

          <Box
            sx={{
              width: "100%",
              maxWidth: "560px",
              position: "relative",
              zIndex: 1,
              padding: "38px clamp(28px, 4vw, 55px)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: "26px",
              background: "rgba(255, 255, 255, 0.94)",
              boxShadow: "0 22px 65px rgba(74, 36, 140, 0.12)",
              "@media (min-width:1500px)": { maxWidth: "600px", padding: "48px 58px" },
              "@media (max-width:1000px)": { padding: "32px 28px" },
              "@media (max-width:700px)": { maxWidth: "480px", padding: "30px 24px", borderRadius: "20px" },
            }}
          >
            <Box component="header" sx={{ textAlign: "center" }}>
              <Logo />
              <Typography component="p" sx={{ color: "#8276B4", fontSize: "13px", lineHeight: 1.7, letterSpacing: "normal", fontWeight: 400, margin: "8px 0 25px" }}>
                Sistem Informasi Pengelolaan Meeting
                <br />
                dan Tindak Lanjut
              </Typography>
            </Box>

            <Box sx={{ height: "1px", background: "#DDD3FF", marginBottom: "28px" }} />

            <Box sx={{ width: "100%", textAlign: "center", marginBottom: "28px" }}>
              <Typography
                component="h2"
                sx={{
                  width: "100%",
                  margin: 0,
                  color: "#26164C",
                  fontSize: "27px",
                  fontWeight: 700,
                  lineHeight: "normal",
                  letterSpacing: "-0.7px",
                  textAlign: "center",
                  "@media (max-width:700px)": { fontSize: "28px" },
                }}
              >
                Selamat Datang!
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="label" htmlFor="username" sx={gayaLabel}>
                Username
              </Typography>
              <OutlinedInput
                id="username"
                name="username"
                type="text"
                placeholder="Masukkan username"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setPesan("");
                }}
                required
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <IkonUser />
                  </InputAdornment>
                }
                sx={gayaInput}
              />

              <Typography component="label" htmlFor="password" sx={gayaLabel}>
                Password
              </Typography>
              <OutlinedInput
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPesan("");
                }}
                required
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <IkonKunci />
                  </InputAdornment>
                }
                sx={gayaInput}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={ingatSaya}
                    onChange={(e) => {
                      setIngatSaya(e.target.checked);
                      setPesan("");
                    }}
                    size="small"
                    sx={{
                      color: "#B7A6E8",
                      "&.Mui-checked": { color: "#6D28D9" },
                      "& .MuiSvgIcon-root": { fontSize: "20px" },
                    }}
                  />
                }
                label="Ingat Saya"
                sx={{
                  alignSelf: "flex-start",
                  margin: "-14px 0 22px",
                  "& .MuiFormControlLabel-label": {
                    color: "#7253BF",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "normal",
                  },
                }}
              />

              <Button
                type="submit"
                sx={{
                  width: "100%",
                  minHeight: "54px",
                  marginTop: "3px",
                  padding: "13px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  border: "none",
                  borderRadius: "11px",
                  color: "white",
                  background: "linear-gradient(100deg, #6D28D9, #5B21C7)",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "normal",
                  letterSpacing: "normal",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    background: "linear-gradient(100deg, #6D28D9, #5B21C7)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 20px #6D28D940",
                  },
                }}
              >
                Masuk
              </Button>
            </Box>

            {pesan && (
              <Typography component="p" role="status">
                {pesan}
              </Typography>
            )}

            <Box
              component="footer"
              sx={{ marginTop: "25px", paddingTop: "18px", borderTop: "1px solid #E7DFFF", textAlign: "center" }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
