import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import { rute } from "./router/rute";
import LoginPage from "./pages/auth/LoginPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Beranda from "./pages/admin/Beranda";
import PenggunaPage from "./pages/admin/PenggunaPage";
import HalamanPlaceholder from "./pages/admin/HalamanPlaceholder";
import DetailMeeting from "./pages/admin/DetailMeeting";

/* ========================================
   ROUTING SIPEMA
   - /login            : halaman login (publik)
   - /                 : dashboard (protected, layout berisi Outlet)
     - /beranda
     - /pengguna
     - /hak-akses
     - /monitoring-meeting
     - /monitoring-meeting/:id  (detail meeting)
     - /tindak-lanjut
     - /laporan
   ======================================== */

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={rute.login} element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={rute.beranda} replace />} />
            <Route path="beranda" element={<Beranda />} />
            <Route path="pengguna" element={<PenggunaPage />} />
            <Route path="hak-akses" element={<HalamanPlaceholder judul="Hak akses" />} />
            <Route path="monitoring-meeting" element={<HalamanPlaceholder judul="Monitoring meeting" />} />
            <Route path="monitoring-meeting/:id" element={<DetailMeeting />} />
            <Route path="tindak-lanjut" element={<HalamanPlaceholder judul="Tindak lanjut" />} />
            <Route path="laporan" element={<HalamanPlaceholder judul="Laporan" />} />
          </Route>

          <Route path="*" element={<Navigate to={rute.beranda} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
