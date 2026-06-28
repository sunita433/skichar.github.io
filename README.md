# Dr. Sunita Khichar — Academic Portfolio

A single-page static portfolio site for Dr. Sunita Khichar, PhD in Wireless Communication (Chulalongkorn University). Built as a polished personal site for industry and academic applications.

**Design:** Neumorphism · Google brand colour accents (blue / red / yellow / green) · Outfit + Manrope (Google Fonts)
**Stack:** Plain HTML / CSS / JavaScript — no build step, no dependencies, no framework. Drop-in to GitHub Pages.

---

## Features

- Hero with animated colour-coded tagline and orbital photo frame
- Animated counters for publication / citation metrics (triggered on scroll)
- Light / dark theme toggle (persists to `localStorage`, respects `prefers-color-scheme`)
- Filterable publication list (All / SCI / Under Review / Conferences / Book Chapters)
- Copy-to-clipboard contact rows with toast feedback
- Scroll-spy navigation that highlights the current section
- Staggered reveal animations on scroll (Intersection Observer)
- Fully responsive (desktop / tablet / mobile breakpoints at 960px and 600px)
- Reduced-motion friendly (respects `prefers-reduced-motion`)
- Zero external dependencies at runtime (only Google Fonts via CDN)

---

## File structure

```
.
├── index.html       # all content
├── style.css        # neumorphism design system + components
├── script.js        # theme toggle, counters, filters, copy, scroll spy
├── assets/
│   └── profile.jpg  # profile photo
└── README.md
```

---

## Deploy to GitHub Pages

### Option A — User site (recommended): `<username>.github.io`

1. Create a new public GitHub repo named exactly **`<your-username>.github.io`** (e.g. `sunitakhichar.github.io`).
2. Push these files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. Visit `https://<your-username>.github.io` — GitHub Pages will serve the site within ~1 minute.

### Option B — Project site under an existing repo

1. Push these files to any repo (e.g. `portfolio`) on the `main` branch.
2. Repo → **Settings** → **Pages** → under "Build and deployment":
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` / `/ (root)`
3. The site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option C — Custom domain

1. Add a file named `CNAME` to the repo root containing only your domain, e.g.:
   ```
   sunitakhichar.com
   ```
2. In your DNS provider, add a `CNAME` record pointing to `<your-username>.github.io`.
3. Repo → **Settings** → **Pages** → enter the same custom domain and tick **Enforce HTTPS**.

---

## Customisation

### Update content
All text lives in `index.html`. Sections are clearly demarcated by HTML comment headers (`<!-- ============== HERO ============== -->` etc.). Add or remove publications by copying any `<article class="pub-item">` block in the Publications section and updating `data-type` (one of: `sci`, `comm`, `conf`, `book`).

### Update profile photo
Replace `assets/profile.jpg` with a new image at roughly 1:1 aspect ratio. The frame crops to a circle automatically.

### Change accent colours
Open `style.css`, find the `:root` block at the top, and tweak the four `--g-*` variables:
```css
--g-blue:   #4285F4;
--g-red:    #EA4335;
--g-yellow: #FBBC05;
--g-green:  #34A853;
```

### Tune neumorphism softness
In `:root`, adjust the shadow tokens:
```css
--neu-out: 8px 8px 20px var(--shadow-dark), -8px -8px 20px var(--shadow-light);
```
Larger blur values (e.g. `30px`) → softer; smaller offsets (e.g. `4px 4px`) → flatter / more subtle.

### Change fonts
The Google Fonts import is in `index.html` (`<head>`). To swap, e.g., **Outfit** for another display font, edit both the `<link>` tag and the `--ff-display` variable in `:root`.

---

## Browser support

Tested on current Chrome, Firefox, Safari, Edge. Uses modern CSS (`color-mix`, custom properties, `clamp`, Intersection Observer) — all supported in evergreen browsers from 2022 onwards.

---

## Credits

- **Fonts:** Outfit, Manrope, JetBrains Mono — all via [Google Fonts](https://fonts.google.com)
- **Icons:** Inline SVGs (custom / Feather-style, MIT-compatible)
- **Design:** Neumorphism aesthetic with Google brand colour accents
