// ============================================================
// ASHISH GHOLAP — VIDEO EDITOR PORTFOLIO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- scrub-bar : page-as-timeline scroll progress ---------- */
  const fill = document.querySelector('.scrubbar__fill');
  const head = document.querySelector('.scrubbar__head');
  const nav  = document.querySelector('.nav');
  const TOTAL_SECONDS = 150; // fictional "runtime" of the page edit

  function formatTimecode(pct){
    const totalFrames = Math.round(pct * TOTAL_SECONDS * 24); // 24fps
    const fps = 24;
    const totalSec = Math.floor(totalFrames / fps);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const ss = String(totalSec % 60).padStart(2, '0');
    const ff = String(totalFrames % fps).padStart(2, '0');
    return `00:${mm}:${ss}:${ff}`;
  }

  function onScroll(){
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
    if (fill) fill.style.width = (pct * 100) + '%';
    if (head){
      head.style.left = (pct * 100) + '%';
      head.textContent = formatTimecode(pct);
    }
    if (nav) nav.classList.toggle('is-scrolled', scrollTop > 40);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('is-open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('is-open')));
  }

  /* ---------- hero video: make sure autoplay actually kicks in ---------- */
  const heroVideo = document.querySelector('.hero-phone__video');
  if (heroVideo){
    const tryPlay = () => heroVideo.play().catch(() => {});
    tryPlay();
    document.addEventListener('click', tryPlay, { once: true });
  }

  /* ---------- reel cards: click-to-play + lightbox ---------- */
  const lightbox = document.querySelector('.lightbox');
  const lightboxVideo = lightbox ? lightbox.querySelector('video') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;

  document.querySelectorAll('.reel__frame').forEach(frame => {
    const src = frame.dataset.src;
    frame.addEventListener('click', () => {
      if (!lightbox || !lightboxVideo) return;
      lightboxVideo.src = src;
      lightbox.classList.add('is-open');
      lightboxVideo.currentTime = 0;
      lightboxVideo.muted = false;
      lightboxVideo.play().catch(()=>{});
    });
  });

  function closeLightbox(){
    if (!lightbox || !lightboxVideo) return;
    lightbox.classList.remove('is-open');
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.load();
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- muted autoplay preview when card scrolls into view ---------- */
  const previewVideos = document.querySelectorAll('.reel__frame video[data-preview]');
  if ('IntersectionObserver' in window && previewVideos.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target;
        const frame = vid.closest('.reel__frame');
        if (entry.isIntersecting){
          vid.play().then(() => frame.classList.add('is-playing')).catch(()=>{});
        } else {
          vid.pause();
          frame.classList.remove('is-playing');
        }
      });
    }, { threshold: 0.6 });
    previewVideos.forEach(v => io.observe(v));
  }

  /* ---------- reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length){
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => ro.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

});
