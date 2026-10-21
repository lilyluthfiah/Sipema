import "./PenggunaPage.css";
import { useEffect, useMemo, useState } from "react";

const DIVISI_LIST = [
  "Umum",
  "Sekretaris",
  "Teknologi Informasi",
  "Keuangan",
  "HRD",
  "Operasional",
];

const PERAN_LIST = ["Admin", "Sekretaris", "Karyawan"];

const FILTER_PERAN = ["Semua peran", ...PERAN_LIST];

const DATA_AWAL = [
  { id: 1, nama: "Rina Marlina", username: "rina.marlina", divisi: "Sekretariat", peran: "Admin" },
  { id: 2, nama: "Budi Santoso", username: "budi.santoso", divisi: "Teknologi Informasi", peran: "Karyawan" },
  { id: 3, nama: "Siti Rahmawati", username: "siti.rahmawati", divisi: "Sekretariat", peran: "Sekretaris" },
  { id: 4, nama: "Andi Prasetyo", username: "andi.prasetyo", divisi: "Operasional", peran: "Karyawan" },
  { id: 5, nama: "Dewi Lestari", username: "dewi.lestari", divisi: "Keuangan", peran: "Karyawan" },
  { id: 6, nama: "Fajar Nugroho", username: "fajar.nugroho", divisi: "HRD", peran: "Karyawan" },
  { id: 7, nama: "Maya Puspita", username: "maya.puspita", divisi: "Umum", peran: "Karyawan" },
  { id: 8, nama: "Rizky Ananda", username: "rizky.ananda", divisi: "Teknologi Informasi", peran: "Karyawan" },
];

const FORM_AWAL = {
  nama: "",
  divisi: "",
  username: "",
  sandi: "",
  peran: "Karyawan",
};

function inisial(nama) {
  return (nama || "").trim().charAt(0).toUpperCase() || "?";
}

