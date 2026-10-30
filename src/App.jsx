import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import { rute, ruteSekretaris } from "./router/rute";
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

          <Route path="*" element={<Navigate to={rute.beranda} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
