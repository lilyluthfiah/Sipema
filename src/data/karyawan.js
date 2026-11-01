import { ambilMeetingSekretaris } from "./meetingSekretaris";

const TINDAK_LANJUT_KARYAWAN_AWAL = [
  {
    id: "karyawan-1",
    judul: "Dokumentasikan API modul absensi",
    pic: "Budi Santoso",
    tenggat: "2026-10-16",
    status: "Belum dimulai",
  },
  {
    id: "karyawan-2",
    judul: "Susun revisi anggaran divisi IT",
    pic: "Budi Santoso",
    tenggat: "2026-10-14",
    status: "Proses",
  },
  {
    id: "karyawan-3",
    judul: "Perbarui dokumentasi proyek",
    pic: "Budi Santoso",
    tenggat: "2026-10-10",
    status: "Selesai",
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
  return TINDAK_LANJUT_KARYAWAN_AWAL.filter((item) =>
    cocokNama(item.pic, username),
  );
}