export default function PenggunaPage() {
  const [mounted, setMounted] = useState(false);
  const [daftarPengguna, setDaftarPengguna] = useState(DATA_AWAL);
  const [tampilan, setTampilan] = useState("tabel");
  const [form, setForm] = useState(FORM_AWAL);
  const [idEdit, setIdEdit] = useState(null);
  const [cari, setCari] = useState("");
  const [peranFilter, setPeranFilter] = useState("Semua peran");
  const [pesanError, setPesanError] = useState("");
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);
  const [notifikasi, setNotifikasi] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!notifikasi) return undefined;
    const timer = setTimeout(() => setNotifikasi(""), 2600);
    return () => clearTimeout(timer);
  }, [notifikasi]);

  const daftarTersaring = useMemo(() => {
    const kunci = cari.trim().toLowerCase();
    return daftarPengguna.filter((item) => {
      const cocokCari =
        kunci === "" ||
        item.nama.toLowerCase().includes(kunci) ||
        item.username.toLowerCase().includes(kunci);
      const cocokPeran = peranFilter === "Semua peran" || item.peran === peranFilter;
      return cocokCari && cocokPeran;
    });
  }, [daftarPengguna, cari, peranFilter]);

  const bukaTambah = () => {
    setIdEdit(null);
    setForm(FORM_AWAL);
    setPesanError("");
    setTampilan("form");
  };

  const bukaUbah = (item) => {
    setIdEdit(item.id);
    setForm({
      nama: item.nama,
      divisi: item.divisi,
      username: item.username,
      sandi: "",
      peran: item.peran,
    });
    setPesanError("");
    setTampilan("form");
  };

  const kembaliKeTabel = () => {
    setTampilan("tabel");
    setIdEdit(null);
    setForm(FORM_AWAL);
    setPesanError("");
  };

  const ubahField = (field) => (event) => {
    const nilai = event.target.value;
    setForm((prev) => ({ ...prev, [field]: nilai }));
    if (pesanError) setPesanError("");
  };

  const handleSimpan = (event) => {
    event.preventDefault();

    const nama = form.nama.trim();
    const username = form.username.trim();

    if (!nama) {
      setPesanError("Nama lengkap wajib diisi.");
      return;
    }
    if (!username) {
      setPesanError("Username wajib diisi.");
      return;
    }
    const usernameTerpakai = daftarPengguna.some(
      (item) => item.username.toLowerCase() === username.toLowerCase() && item.id !== idEdit
    );
    if (usernameTerpakai) {
      setPesanError("Username sudah dipakai pengguna lain.");
      return;
    }

    if (idEdit === null) {
      setDaftarPengguna((prev) => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1,
          nama,
          username,
          divisi: form.divisi.trim() || "Umum",
          peran: form.peran,
        },
      ]);
      setNotifikasi(`Pengguna "${nama}" berhasil ditambahkan.`);
    } else {
      setDaftarPengguna((prev) =>
        prev.map((item) =>
          item.id === idEdit
            ? {
                ...item,
                nama,
                username,
                divisi: form.divisi.trim() || item.divisi,
                peran: form.peran,
              }
            : item
        )
      );
      setNotifikasi(`Data pengguna "${nama}" berhasil diperbarui.`);
    }

    kembaliKeTabel();
  };

  const eksekusiHapus = () => {
    if (!konfirmasiHapus) return;
    setDaftarPengguna((prev) => prev.filter((item) => item.id !== konfirmasiHapus.id));
    setNotifikasi(`Pengguna "${konfirmasiHapus.nama}" berhasil dihapus.`);
    setKonfirmasiHapus(null);
  };

  const opsiPeran = useMemo(() => {
    if (idEdit !== null && form.peran === "Admin") {
      return PERAN_LIST;
    }
    return PERAN_LIST.filter((peran) => peran !== "Admin");
  }, [idEdit, form.peran]);

  const adminSedangDiedit = idEdit !== null && form.peran === "Admin";

  return (
    <div className="pengguna-page">
      {tampilan === "tabel" ? (
        <>
          <header
            className={`notula-welcome pengguna-welcome${
              mounted ? " fade-in-up" : ""
            }`}
            style={{ animationDelay: "0ms" }}
          >
            <div>
              <h1>Data pengguna</h1>
            </div>
            <button
              type="button"
              className="pengguna-btn-primary interactive-btn"
              onClick={bukaTambah}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tambah pengguna
            </button>
          </header>

          <section
            className={`notula-panel${mounted ? " fade-in-up" : ""}`}
            style={{ animationDelay: "80ms" }}
          >
            <div className="pengguna-toolbar">
              <div className="pengguna-search">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  value={cari}
                  onChange={(event) => setCari(event.target.value)}
                  placeholder="Cari nama atau username"
                  aria-label="Cari nama atau username"
                />
              </div>

              <div className="pengguna-filter">
                <select
                  className="pengguna-select"
                  value={peranFilter}
                  onChange={(event) => setPeranFilter(event.target.value)}
                  aria-label="Filter peran pengguna"
                >
                  {FILTER_PERAN.map((peran) => (
                    <option key={peran} value={peran}>
                      {peran}
                    </option>
                  ))}
                </select>
                <span className="pengguna-total-badge">
                  {daftarTersaring.length} pengguna
                </span>
              </div>
            </div>

            {daftarTersaring.length === 0 ? (
              <div className="pengguna-kosong">
                <div className="placeholder-symbol">?</div>
                <h3>Pengguna tidak ditemukan</h3>
                <p>Coba ubah kata kunci pencarian atau filter peran.</p>
              </div>
            ) : (
              <div className="pengguna-table-wrap">
                <table className="pengguna-table">
                  <thead>
                    <tr>
                      <th scope="col">Pengguna</th>
                      <th scope="col">Divisi</th>
                      <th scope="col">Peran</th>
                      <th scope="col" className="pengguna-col-aksi">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarTersaring.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="pengguna-identitas">
                            <span
                              className={`pengguna-avatar${
                                item.peran === "Admin" ? " admin" : ""
                              }`}
                              aria-hidden="true"
                            >
                              {inisial(item.nama)}
                            </span>
                            <span className="pengguna-identitas-teks">
                              <strong>{item.nama}</strong>
                              <small>@{item.username}</small>
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="pengguna-divisi">{item.divisi}</span>
                        </td>
                        <td>
                          <span
                            className={`pengguna-peran-badge peran-${item.peran.toLowerCase()}`}
                          >
                            {item.peran}
                          </span>
                        </td>
                        <td className="pengguna-col-aksi">
                          <div className="pengguna-aksi">
                            <button
                              type="button"
                              className="pengguna-btn-ubah interactive-btn"
                              onClick={() => bukaUbah(item)}
                            >
                              Ubah
                            </button>
                            {item.peran !== "Admin" && (
                              <button
                                type="button"
                                className="pengguna-btn-hapus interactive-btn"
                                onClick={() => setKonfirmasiHapus(item)}
                              >
                                Hapus
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="pengguna-panel-footer">
              <span>
                Menampilkan {daftarTersaring.length} dari {daftarPengguna.length} pengguna
              </span>
            </div>
          </section>
        </>
      ) : (
        <>
          <header
            className={`notula-welcome pengguna-welcome${
              mounted ? " fade-in-up" : ""
            }`}
            style={{ animationDelay: "0ms" }}
          >
            <div>
              <button
                type="button"
                className="pengguna-kembali interactive-btn"
                onClick={kembaliKeTabel}
              >
              </button>
              <h1>Form pengguna</h1>
              <p>
              </p>
            </div>
          </header>

          <section
            className={`notula-panel${mounted ? " fade-in-up" : ""}`}
            style={{ animationDelay: "80ms" }}
          >
            <form className="pengguna-form" onSubmit={handleSimpan} noValidate>
              <div className="pengguna-form-grid">
                <div className="pengguna-field">
                  <label htmlFor="pengguna-nama">Nama lengkap</label>
                  <input
                    id="pengguna-nama"
                    className="pengguna-input"
                    type="text"
                    value={form.nama}
                    onChange={ubahField("nama")}
                    placeholder="Budi Santoso"
                    autoComplete="off"
                  />
                </div>

                <div className="pengguna-field">
                  <label htmlFor="pengguna-divisi">Divisi</label>
                  <input
                    id="pengguna-divisi"
                    className="pengguna-input"
                    type="text"
                    value={form.divisi}
                    onChange={ubahField("divisi")}
                    placeholder="Teknologi Informasi"
                    list="pengguna-daftar-divisi"
                    autoComplete="off"
                  />
                  <datalist id="pengguna-daftar-divisi">
                    {DIVISI_LIST.map((divisi) => (
                      <option key={divisi} value={divisi} />
                    ))}
                  </datalist>
                </div>

                <div className="pengguna-field">
                  <label htmlFor="pengguna-username">Username</label>
                  <input
                    id="pengguna-username"
                    className="pengguna-input"
                    type="text"
                    value={form.username}
                    onChange={ubahField("username")}
                    placeholder="budi.santoso"
                    autoComplete="off"
                  />
                </div>

                <div className="pengguna-field">
                  <label htmlFor="pengguna-sandi">Kata sandi</label>
                  <input
                    id="pengguna-sandi"
                    className="pengguna-input"
                    type="password"
                    value={form.sandi}
                    onChange={ubahField("sandi")}
                    placeholder="Isi kata sandi"
                    autoComplete="new-password"
                  />
                  <small className="pengguna-field-hint">
                    Saat mengubah, kosongkan jika kata sandi tidak diganti.
                  </small>
                </div>
              </div>

              <div className="pengguna-field">
                <label className="pengguna-label-peran">Peran</label>
                <div className="pengguna-peran-list" role="radiogroup" aria-label="Pilih peran pengguna">
                  {opsiPeran.map((peran) => {
                    const terkunci = adminSedangDiedit && peran === "Admin";
                    return (
                      <label
                        key={peran}
                        className={`pengguna-peran-option${
                          form.peran === peran ? " selected" : ""
                        }${terkunci ? " locked" : ""}`}
                      >
                        <input
                          type="radio"
                          name="peran-pengguna"
                          value={peran}
                          checked={form.peran === peran}
                          onChange={ubahField("peran")}
                          disabled={terkunci}
                        />
                        <span className="pengguna-radio" aria-hidden="true" />
                        <span className="pengguna-peran-teks">{peran}</span>
                      </label>
                    );
                  })}
                </div>
                <small className="pengguna-field-hint">
                  {adminSedangDiedit && " Peran admin tidak dapat diubah."}
                </small>
              </div>

              {pesanError && (
                <p className="pengguna-error" role="alert">
                  {pesanError}
                </p>
              )}

              <div className="pengguna-form-footer">
                <button
                  type="button"
                  className="pengguna-btn-batal interactive-btn"
                  onClick={kembaliKeTabel}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="pengguna-btn-primary interactive-btn"
                >
                  Simpan pengguna
                </button>
              </div>
            </form>
          </section>
        </>
      )}

      {konfirmasiHapus && (
        <div
          className="pengguna-modal-backdrop"
          role="presentation"
          onClick={() => setKonfirmasiHapus(null)}
        >
          <div
            className="pengguna-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Konfirmasi hapus pengguna"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pengguna-modal-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <h3>Hapus pengguna?</h3>
            <p>
              Data pengguna <strong>{konfirmasiHapus.nama}</strong> (@
              {konfirmasiHapus.username}) akan dihapus dari daftar ini.
            </p>
            <div className="pengguna-modal-aksi">
              <button
                type="button"
                className="pengguna-btn-batal interactive-btn"
                onClick={() => setKonfirmasiHapus(null)}
              >
                Batal
              </button>
              <button
                type="button"
                className="pengguna-btn-hapus-solid interactive-btn"
                onClick={eksekusiHapus}
              >
                Hapus pengguna
              </button>
            </div>
          </div>
        </div>
      )}

      {notifikasi && (
        <div className="pengguna-toast" role="status">
          <span className="pengguna-toast-dot" aria-hidden="true" />
          {notifikasi}
        </div>
      )}
    </div>
  );
}
