import { ambilMeetingSekretaris } from "./meetingSekretaris";

const KUNCI_TINDAK_LANJUT_KARYAWAN = "sipema.tindak-lanjut.karyawan";

const TINDAK_LANJUT_KARYAWAN_AWAL = [
  {
    id: "karyawan-1",
    judul: "Dokumentasikan API modul absensi",
    kode: "TL-033",
    kodeMeeting: "M-012",
    meeting: "Evaluasi Modul Absensi",
    deskripsi: "Dokumentasikan API modul absensi dan pastikan panduan penggunaannya tersedia.",
    pic: "Budi Santoso",
    tenggat: "2026-10-16",
    status: "Belum dimulai",
    dibuatOleh: "Dewi Anggraini",
    dibuatTanggal: "2026-10-06",
    hasil: null,
  },
  {
    id: "karyawan-2",
    judul: "Susun revisi anggaran divisi IT",
    kode: "TL-031",
    kodeMeeting: "M-013",
    meeting: "Koordinasi Anggaran 2027",
    deskripsi: "Susun revisi alokasi sisa anggaran 2026 divisi IT dengan rincian per kegiatan.",
    pic: "Budi Santoso",
    tenggat: "2026-10-14",
    status: "Proses",
    dibuatOleh: "Dewi Anggraini",
    dibuatTanggal: "2026-10-06",
    hasil: null,
  },
  {
    id: "karyawan-3",
    judul: "Uji coba modul absensi mobile",
    kode: "TL-028",
    kodeMeeting: "M-012",
    meeting: "Evaluasi Modul Absensi",
    deskripsi: "Uji coba modul absensi pada perangkat mobile dan catat hasil pengujian.",
    pic: "Budi Santoso",
    tenggat: "2026-10-05",
    status: "Selesai",
    dibuatOleh: "Dewi Anggraini",
    dibuatTanggal: "2026-09-28",
    hasil: null,
  },
];

export function namaKaryawanDariUsername(username) {
  const nama = String(username || "").trim();
  if (!nama || nama.toLowerCase().includes("karyawan")) return "Budi Santoso";
  return nama
    .split(/\s+/)
    .map((bagian) => bagian.charAt(0).toUpperCase() + bagian.slice(1))
    .join(" ");
}

function cocokNama(nama, username) {
  const namaKaryawan = namaKaryawanDariUsername(username).toLowerCase();
  const namaPIC = String(nama || "").toLowerCase();
  return namaPIC === namaKaryawan || namaPIC.startsWith(`${namaKaryawan} `);
}

export function ambilMeetingKaryawan(username) {
  const namaKaryawan = namaKaryawanDariUsername(username);
  return ambilMeetingSekretaris()
    .filter(
      (meeting) =>
        meeting.status === "Dijadwalkan" &&
        meeting.daftarPeserta.some((peserta) => cocokNama(peserta, namaKaryawan)),
    )
    .sort((a, b) => `${a.tanggalISO}${a.jamMulai}`.localeCompare(`${b.tanggalISO}${b.jamMulai}`));
}

export function ambilJadwalMeetingKaryawan(username) {
  const namaKaryawan = namaKaryawanDariUsername(username);
  return ambilMeetingSekretaris().filter((meeting) =>
    meeting.daftarPeserta.some((peserta) => cocokNama(peserta, namaKaryawan)),
  );
}

export function ambilTindakLanjutKaryawan(username) {
  const tersimpan = window.localStorage.getItem(KUNCI_TINDAK_LANJUT_KARYAWAN);
  const daftar = tersimpan
    ? JSON.parse(tersimpan)
    : TINDAK_LANJUT_KARYAWAN_AWAL;
  return daftar.filter((item) => cocokNama(item.pic, username));
}

export function ambilTindakLanjutKaryawanById(id, username) {
  return ambilTindakLanjutKaryawan(username).find(
    (item) => String(item.id) === String(id),
  );
}

export function simpanPembaruanTindakLanjutKaryawan(id, username, pembaruan) {
  const daftar = ambilTindakLanjutKaryawan(username);
  const sebelumnya = daftar.find((item) => String(item.id) === String(id));
  if (!sebelumnya) {
    throw new Error("Tindak lanjut tidak ditemukan atau bukan milik Anda.");
  }
  if (!["Belum dimulai", "Proses", "Selesai"].includes(pembaruan.status)) {
    throw new Error("Status tindak lanjut tidak valid.");
  }

  const diperbarui = daftar.map((item) =>
    String(item.id) === String(id) ? { ...item, ...pembaruan } : item,
  );
  window.localStorage.setItem(
    KUNCI_TINDAK_LANJUT_KARYAWAN,
    JSON.stringify(
      ambilSemuaTindakLanjutKaryawan().map(
        (item) => diperbarui.find((baru) => String(baru.id) === String(item.id)) ?? item,
      ),
    ),
  );
  return diperbarui.find((item) => String(item.id) === String(id));
}

function ambilSemuaTindakLanjutKaryawan() {
  const tersimpan = window.localStorage.getItem(KUNCI_TINDAK_LANJUT_KARYAWAN);
  return tersimpan ? JSON.parse(tersimpan) : TINDAK_LANJUT_KARYAWAN_AWAL;
}
