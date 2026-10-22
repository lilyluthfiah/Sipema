import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { rute } from "./rute";

/* ========================================
   PROTECTED ROUTE
   Membungkus halaman yang hanya boleh diakses setelah login.
   Bila belum login, alihkan ke /login dan ingat halaman asal.
   ======================================== */

export default function ProtectedRoute({ children }) {
  const { sudahLogin } = useAuth();
  const lokasi = useLocation();

  if (!sudahLogin) {
    return <Navigate to={rute.login} replace state={{ dari: lokasi }} />;
  }

  return children ?? null;
}
