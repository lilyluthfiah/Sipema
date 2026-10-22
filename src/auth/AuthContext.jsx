import { createContext, useContext, useMemo, useState } from "react";

/* ========================================
   SESI AUTENTIKASI
   Status login disimpan di localStorage
   supaya tidak hilang saat halaman dimuat ulang.
   Hanya data sesi (username & peran), tanpa password.
   ======================================== */

const KUNCI_SESI = "sipema_sesi";

const AuthContext = createContext(null);

function bacaSesi() {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    const mentah = sessionStorage.getItem(KUNCI_SESI) || localStorage.getItem(KUNCI_SESI);
    if (!mentah) return null;
    const data = JSON.parse(mentah);
    if (data && data.sudahLogin) return data;
    return null;
  } catch {
    return null;
  }
}

function tulisSesi(data) {
  try {
    if (typeof window === "undefined") return;
    if (data) {
      const teks = JSON.stringify(data);
      localStorage.setItem(KUNCI_SESI, teks);
      sessionStorage.setItem(KUNCI_SESI, teks);
    } else {
      localStorage.removeItem(KUNCI_SESI);
      sessionStorage.removeItem(KUNCI_SESI);
    }
  } catch {
    /* penyimpanan tidak tersedia — abaikan */
  }
}

export function AuthProvider({ children }) {
  const [sesi, setSesi] = useState(() => bacaSesi());

  const nilai = useMemo(() => {
    const sudahLogin = Boolean(sesi && sesi.sudahLogin);

    return {
      sudahLogin,
      pengguna: sudahLogin ? { username: sesi.username, peran: sesi.peran || "Admin" } : null,
      login: ({ username, peran = "Admin" } = {}) => {
        const data = { sudahLogin: true, username: username || "rina", peran };
        setSesi(data);
        tulisSesi(data);
      },
      logout: () => {
        setSesi(null);
        tulisSesi(null);
      },
    };
  }, [sesi]);

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const konteks = useContext(AuthContext);
  if (!konteks) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider.");
  }
  return konteks;
}
