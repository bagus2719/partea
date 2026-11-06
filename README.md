# Partea & Dimsum Mamma Malang 🍵🥟

Website profil bisnis dan pemesanan online untuk **Partea** (The Part Of Tea That Makes You Feel Like A Party) dan **Dimsum Mamma** yang berlokasi di Lowokwaru, Kota Malang.

Website ini menyajikan katalog menu lengkap minuman teh, kopi, milk tea, minuman buah segar, dan aneka olahan dimsum lezat, dilengkapi fitur keranjang belanja interaktif yang terhubung langsung ke pemesanan via WhatsApp.

---

## 🚀 Fitur Utama

- **Katalog Produk Dinamis**:
  - Data produk dimuat dari file data [`products.json`](file:///c:/Users/bagus/Documents/Project/partea/products.json).
  - Filter kategori instan (Semua Kategori, *Fruity Series*, *Milk Tea*, *Jasmine Tea*, *Coffee*, dan *Dimsum*).
  - Menampilkan gambar, nama varian, dan harga resmi per porsi/cup.
  - Memiliki mekanisme *fallback* otomatis sehingga katalog tetap dapat berjalan lancar saat dibuka langsung via protokol lokal (`file://`).

- **Keranjang Belanja (*Shopping Cart*)**:
  - Penyimpanan data keranjang persisten di peramban menggunakan `localStorage`.
  - Indikator jumlah item secara *real-time* pada ikon navigasi.
  - Penyesuaian kuantitas pesanan (+ / -), subtotal otomatis, dan total tagihan berformat mata uang Rupiah (`id-ID`).
  - Hapus item individual serta tombol **Kosongkan Keranjang** dengan dialog konfirmasi.
  - Tombol **Tambah Menu Lain** untuk memudahkan navigasi belanja kembali.

- **Integrasi Pemesanan WhatsApp**:
  - Tombol **Pesan via WhatsApp** merangkum semua daftar pesanan, jumlah, rincian harga, dan total pembayaran secara rapi ke pesan WhatsApp otomatis menuju nomor kedai (+62 895-2335-2302).

- **UI & UX Interaktif**:
  - **Custom Toast Notification**: Pesan status elegan (hijau untuk sukses, biru untuk info, merah untuk gagal) tanpa *pop-up alert* browser bawaan.
  - **Modal Konfirmasi Custom**: Konfirmasi interaktif untuk tindakan krusial seperti menghapus item atau checkout.
  - **Navigasi Responsif**: Menu *hamburger* yang nyaman diakses dari smartphone, tablet, maupun desktop.
  - **Active Link Highlighting**: Menandai halaman aktif secara otomatis di menu navigasi.
  - **Smooth Scroll to Top**: Tombol kembali ke atas halaman dengan animasi halus.

- **Optimasi SEO & Performa**:
  - Tag meta lengkap (deskripsi, canonical link, OpenGraph, Twitter Cards).
  - File indeks mesin pencari [`sitemap.xml`](file:///c:/Users/bagus/Documents/Project/partea/sitemap.xml) dan [`robots.txt`](file:///c:/Users/bagus/Documents/Project/partea/robots.txt).
  - Pemuatan gambar hemat kuota dengan atribut `loading="lazy"` dan penanganan *error fallback* gambar.

---

## 📁 Struktur Direktori

```text
partea/
├── css/
│   └── style.css            # Berkas CSS utama (layout, variabel, komponen, responsivitas)
├── js/
│   └── script.js            # Logika keranjang, katalog produk, modal, navigasi, dan toast
├── images/                  # Aset visual (logo, produk, background, galeri, ikon)
│   ├── partea-logo.png
│   ├── background-partea.png
│   ├── product-*.png
│   └── dimsum-*.png
├── index.html               # Halaman Beranda (Hero Banner & Pengenalan Brand)
├── about.html               # Halaman Tentang Partea & Keunggulan Produk
├── products.html            # Halaman Katalog Produk & Menu Pilihan
├── cart.html                # Halaman Keranjang Belanja & Checkout WhatsApp
├── contact.html             # Halaman Kontak, Form Pesan, dan Info Jam Operasional
├── testimonials.html        # Halaman Testimoni & Galeri Kedai
├── products.json            # Basis data produk (JSON)
├── robots.txt               # Panduan perayapan bot mesin pencari
├── sitemap.xml              # Peta situs XML untuk SEO
└── README.md                # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan Secara Lokal

Website ini dibangun menggunakan teknologi web statis murni (**HTML5**, **CSS3**, dan **Vanilla JavaScript**) tanpa dependensi build tools yang rumit.

### Opsi 1: Menggunakan Ekstensi VS Code Live Server (Direkomendasikan)
1. Buka folder proyek ini di Visual Studio Code.
2. Pasang ekstensi **Live Server** (oleh Ritwick Dey).
3. Klik kanan pada file [`index.html`](file:///c:/Users/bagus/Documents/Project/partea/index.html) lalu pilih **"Open with Live Server"**.
4. Website akan terbuka di peramban pada alamat `http://127.0.0.1:5500`.

### Opsi 2: Menggunakan Python
Jika Anda memiliki Python terinstal, jalankan perintah berikut di terminal:
```bash
# Python 3.x
python -m http.server 8000
```
Buka peramban di `http://localhost:8000`.

### Opsi 3: Menggunakan Node.js
```bash
npx serve .
# atau
npx http-server .
```

### Opsi 4: Buka Langsung File HTML
Anda juga dapat langsung mengklik dua kali file [`index.html`](file:///c:/Users/bagus/Documents/Project/partea/index.html) di File Explorer. Berkat fallback data lokal yang telah disematkan di [`js/script.js`](file:///c:/Users/bagus/Documents/Project/partea/js/script.js), fitur katalog produk tetap dapat berjalan normal.

---

## ⚙️ Kustomisasi & Pengaturan

### 1. Menambah atau Mengubah Produk
Edit file [`products.json`](file:///c:/Users/bagus/Documents/Project/partea/products.json) dengan struktur berikut:
```json
{
  "id": "nama-produk-unik",
  "name": "Nama Produk Lengkap",
  "price": 15000,
  "category": "dimsum",
  "imageSrc": "images/dimsum-ayam.png",
  "altText": "Deskripsi Gambar"
}
```
*Pilihan kategori yang didukung: `fruity`, `milk-tea`, `jasmine-tea`, `coffee`, `dimsum`.*

### 2. Mengubah Nomor WhatsApp Tujuan Checkout
Buka file [`js/script.js`](file:///c:/Users/bagus/Documents/Project/partea/js/script.js) dan ubah variabel `whatsAppNumber`:
```javascript
const whatsAppNumber = "6289523352302"; // Format internasional tanpa simbol '+'
```

---

## 📍 Informasi Kedai

- **Alamat**: Jl. Bendungan Sutami No.15, Sumbersari, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145
- **WhatsApp**: [+62 895-2335-2302](https://wa.me/6289523352302)
- **Email**: [dimsummamma@gmail.com](mailto:dimsummamma@gmail.com)
- **Instagram**: [@dimsum.mamma](https://www.instagram.com/dimsum.mamma)
- **TikTok**: [@dimsum.mamma](https://www.tiktok.com/@dimsum.mamma)

---

## 📄 Lisensi

© Dimsum Mamma & Partea Malang. Hak cipta dilindungi undang-undang.

