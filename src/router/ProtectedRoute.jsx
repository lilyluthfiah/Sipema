import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { rute, ruteKaryawan, ruteSekretaris } from "./rute";

/* ========================================
   PROTECTED ROUTE
   Membungkus halaman yang hanya boleh diakses setelah login.
   Bila belum login, alihkan ke /login dan ingat halaman asal.
   ======================================== */

export default function ProtectedRoute({ children, requiredRole }) {
  const { sudahLogin, pengguna } = useAuth();
  const lokasi = useLocation();

  if (!sudahLogin) {
    return <Navigate to={rute.login} replace state={{ dari: lokasi }} />;
  }

  if (requiredRole && pengguna?.peran !== requiredRole) {
    const berandaPeran = {
      Admin: rute.beranda,
      Sekretaris: ruteSekretaris.beranda,
      Karyawan: ruteKaryawan.beranda,
    };
    return <Navigate to={berandaPeran[pengguna?.peran] || rute.login} replace />;
  }

  return children ?? null;
}
