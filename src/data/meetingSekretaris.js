import { DAFTAR_MEETING_AWAL } from "./daftarMeetingData";

const STORAGE_KEY = "sipema.meetings.sekretaris";

const PESERTA_CONTOH = [
  "Budi Santoso",
  "Agus Pratama",
  "Siti Rahmawati",
  "Maya Putri",
  "Rudi Hartono",
  "Dewi Anggraini",
  "Hendra Wijaya",
  "Fajar Nugraha",
  "Nadia Permata",
  "Andi Saputra",
  "Rina Kusuma",
  "Tono Prasetyo",
];

const agendaContoh = (judul) => {
  if (judul === "Rapat Evaluasi Proyek Q3") {
    return [
      "Capaian proyek kuartal ketiga",
      "Kendala dan kebutuhan sumber daya",
      "Rencana kuartal keempat",
    ];
  }
  if (judul === "Koordinasi Anggaran 2027") {
    return [
      "Usulan anggaran divisi",
      "Review proyeksi biaya",
      "Pembagian prioritas anggaran",
    ];
  }
  return ["Pembahasan agenda meeting", "Evaluasi dan tindak lanjut"];
};

function tanggalISO(meeting) {
  if (meeting.tanggalISO) return meeting.tanggalISO;
  const [hari, bulan, tahun] = String(meeting.tanggalLengkap || "").split(" ");
  const nomorBulan = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    Jun: "06",
    Jul: "07",
    Agu: "08",
    Sep: "09",
    Okt: "10",
    Nov: "11",
    Des: "12",
  }[bulan];
  return tahun && nomorBulan
    ? `${tahun}-${nomorBulan}-${String(hari).padStart(2, "0")}`
    : "";
}

function pesertaContoh(meeting) {
  if (Array.isArray(meeting.daftarPeserta)) return meeting.daftarPeserta;
  return PESERTA_CONTOH.slice(
    0,
    Math.min(Number(meeting.peserta) || 5, PESERTA_CONTOH.length),
  );
}

function dokumentasiContoh(meeting) {
  if (Array.isArray(meeting.dokumentasi)) return meeting.dokumentasi;
  if (meeting.id !== 3) return [];
  return [
    { id: "sample-1", nama: "Foto-meeting-1.jpg", ukuran: "1.2 MB" },
    { id: "sample-2", nama: "Foto-meeting-2.jpg", ukuran: "980 KB" },
    { id: "sample-3", nama: "Daftar-hadir.pdf", ukuran: "320 KB" },
    { id: "sample-4", nama: "Materi-paparan.pptx", ukuran: "4.6 MB" },
  ];
}

export function lengkapiMeetingSekretaris(meeting) {
  const [jamMulai = "09:00", jamSelesai = "10:00"] = String(
    meeting.waktu || "09:00–10:00",
  ).split(/[–-]/);

  return {
    ...meeting,
    tanggalISO: tanggalISO(meeting),
    jamMulai: meeting.jamMulai || jamMulai.trim(),
    jamSelesai: meeting.jamSelesai || jamSelesai.trim(),
    agenda: Array.isArray(meeting.agenda)
      ? meeting.agenda
      : agendaContoh(meeting.judul),
    daftarPeserta: pesertaContoh(meeting),
    notulen: meeting.notulen || { pembahasan: "", keputusan: "" },
    tindakLanjut: Array.isArray(meeting.tindakLanjut)
      ? meeting.tindakLanjut
      : meeting.id === 3
        ? [
            {
              id: "tl-1",
              deskripsi: "Susun revisi anggaran divisi IT",
              pic: "Budi Santoso",
              deadline: "14 Okt 2026",
              status: "Proses",
            },
            {
              id: "tl-2",
              deskripsi: "Kirim rekap vendor ke Keuangan",
              pic: "Agus Pratama",
              deadline: "9 Okt 2026",
              status: "Belum dimulai",
            },
          ]
        : [],
    dokumentasi: dokumentasiContoh(meeting),
  };
}

export function ambilMeetingSekretaris() {
  const tersimpan = window.localStorage.getItem(STORAGE_KEY);
  const daftar = tersimpan
    ? JSON.parse(tersimpan)
    : DAFTAR_MEETING_AWAL;
  return daftar.map(lengkapiMeetingSekretaris);
}

export function simpanDaftarMeetingSekretaris(daftar) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(daftar));
}

export function simpanMeetingSekretaris(meeting) {
  const daftar = ambilMeetingSekretaris();
  const sudahAda = daftar.some((item) => item.id === meeting.id);
  const tersimpan = lengkapiMeetingSekretaris({
    ...meeting,
    peserta: meeting.daftarPeserta.length,
  });
  const diperbarui = sudahAda
    ? daftar.map((item) => (item.id === meeting.id ? tersimpan : item))
    : [tersimpan, ...daftar];

  simpanDaftarMeetingSekretaris(diperbarui);
  return tersimpan;
}

export function hapusMeetingSekretaris(id) {
  const daftar = ambilMeetingSekretaris().filter((meeting) => meeting.id !== id);
  simpanDaftarMeetingSekretaris(daftar);
}

export function formatTanggalMeeting(tanggalISOValue) {
  if (!tanggalISOValue) return "";
  const [tahun, bulan, hari] = tanggalISOValue.split("-");
  const namaBulan = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "Mei",
    "06": "Jun",
    "07": "Jul",
    "08": "Agu",
    "09": "Sep",
    "10": "Okt",
    "11": "Nov",
    "12": "Des",
  }[bulan];
  return `${Number(hari)} ${namaBulan} ${tahun}`;
}

export function ukuranFile(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
