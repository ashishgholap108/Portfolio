# Ashish Gholap — Video Editor Portfolio

A single-page, dark cinematic portfolio built around a non-linear-editor
visual language (timecodes, tracks, a scroll-scrubber) and a teal/amber
color-grade duotone — a nod to the "Before / After" reels this is built to
showcase.

Pure HTML/CSS/JS. No build step, no dependencies. Works as-is on GitHub Pages.

## What's inside
```
index.html
assets/
  css/style.css      -- all styling, design tokens at the top
  js/main.js          -- scroll-scrubber, reel autoplay, lightbox, nav
  videos/reel1-5.mp4   -- your 5 "Before/After" clips, compressed for web
  images/poster1-5.jpg -- auto-generated poster frames for each clip
```

The 5 source videos you provided were ~445MB total (way over what GitHub
allows in a normal repo). They've been re-encoded to web-friendly H.264
at 720px width — the whole video folder is now **~6.6MB**, full quality
still looks sharp at reel/phone-frame size, and pages load fast.

## Deploy to GitHub Pages (2 minutes)

1. Create a new repository on GitHub (e.g. `ashish-portfolio`).
2. Upload everything in this folder to the repo root — either drag-and-drop
   in the GitHub web UI, or:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**,
   branch **main**, folder **/ (root)**. Save.
5. Wait ~1 minute, then your site is live at:
   `https://<your-username>.github.io/<repo-name>/`

## A couple of things to fill in yourself

I only used the real details you gave me. Two spots are placeholders you
may want to update in `index.html`:

- **LinkedIn** — not provided, so it's not on the site yet. If you want it,
  add another link inside `.contact__links` in `index.html`, same pattern
  as the Instagram link.
- **Portfolio link** — once your GitHub Pages URL is live, feel free to
  add it to the same links row, or just share the GitHub Pages link directly.

Everything else — bio, education, experience, skills, email, Instagram —
is pulled straight from what you sent.

## Customizing

- **Colors / fonts**: all defined as CSS variables at the top of
  `assets/css/style.css` (`:root { ... }`).
- **Reel captions/order**: edit the `<article class="reel">` blocks in
  `index.html` under `<section id="work">`.
- **Adding more reels**: drop a new compressed `.mp4` in `assets/videos/`,
  generate a poster frame (`ffmpeg -i clip.mp4 -vf "select=eq(n\,15)"
  -vframes 1 poster.jpg`), and copy one of the existing `<article class="reel">`
  blocks.
