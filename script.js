/* ============================================================
   EDIT BAGIAN INI untuk menambah proyek / tugas kamu.
   - category : nama kategori (otomatis jadi tombol filter)
   - semester : misal "Semester 1"
   - repo / demo / laporan : isi dengan link, atau kosongkan ("")
   - placeholder: true  -> kartu bergaris putus-putus (contoh)
     hapus baris itu kalau proyeknya sudah asli
   ============================================================ */
const PROJECTS = [
  {
    title: "Contoh: Rangkaian LED Berkedip (555)",
    desc: "Ganti dengan deskripsi proyekmu: tujuan, komponen, dan hasil yang didapat.",
    category: "Elektronika Dasar",
    semester: "Semester 1",
    tags: ["IC 555", "Breadboard", "Proteus"],
    repo: "", demo: "", laporan: "",
    placeholder: true
  },
  {
    title: "Contoh: Program Arduino Sensor Suhu",
    desc: "Tulis ringkasan program, sensor yang dipakai, dan cara menjalankannya.",
    category: "Mikrokontroler",
    semester: "Semester 1",
    tags: ["Arduino", "C++", "Sensor"],
    repo: "", demo: "", laporan: "",
    placeholder: true
  },
  {
    title: "Contoh: Laporan Praktikum Rangkaian Listrik",
    desc: "Unggah laporan (PDF) dan data hasil pengukuran agar bisa dipelajari teman-teman.",
    category: "Praktikum",
    semester: "Semester 1",
    tags: ["Laporan", "Pengukuran"],
    repo: "", demo: "", laporan: "",
    placeholder: true
  },
  {
    title: "Website Portofolio Ini",
    desc: "Website open source tempat saya mengumpulkan semua proyek dan tugas kuliah. Kodenya bebas dipakai sebagai template.",
    category: "Web",
    semester: "Semester 1",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: "", demo: "", laporan: ""
  }
];

/* Kontak: isi link aslimu. Yang kosong ("") tidak akan ditampilkan. */
const CONTACTS = [
  { label: "GitHub",    icon: "🐙", url: "" },   // contoh: https://github.com/usernamekamu
  { label: "Instagram", icon: "📸", url: "" },   // contoh: https://instagram.com/usernamekamu
  { label: "Email",     icon: "✉️", url: "" },   // contoh: mailto:emailkamu@gmail.com
  { label: "WhatsApp",  icon: "💬", url: "" }    // contoh: https://wa.me/62812xxxxxxx
];

/* Galeri */
const GALLERY = [
  { src: "assets/img/kampus-1.jpg", alt: "Berdiri di area kampus Politeknik Negeri Padang" },
  { src: "assets/img/cafe-1.jpg",   alt: "Berkumpul bersama teman di kafe" },
  { src: "assets/img/cermin.jpg",   alt: "Foto di depan cermin" },
  { src: "assets/img/cafe-2.jpg",   alt: "Pose dua jari di kafe" },
  { src: "assets/img/kampus-2.jpg", alt: "Dengan seragam di area kampus" },
  { src: "assets/img/cafe-3.jpg",   alt: "Tersenyum dengan tangan menyilang" }
];

/* ---------------- kode di bawah ini tidak perlu diubah ---------------- */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Proyek + filter
const cats = ["Semua", ...new Set(PROJECTS.map(p => p.category))];
let active = "Semua";

function renderFilters() {
  $("#filters").innerHTML = cats.map(c =>
    `<button class="filter ${c === active ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
}
function renderProjects() {
  const list = PROJECTS.filter(p => active === "Semua" || p.category === active);
  $("#projects").innerHTML = list.map(p => {
    const links = [
      p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Kode ↗</a>`,
      p.demo && `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Demo ↗</a>`,
      p.laporan && `<a href="${esc(p.laporan)}" target="_blank" rel="noopener">Laporan ↗</a>`
    ].filter(Boolean).join("");
    return `<article class="project ${p.placeholder ? "placeholder" : ""}">
      <div class="top mono"><span class="cat">${esc(p.category)}</span><span>${esc(p.semester)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      ${links ? `<div class="links">${links}</div>` : ""}
    </article>`;
  }).join("");
}
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest(".filter"); if (!b) return;
  active = b.dataset.cat; renderFilters(); renderProjects();
});

// Galeri + lightbox
$("#gallery").innerHTML = GALLERY.map((g, i) =>
  `<button data-i="${i}" aria-label="Perbesar: ${esc(g.alt)}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"></button>`).join("");
const lb = $("#lightbox");
function openLB(src, alt) { lb.querySelector("img").src = src; lb.querySelector("img").alt = alt || ""; lb.hidden = false; }
$("#gallery").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  const g = GALLERY[b.dataset.i]; openLB(g.src, g.alt);
});
document.querySelector("[data-zoom]")?.addEventListener("click", (e) => openLB(e.target.src, e.target.alt));
lb.addEventListener("click", () => (lb.hidden = true));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });

// Kontak
const shown = CONTACTS.filter(c => c.url);
$("#contact").innerHTML = shown.length
  ? shown.map(c => `<a href="${esc(c.url)}" target="_blank" rel="noopener"><span>${c.icon}</span>${esc(c.label)}</a>`).join("")
  : `<p class="note mono">Belum ada kontak. Isi array <code>CONTACTS</code> di <code>script.js</code>.</p>`;

$("#year").textContent = new Date().getFullYear();
renderFilters(); renderProjects();
