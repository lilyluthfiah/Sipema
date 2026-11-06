import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import { rute, ruteKaryawan, ruteSekretaris } from "./router/rute";
import LoginPage from "./pages/auth/LoginPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Beranda from "./pages/admin/Beranda";
import PenggunaPage from "./pages/admin/PenggunaPage";
import DetailMeeting from "./pages/admin/DetailMeeting";
import HakAksesPage from "./pages/admin/HakAksesPage";
import MonitoringMeetingPage from "./pages/admin/MonitoringMeetingPage";
import TindakLanjutPage from "./pages/admin/TindakLanjutPage";
import LaporanPage from "./pages/admin/LaporanPage";
import DashboardSekretaris from "./pages/sekretaris/DashboardSekretaris";
import BerandaSekretaris from "./pages/sekretaris/BerandaSekretaris";
import DaftarMeetingSekretaris from "./pages/sekretaris/DaftarMeetingSekretaris";
import FormMeetingSekretaris from "./pages/sekretaris/FormMeetingSekretaris";
import DetailMeetingSekretaris from "./pages/sekretaris/DetailMeetingSekretaris";
import TindakLanjutSekretaris from "./pages/sekretaris/TindakLanjutSekretaris";
import FormTindakLanjutSekretaris from "./pages/sekretaris/FormTindakLanjutSekretaris";
import DetailTindakLanjutSekretaris from "./pages/sekretaris/DetailTindakLanjutSekretaris";
import DashboardKaryawan from "./pages/karyawan/DashboardKaryawan";
import BerandaKaryawan from "./pages/karyawan/BerandaKaryawan";
import JadwalMeetingKaryawan from "./pages/karyawan/JadwalMeetingKaryawan";
import DetailMeetingKaryawan from "./pages/karyawan/DetailMeetingKaryawan";
import TindakLanjutKaryawan from "./pages/karyawan/TindakLanjutKaryawan";
import DetailTindakLanjutKaryawan from "./pages/karyawan/DetailTindakLanjutKaryawan";

/* ========================================
   ROUTING SIPEMA
   - /login            : halaman login (publik)
   - /                 : dashboard admin (protected)
     - /beranda
     - /pengguna
     - /hak-akses
     - /monitoring-meeting
     - /monitoring-meeting/:id  (detail meeting admin)
     - /tindak-lanjut
     - /laporan
   - /sekretaris       : dashboard sekretaris (protected)
     - /sekretaris/beranda
     - /sekretaris/meeting
     - /sekretaris/meeting/:id  (detail meeting sekretaris)
     - /sekretaris/tindak-lanjut
     - /sekretaris/tindak-lanjut/baru
   - /karyawan/beranda
     - /karyawan/meeting
     - /karyawan/meeting/:id  (detail meeting karyawan, read-only)
     - /karyawan/tindak-lanjut
     - /karyawan/tindak-lanjut/:id  (detail & update tindak lanjut karyawan)
   ======================================== */

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={rute.login} element={<LoginPage />} />

          {/* RUTE ADMIN (PRESERVED 100%) */}
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
            <Route path="hak-akses" element={<HakAksesPage />} />
            <Route path="monitoring-meeting" element={<MonitoringMeetingPage />} />
            <Route path="monitoring-meeting/:id" element={<DetailMeeting />} />
            <Route path="tindak-lanjut" element={<TindakLanjutPage />} />
            <Route path="laporan" element={<LaporanPage />} />
          </Route>

          {/* RUTE SEKRETARIS */}
          <Route
            path="/sekretaris"
            element={
              <ProtectedRoute>
                <DashboardSekretaris />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={ruteSekretaris.beranda} replace />} />
            <Route path="beranda" element={<BerandaSekretaris />} />
            <Route path="meeting" element={<DaftarMeetingSekretaris />} />
            <Route path="meeting/baru" element={<FormMeetingSekretaris />} />
            <Route path="meeting/:id/ubah" element={<FormMeetingSekretaris />} />
            <Route path="meeting/:id" element={<DetailMeetingSekretaris />} />
            <Route path="tindak-lanjut" element={<TindakLanjutSekretaris />} />
            <Route path="tindak-lanjut/baru" element={<FormTindakLanjutSekretaris />} />
            <Route path="tindak-lanjut/:id/ubah" element={<FormTindakLanjutSekretaris />} />
            <Route path="tindak-lanjut/:id" element={<DetailTindakLanjutSekretaris />} />
          </Route>

          <Route
            path={ruteKaryawan.root}
            element={
              <ProtectedRoute requiredRole="Karyawan">
                <DashboardKaryawan />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={ruteKaryawan.beranda} replace />} />
            <Route path="beranda" element={<BerandaKaryawan />} />
            <Route path="meeting" element={<JadwalMeetingKaryawan />} />
            <Route path="meeting/:id" element={<DetailMeetingKaryawan />} />
            <Route path="tindak-lanjut" element={<TindakLanjutKaryawan />} />
            <Route path="tindak-lanjut/:id" element={<DetailTindakLanjutKaryawan />} />
            <Route path="*" element={<Navigate to={ruteKaryawan.beranda} replace />} />
          </Route>

          <Route path="*" element={<Navigate to={rute.beranda} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
