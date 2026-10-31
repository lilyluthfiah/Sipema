const STORAGE_KEY = "sipema.tindak-lanjut.sekretaris";

const TINDAK_LANJUT_AWAL = [
  {
    id: 1,
    kode: "TL-031",
    meeting: "M-013 Koordinasi Anggaran 2027",
    judul: "Susun revisi anggaran divisi IT",
    pic: "Budi Santoso, Teknologi Informasi",
    tenggat: "2026-10-14",
    status: "Proses",
  },
  {
    id: 2,
    kode: "TL-030",
    meeting: "M-013 Koordinasi Anggaran 2027",
    judul: "Kirim rekap vendor ke Keuangan",
    pic: "Agus Pratama, Keuangan",
    tenggat: "2026-10-09",
    status: "Belum dimulai",
  },
  {
    id: 3,
    kode: "TL-029",
    meeting: "M-012 Evaluasi Modul Absensi",
    judul: "Verifikasi data absensi Q3",
    pic: "Siti Rahmawati, SDM",
    tenggat: "2026-10-12",
    status: "Selesai",
  },
];

export function ambilTindakLanjutSekretaris() {
  const tersimpan = window.localStorage.getItem(STORAGE_KEY);
  return tersimpan ? JSON.parse(tersimpan) : TINDAK_LANJUT_AWAL;
}

export function ambilTindakLanjutSekretarisById(id) {
  return ambilTindakLanjutSekretaris().find(
    (item) => String(item.id) === String(id),
  );
}

export function simpanTindakLanjutSekretaris(dataBaru, idUbah = null) {
  const daftar = ambilTindakLanjutSekretaris();
  if (idUbah !== null) {
    const sebelumnya = daftar.find(
      (item) => String(item.id) === String(idUbah),
    );
    if (!sebelumnya) {
      throw new Error("Tindak lanjut tidak ditemukan.");
    }

    const diperbarui = daftar.map((item) =>
      String(item.id) === String(idUbah)
        ? { ...sebelumnya, ...dataBaru, id: sebelumnya.id, kode: sebelumnya.kode }
        : item,
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(diperbarui));
    return diperbarui.find((item) => String(item.id) === String(idUbah));
  }

  const id = daftar.length
    ? Math.max(...daftar.map((item) => Number(item.id))) + 1
    : 1;
  const nomorKode = daftar.reduce((nomorTerbesar, item) => {
    const nomor = Number(item.kode?.replace("TL-", ""));
    return Number.isNaN(nomor) ? nomorTerbesar : Math.max(nomorTerbesar, nomor);
  }, 0) + 1;
  const tindakLanjut = {
    ...dataBaru,
    id,
    kode: `TL-${String(nomorKode).padStart(3, "0")}`,
    status: "Belum dimulai",
  };

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([tindakLanjut, ...daftar]),
  );
  return tindakLanjut;
}
