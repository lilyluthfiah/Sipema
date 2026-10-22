/* ========================================
   KONFIGURASI ROUTE SIPEMA
   Sumber tunggal untuk sidebar, NavLink, dan <Route>.
   ======================================== */

export const rute = {
  beranda: "/beranda",
  pengguna: "/pengguna",
  hakAkses: "/hak-akses",
  monitoringMeeting: "/monitoring-meeting",
  detailMeeting: "/monitoring-meeting/:id",
  tindakLanjut: "/tindak-lanjut",
  laporan: "/laporan",
  login: "/login",
};

/* Urutan & isi menu sidebar. `path` dipakai sebagai tujuan Link/NavLink. */
export const menuNavigasi = [
  { nama: "Beranda", path: rute.beranda },
  { nama: "Pengguna", path: rute.pengguna },
  { nama: "Hak akses", path: rute.hakAkses },
  { nama: "Monitoring meeting", path: rute.monitoringMeeting },
  { nama: "Tindak lanjut", path: rute.tindakLanjut },
  { nama: "Laporan", path: rute.laporan },
];

export function detailMeetingPath(id) {
  return `${rute.monitoringMeeting}/${id}`;
}
