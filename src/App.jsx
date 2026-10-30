import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import { rute, ruteSekretaris } from "./router/rute";
import LoginPage from "./pages/auth/LoginPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Beranda from "./pages/admin/Beranda";
import PenggunaPage from "./pages/admin/PenggunaPage";
import HalamanPlaceholder from "./pages/admin/HalamanPlaceholder";
import DetailMeeting from "./pages/admin/DetailMeeting";
import HakAksesPage from "./pages/admin/HakAksesPage";
import MonitoringMeetingPage from "./pages/admin/MonitoringMeetingPage";
import TindakLanjutPage from "./pages/admin/TindakLanjutPage";
import LaporanPage from "./pages/admin/LaporanPage";
import DashboardSekretaris from "./pages/sekretaris/DashboardSekretaris";
import BerandaSekretaris, { meetingsSekretaris } from "./pages/sekretaris/BerandaSekretaris";

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
            <Route
              path="meeting"
              element={<HalamanPlaceholder judul="Meeting" kembaliPath={ruteSekretaris.beranda} />}
            />
            <Route
              path="meeting/:id"
              element={
                <DetailMeeting
                  kembaliPath={ruteSekretaris.meeting}
                  labelKembali="Meeting"
                  meetingsData={meetingsSekretaris}
                />
              }
            />
            <Route
              path="tindak-lanjut"
              element={<HalamanPlaceholder judul="Tindak lanjut" kembaliPath={ruteSekretaris.beranda} />}
            />
          </Route>

          <Route path="*" element={<Navigate to={rute.beranda} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
