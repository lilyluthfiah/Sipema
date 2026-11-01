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
  meetingBaru: "/sekretaris/meeting/baru",
  detailMeeting: "/sekretaris/meeting/:id",
  tindakLanjut: "/sekretaris/tindak-lanjut",
  tindakLanjutBaru: "/sekretaris/tindak-lanjut/baru",
  detailTindakLanjut: "/sekretaris/tindak-lanjut/:id",
  ubahTindakLanjut: "/sekretaris/tindak-lanjut/:id/ubah",
};

export const ruteKaryawan = {
  root: "/karyawan",
  beranda: "/karyawan/beranda",
  meeting: "/karyawan/meeting",
  detailMeeting: "/karyawan/meeting/:id",
  tindakLanjut: "/karyawan/tindak-lanjut",
  detailTindakLanjut: "/karyawan/tindak-lanjut/:id",
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

export const menuNavigasiKaryawan = [
  { nama: "Beranda", path: ruteKaryawan.beranda },
  { nama: "Jadwal meeting", path: ruteKaryawan.meeting },
  { nama: "Tindak lanjut saya", path: ruteKaryawan.tindakLanjut },
];

export function detailMeetingPath(id) {
  return `${rute.monitoringMeeting}/${id}`;
}

export function detailMeetingSekretarisPath(id) {
  return `${ruteSekretaris.meeting}/${id}`;
}

export function ubahMeetingSekretarisPath(id) {
  return `${ruteSekretaris.meeting}/${id}/ubah`;
}

export function detailTindakLanjutSekretarisPath(id) {
  return `${ruteSekretaris.tindakLanjut}/${id}`;
}

export function ubahTindakLanjutSekretarisPath(id) {
  return `${ruteSekretaris.tindakLanjut}/${id}/ubah`;
}

export function detailMeetingKaryawanPath(id) {
  return `${ruteKaryawan.meeting}/${id}`;
}

export function detailTindakLanjutKaryawanPath(id) {
  return `${ruteKaryawan.tindakLanjut}/${id}`;
}
