/* ===============================================
   IKA BUNAYYA — script.js
   =============================================== */
'use strict';

/* ─────────────────────────────────────────────
   1. PRELOADER
───────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
  }, 1600);
});

/* ─────────────────────────────────────────────
   2. NAVBAR
───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─────────────────────────────────────────────
   3. MOBILE DRAWER
───────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');
const drawerOverlay = document.getElementById('drawerOverlay');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('show');
  navToggle.classList.add('open');
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('show');
  navToggle.classList.remove('open');
}

navToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

document
  .querySelectorAll('.drawer-link')
  .forEach((l) => l.addEventListener('click', closeDrawer));

/* ─────────────────────────────────────────────
   4. HERO CANVAS (floating geometric particles)
───────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function mkParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 18 + 6,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.008,
      alpha: Math.random() * 0.18 + 0.04,
      type: Math.floor(Math.random() * 3), // 0=triangle 1=diamond 2=circle
    };
  }

  particles = Array.from({ length: 55 }, mkParticle);

  function drawTriangle(x, y, s, r) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(r);
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.866, s * 0.5);
    ctx.lineTo(-s * 0.866, s * 0.5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  function drawDiamond(x, y, s, r) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(r);
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s, 0);
    ctx.lineTo(0, s);
    ctx.lineTo(-s, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#c9a84c';
    ctx.lineWidth = 0.8;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;
      if (p.x < -p.size) p.x = W + p.size;
      if (p.x > W + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = H + p.size;
      if (p.y > H + p.size) p.y = -p.size;

      ctx.globalAlpha = p.alpha;
      if (p.type === 0) drawTriangle(p.x, p.y, p.size, p.rot);
      else if (p.type === 1) drawDiamond(p.x, p.y, p.size, p.rot);
      else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ─────────────────────────────────────────────
   5. SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll('[data-reveal]')
  .forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────────────────────
   6. COUNTER ANIMATION
───────────────────────────────────────────── */
function animateCount(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('id-ID');
    if (current >= target) clearInterval(timer);
  }, 35);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter').forEach((el) => {
          animateCount(el, parseInt(el.dataset.target));
        });
        entry.target.querySelectorAll('.hstat-num').forEach((el) => {
          if (!el.dataset.animated) {
            el.dataset.animated = true;
            animateCount(el, parseInt(el.dataset.target));
          }
        });
      }
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll('.prestasi, .hero')
  .forEach((s) => counterObserver.observe(s));

/* ─────────────────────────────────────────────
   7. ANGKATAN GRID
───────────────────────────────────────────── */
(function buildAngkatan() {
  const grid = document.getElementById('angkatanGrid');
  if (!grid) return;
  const data = [
    { year: 2007, count: 120 },
    { year: 2008, count: 135 },
    { year: 2009, count: 148 },
    { year: 2010, count: 160 },
    { year: 2011, count: 172 },
    { year: 2012, count: 185 },
    { year: 2013, count: 190 },
    { year: 2014, count: 198 },
    { year: 2015, count: 210 },
    { year: 2016, count: 205 },
    { year: 2017, count: 215 },
    { year: 2018, count: 208 },
    { year: 2019, count: 220 },
    { year: 2020, count: 198 },
    { year: 2021, count: 195 },
    { year: 2022, count: 188 },
    { year: 2023, count: 156 },
    { year: 2024, count: 92 },
  ];

  data.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'ang-card';
    card.setAttribute('data-reveal', 'up');
    card.style.setProperty('--delay', `${i * 0.04}s`);
    card.innerHTML = `
      <span class="ang-num">Angkatan</span>
      <div class="ang-year">'${String(d.year).slice(2)}</div>
      <div class="ang-count">${d.count} alumni</div>
    `;
    card.addEventListener('click', () => {
      showAngkatanModal(d);
    });
    grid.appendChild(card);
  });

  // Observe new cards
  document
    .querySelectorAll('.ang-card[data-reveal]')
    .forEach((el) => revealObserver.observe(el));
})();

