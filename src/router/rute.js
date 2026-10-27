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

export const ruteSekretaris = {
  root: "/sekretaris",
  beranda: "/sekretaris/beranda",
  meeting: "/sekretaris/meeting",
  detailMeeting: "/sekretaris/meeting/:id",
  tindakLanjut: "/sekretaris/tindak-lanjut",
};

/* Urutan & isi menu sidebar Admin. `path` dipakai sebagai tujuan Link/NavLink. */
export const menuNavigasi = [
  { nama: "Beranda", path: rute.beranda },
  { nama: "Pengguna", path: rute.pengguna },
  { nama: "Hak akses", path: rute.hakAkses },
  { nama: "Monitoring meeting", path: rute.monitoringMeeting },
  { nama: "Tindak lanjut", path: rute.tindakLanjut },
  { nama: "Laporan", path: rute.laporan },
];

/* Urutan & isi menu sidebar Sekretaris. */
export const menuNavigasiSekretaris = [
  { nama: "Beranda", path: ruteSekretaris.beranda },
  { nama: "Meeting", path: ruteSekretaris.meeting },
  { nama: "Tindak lanjut", path: ruteSekretaris.tindakLanjut },
];

export function detailMeetingPath(id) {
  return `${rute.monitoringMeeting}/${id}`;
}

export function detailMeetingSekretarisPath(id) {
  return `${ruteSekretaris.meeting}/${id}`;
}
