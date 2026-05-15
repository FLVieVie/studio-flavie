/* =========================================================
   Studio Flavie — interactions
   GSAP + ScrollTrigger (CDN), VanillaTilt for 3D card hover
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initCursor();
  initMenu();
  initScrollReveal();
  initSmoothAnchors();
  initMarquee();
  initFAQ();
  initFilters();
  initProjectModal();
  initTilt();
  initParallax();
  initCalendar();
  initForms();
  initYear();
});

/* -------- Intro loader -------- */
function initIntro() {
  const intro = document.getElementById('intro');
  if (!intro) return;
  document.body.classList.add('no-scroll');
  setTimeout(() => {
    intro.classList.add('done');
    document.body.classList.remove('no-scroll');
    setTimeout(() => intro.remove(), 1300);
  }, 1700);
}

/* -------- Custom cursor (with magnetic lerp) -------- */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const ring = document.createElement('div');
  const dot = document.createElement('div');
  ring.className = 'cursor-ring';
  dot.className = 'cursor-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  const tick = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  const hoverables = 'a, button, .interactive, .chip, .slot, .cal-day, summary, input, textarea, select, label[class*="chip"]';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* -------- Mobile menu -------- */
function initMenu() {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menu-overlay');
  if (!burger || !overlay) return;
  burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
}

/* -------- Scroll reveal (GSAP if available, IntersectionObserver fallback) -------- */
function initScrollReveal() {
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    // section-level fade-up
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });
    // staggered children
    gsap.utils.toArray('.reveal-stagger').forEach(container => {
      const items = container.children;
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });
    // word-level reveal — wraps text nodes only (preserves inner HTML tags)
    function wrapWords(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      const textNodes = [];
      let n;
      while ((n = walker.nextNode())) textNodes.push(n);
      textNodes.forEach(textNode => {
        const parts = textNode.nodeValue.split(/(\s+)/);
        if (parts.length === 1 && !parts[0].trim()) return;
        const frag = document.createDocumentFragment();
        parts.forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(p));
          } else {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = p;
            frag.appendChild(span);
          }
        });
        textNode.parentNode.replaceChild(frag, textNode);
      });
    }
    gsap.utils.toArray('.word-reveal').forEach(el => {
      wrapWords(el);
      gsap.fromTo(el.querySelectorAll('.word'),
        { y: '0.6em', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.04,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });
  } else {
    // Fallback
    const els = document.querySelectorAll('.reveal, .reveal-stagger, .word-reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  }
}

/* -------- Smooth anchor scroll -------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
}

/* -------- Marquee duplicate content -------- */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });
}

/* -------- FAQ accordion (close others) -------- */
function initFAQ() {
  const items = document.querySelectorAll('details.faq');
  items.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    });
  });
}

/* -------- Project filter -------- */
function initFilters() {
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-cat]');
  if (chips.length === 0 || cards.length === 0) return;
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat.split(' ').includes(filter);
        if (match) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { if (chip.classList.contains('is-active') && filter === chip.dataset.filter) card.style.display = 'none'; }, 400);
        }
      });
    });
  });
}

/* -------- Project detail modal -------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const triggers = document.querySelectorAll('[data-project]');
  const closeBtn = modal.querySelector('[data-close]');
  const titleEl = modal.querySelector('[data-modal-title]');
  const clientEl = modal.querySelector('[data-modal-client]');
  const briefEl = modal.querySelector('[data-modal-brief]');
  const solutionEl = modal.querySelector('[data-modal-solution]');
  const resultsEl = modal.querySelector('[data-modal-results]');
  const galleryEl = modal.querySelector('[data-modal-gallery]');

  triggers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    const data = JSON.parse(t.dataset.project);
    titleEl.textContent = data.title;
    clientEl.textContent = data.client;
    briefEl.textContent = data.brief;
    solutionEl.textContent = data.solution;
    resultsEl.textContent = data.results;
    galleryEl.innerHTML = data.images.map(c => `<div class="aspect-[4/5] rounded-2xl ${c}"></div>`).join('');
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }));
  closeBtn.addEventListener('click', () => { modal.classList.remove('is-open'); document.body.classList.remove('no-scroll'); });
  modal.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.remove('is-open'); document.body.classList.remove('no-scroll'); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { modal.classList.remove('is-open'); document.body.classList.remove('no-scroll'); } });
}

/* -------- 3D tilt on project cards -------- */
function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-y * 10).toFixed(2);
      const ry = (x * 14).toFixed(2);
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/* -------- Parallax decorative blobs -------- */
function initParallax() {
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (!hasGSAP) return;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    gsap.to(el, {
      y: () => -window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

/* -------- Booking calendar -------- */
function initCalendar() {
  const grid = document.getElementById('cal-grid');
  if (!grid) return;
  const monthLabel = document.getElementById('cal-month');
  const prev = document.getElementById('cal-prev');
  const next = document.getElementById('cal-next');
  const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const today = new Date();
  let view = new Date(today.getFullYear(), today.getMonth(), 1);

  function render() {
    monthLabel.textContent = `${months[view.getMonth()]} ${view.getFullYear()}`;
    grid.innerHTML = '';
    ['L','M','M','J','V','S','D'].forEach(d => {
      const h = document.createElement('div');
      h.className = 'text-[10px] uppercase tracking-[0.2em] text-ink-muted text-center';
      h.textContent = d;
      grid.appendChild(h);
    });
    const firstDay = (new Date(view.getFullYear(), view.getMonth(), 1).getDay() + 6) % 7;
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day';
      cell.textContent = d;
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const dow = date.getDay();
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (isPast || dow === 0 || dow === 6) {
        cell.classList.add('disabled');
      } else {
        cell.addEventListener('click', () => {
          grid.querySelectorAll('.cal-day.selected').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          const slots = document.getElementById('slots');
          if (slots) slots.classList.remove('opacity-30');
        });
      }
      grid.appendChild(cell);
    }
  }
  prev.addEventListener('click', () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    if (view < new Date(today.getFullYear(), today.getMonth(), 1)) view = new Date(today.getFullYear(), today.getMonth(), 1);
    render();
  });
  next.addEventListener('click', () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    render();
  });
  render();

  document.querySelectorAll('#slots .slot').forEach(s => s.addEventListener('click', () => {
    document.querySelectorAll('#slots .slot').forEach(x => x.classList.remove('selected'));
    s.classList.add('selected');
  }));
}

/* -------- Forms (mock submit) -------- */
function initForms() {
  document.querySelectorAll('form[data-mock]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('[data-feedback]');
      if (feedback) {
        feedback.textContent = '✓ Merci ! Votre message est parti. Je vous réponds sous 24h.';
        feedback.classList.remove('hidden');
      }
      form.reset();
    });
  });
}

function initYear() {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}