/* ─────────────────────────────────────────────
   8. ANGKATAN MODAL (simple)
───────────────────────────────────────────── */
function showAngkatanModal(d) {
  // remove existing
  const old = document.getElementById('angModal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'angModal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(10,25,16,0.85);
    display:flex;align-items:center;justify-content:center;
    z-index:2000;backdrop-filter:blur(6px);
    animation:fadeIn2 0.25s ease;
  `;
  const style = document.createElement('style');
  style.textContent = '@keyframes fadeIn2{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(style);

  modal.innerHTML = `
    <div style="background:#112e1f;border:1px solid rgba(201,168,76,0.3);border-radius:20px;
                padding:2.5rem;max-width:440px;width:90%;position:relative;
                box-shadow:0 30px 80px rgba(0,0,0,0.5);">
      <button onclick="this.closest('#angModal').remove()"
              style="position:absolute;top:1rem;right:1rem;background:rgba(201,168,76,0.1);
                     border:1px solid rgba(201,168,76,0.2);border-radius:50%;
                     width:32px;height:32px;color:#c9a84c;font-size:1rem;cursor:pointer;">✕</button>
      <div style="font-family:'Amiri',serif;font-size:2.5rem;color:rgba(201,168,76,0.15);
                  line-height:1;margin-bottom:0.5rem;">بنية</div>
      <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.18em;
                  text-transform:uppercase;color:#c9a84c;margin-bottom:0.4rem;">Angkatan</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;
                 color:#fff;margin-bottom:0.2rem;">${d.year}</h2>
      <p  style="font-size:0.8rem;color:rgba(255,255,255,0.5);margin-bottom:1.8rem;">${d.count} alumni terdaftar</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.8rem;">
        ${[
          ['👥', 'Total Alumni', d.count + ' orang'],
          ['🏙️', 'Kota Aktif', Math.floor(d.count / 20) + ' kota'],
          ['📅', 'Reuni Terakhir', '2023'],
          ['💼', 'Grup WhatsApp', 'Aktif'],
        ]
          .map(
            ([icon, label, val]) => `
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.15);
                      border-radius:10px;padding:1rem;text-align:center;">
            <div style="font-size:1.5rem;margin-bottom:0.4rem;">${icon}</div>
            <div style="font-size:0.62rem;font-weight:700;letter-spacing:0.1em;
                        text-transform:uppercase;color:rgba(201,168,76,0.6);margin-bottom:2px;">${label}</div>
            <div style="font-size:0.88rem;font-weight:600;color:#fff;">${val}</div>
          </div>
        `,
          )
          .join('')}
      </div>
      <button onclick="this.closest('#angModal').remove()"
              style="width:100%;padding:13px;background:linear-gradient(135deg,#c9a84c,#e0c472);
                     color:#0d2b1e;font-weight:700;font-size:0.88rem;border-radius:10px;
                     cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
        Hubungi Koordinator Angkatan
      </button>
    </div>
  `;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

/* ─────────────────────────────────────────────
   9. KEGIATAN
───────────────────────────────────────────── */
const kegiatanData = [
  {
    category: 'reuni',
    emoji: '🎊',
    bg: 'linear-gradient(135deg,#1a4731,#2a6647)',
    date: '15 Desember 2024',
    title: 'Grand Reuni IKA Bunayya 2024',
    desc: 'Reuni akbar yang mempertemukan ribuan alumni dari seluruh Indonesia dalam satu momen bersejarah.',
    badge: 'Reuni',
    badgeClass: 'cat-reuni',
  },
  {
    category: 'sosial',
    emoji: '🍱',
    bg: 'linear-gradient(135deg,#093028,#1a6644)',
    date: '10 November 2024',
    title: 'Bazar & Bakti Sosial Ramadan',
    desc: 'Program berbagi untuk masyarakat sekitar sekolah berupa sembako dan beasiswa mini.',
    badge: 'Sosial',
    badgeClass: 'cat-sosial',
  },
  {
    category: 'beasiswa',
    emoji: '🎓',
    bg: 'linear-gradient(135deg,#0f2040,#1a3a6a)',
    date: '01 Oktober 2024',
    title: 'Peluncuran Beasiswa Alumni 2025',
    desc: 'Pembukaan pendaftaran beasiswa untuk 50 siswa berprestasi dari keluarga kurang mampu.',
    badge: 'Beasiswa',
    badgeClass: 'cat-beasiswa',
  },
  {
    category: 'sosial',
    emoji: '💼',
    bg: 'linear-gradient(135deg,#2a1a0f,#6a4020)',
    date: '20 September 2024',
    title: 'Alumni Job Fair & Career Talk',
    desc: 'Pameran karir dan seminar motivasi yang menghubungkan alumni dengan peluang kerja terbaik.',
    badge: 'Sosial',
    badgeClass: 'cat-sosial',
  },
  {
    category: 'reuni',
    emoji: '⚽',
    bg: 'linear-gradient(135deg,#0d1a0d,#1a4020)',
    date: '5 Agustus 2024',
    title: 'Turnamen Olahraga Alumni Cup',
    desc: 'Kompetisi futsal, badminton, dan voli yang mempererat silaturahmi antar angkatan.',
    badge: 'Reuni',
    badgeClass: 'cat-reuni',
  },
  {
    category: 'beasiswa',
    emoji: '📖',
    bg: 'linear-gradient(135deg,#0a0a2e,#1a1a5a)',
    date: '12 Juli 2024',
    title: 'Workshop Beasiswa Luar Negeri',
    desc: 'Bimbingan intensif persiapan beasiswa ke kampus-kampus terbaik dunia bagi alumni muda.',
    badge: 'Beasiswa',
    badgeClass: 'cat-beasiswa',
  },
];

function renderKegiatan(filter) {
  const grid = document.getElementById('kegiatanGrid');
  grid.innerHTML = '';
  const filtered =
    filter === 'semua'
      ? kegiatanData
      : kegiatanData.filter((k) => k.category === filter);
  filtered.forEach((k, i) => {
    const card = document.createElement('div');
    card.className = 'keg-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="keg-img" style="background:${k.bg}">
        <div class="keg-emoji">${k.emoji}</div>
        <span class="keg-cat-badge ${k.badgeClass}">${k.badge}</span>
      </div>
      <div class="keg-body">
        <div class="keg-date">${k.date}</div>
        <h4>${k.title}</h4>
        <p>${k.desc}</p>
        <a href="#" class="keg-link">Baca selengkapnya →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderKegiatan('semua');

document.querySelectorAll('.ktab').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.ktab')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderKegiatan(btn.dataset.tab);
  });
});

/* ─────────────────────────────────────────────
   10. GALERI
───────────────────────────────────────────── */
const galeriData = [
  {
    emoji: '🎓',
    label: 'Wisuda Angkatan 2023',
    bg: 'linear-gradient(135deg,#0d2b1e,#1a4731)',
  },
  {
    emoji: '🏆',
    label: 'Juara Kompetisi Nasional',
    bg: 'linear-gradient(135deg,#2a1a00,#6a4400)',
  },
  {
    emoji: '🤲',
    label: 'Bakti Sosial Bersama',
    bg: 'linear-gradient(135deg,#0a2a20,#145c38)',
  },
  {
    emoji: '🎊',
    label: 'Grand Reuni 2023',
    bg: 'linear-gradient(135deg,#1a0a2e,#3a1560)',
  },
  {
    emoji: '⚽',
    label: 'Alumni Cup 2024',
    bg: 'linear-gradient(135deg,#0a1e0a,#1a4020)',
  },
  {
    emoji: '📚',
    label: 'Workshop Beasiswa',
    bg: 'linear-gradient(135deg,#0e1e30,#1a3a5a)',
  },
  {
    emoji: '🌙',
    label: 'Buka Puasa Bersama',
    bg: 'linear-gradient(135deg,#1e0a0a,#4a1010)',
  },
  {
    emoji: '🌱',
    label: 'Penanaman 1000 Pohon',
    bg: 'linear-gradient(135deg,#0a1a0a,#1a3a1a)',
  },
];

const galGrid = document.getElementById('galeriGrid');
galeriData.forEach((g) => {
  const item = document.createElement('div');
  item.className = 'gal-item';
  item.style.background = g.bg;
  item.innerHTML = `
    ${g.emoji}
    <div class="gal-overlay"><p>${g.label}</p></div>
  `;
  galGrid.appendChild(item);
});

/* ─────────────────────────────────────────────
   11. TESTIMONY SLIDER
───────────────────────────────────────────── */
const testimonyCards = document.querySelectorAll('.testimony-card');
const tdots = document.querySelectorAll('.tdot');
let tIndex = 0;

function showTestimony(i) {
  testimonyCards.forEach((c, idx) => c.classList.toggle('active', idx === i));
  tdots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  tIndex = i;
}

document
  .getElementById('tNext')
  .addEventListener('click', () =>
    showTestimony((tIndex + 1) % testimonyCards.length),
  );
document
  .getElementById('tPrev')
  .addEventListener('click', () =>
    showTestimony((tIndex - 1 + testimonyCards.length) % testimonyCards.length),
  );
tdots.forEach((d, i) => d.addEventListener('click', () => showTestimony(i)));
setInterval(() => showTestimony((tIndex + 1) % testimonyCards.length), 5500);

/* ─────────────────────────────────────────────
   12. DAFTAR FORM
───────────────────────────────────────────── */
document.getElementById('daftarForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.df-submit');
  const text = btn.querySelector('.btn-text');
  const loading = btn.querySelector('.btn-loading');
  text.style.display = 'none';
  loading.style.display = 'inline';
  btn.disabled = true;

  setTimeout(() => {
    text.style.display = 'inline';
    loading.style.display = 'none';
    btn.disabled = false;
    document.getElementById('dfSuccess').style.display = 'block';
    e.target.reset();
    setTimeout(
      () => (document.getElementById('dfSuccess').style.display = 'none'),
      5000,
    );
  }, 1800);
});

/* ─────────────────────────────────────────────
   13. BACK TO TOP
───────────────────────────────────────────── */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 600);
});
backTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' }),
);

/* ─────────────────────────────────────────────
   14. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  const y = window.scrollY + 100;
  sections.forEach((sec) => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach((l) => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveNav);

/* ─────────────────────────────────────────────
   15. SMOOTH ANCHOR LINKS
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─────────────────────────────────────────────
   16. PARALLAX HERO CALLIGRAPHY
───────────────────────────────────────────── */
const calligraphy = document.querySelector('.hero-calligraphy');
window.addEventListener('scroll', () => {
  if (calligraphy) {
    const y = window.scrollY;
    calligraphy.style.transform = `translateY(calc(-50% + ${y * 0.22}px))`;
  }
});

/* ─────────────────────────────────────────────
   17. CARD HOVER GLOW (pointer follow)
───────────────────────────────────────────── */
document
  .querySelectorAll('.pengurus-card, .keg-card, .kontak-card')
  .forEach((card) => {
    const glow = document.createElement('div');
    glow.style.cssText = `
    position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(201,168,76,0.1), transparent 55%);
    opacity:0;transition:opacity 0.3s;
  `;
    card.style.position = 'relative';
    card.appendChild(glow);

    card.addEventListener('mouseenter', () => (glow.style.opacity = '1'));
    card.addEventListener('mouseleave', () => (glow.style.opacity = '0'));
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        '--mx',
        ((e.clientX - r.left) / r.width) * 100 + '%',
      );
      card.style.setProperty(
        '--my',
        ((e.clientY - r.top) / r.height) * 100 + '%',
      );
    });
  });

/* ─────────────────────────────────────────────
   18. HERO STATS — trigger on load (not scroll)
───────────────────────────────────────────── */
function animateCount(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('id-ID');
    if (current >= target) clearInterval(timer);
  }, 28);
}

setTimeout(() => {
  document.querySelectorAll('.hstat-num').forEach((el) => {
    if (!el.dataset.done) {
      el.dataset.done = '1';
      animateCount(el, parseInt(el.dataset.target));
    }
  });
}, 1800);

const presObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter').forEach((el) => {
          if (!el.dataset.done) {
            el.dataset.done = '1';
            animateCount(el, parseInt(el.dataset.target));
          }
        });
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll('.prestasi').forEach((s) => presObserver.observe(s));

console.log(
  '%c🕌 IKA Bunayya loaded!',
  'color:#c9a84c;font-size:15px;font-weight:bold;',
);
