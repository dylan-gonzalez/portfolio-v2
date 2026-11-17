# Dylan Gonzalez — Software Engineer Portfolio

A minimalist, high-performance portfolio website for a Software Engineer, designed with generous whitespace, rounded geometry, and a subtle white-to-grey gradient aesthetic.

---

## 🎨 Design System

- **Aesthetic**: Clean, modern, breathable layout with generous whitespace.
- **Geometry**: Rounded rectangles (`rounded-2xl`, `rounded-3xl`, `rounded-4xl`) for all cards, containers, buttons, and navigation elements.
- **Palette**: Gradient white-grey background (`from-white via-zinc-100 to-zinc-200`) with high-contrast slate and zinc typography.
- **Navigation**: Centered, floating glassmorphic top navbar with **Home**, **Projects**, and **Contact** tabs, featuring an active-tab scroll spy.

---

## 🚀 Features

- **Centered Top Navbar**: Floating pill navbar with backdrop blur and dynamic active-state indicator that tracks page scroll.
- **Home Section**:
  - Live availability badge.
  - Engineering metrics and impact highlights.
  - Interactive technical stack categories with rounded tech chips (Languages, Backend & Data, Frontend & Cloud).
  - Engineering principles cards focusing on modular systems, performance, and clean architecture.
- **Projects Showcase**:
  - Filterable by domain: **All**, **Systems**, **Full-Stack**, and **Tools**.
  - Detailed cards with architecture highlights, benchmark metrics, and links to source code and demos.
- **Contact & Connect**:
  - Direct email with one-click copy to clipboard + animated toast feedback.
  - GitHub and location status.
  - Interactive message form with validation and simulated dispatch.
- **Zero Build Step**: Pure semantic HTML5, modern Tailwind CSS, and vanilla JavaScript. Runs out-of-the-box in any browser or static host (GitHub Pages, Vercel, Netlify).

---

## 📂 Project Structure

```
portfolio/
├── index.html       # Semantic HTML5 markup and Tailwind configuration
├── style.css        # Custom CSS utilities, scrollbar, and interactions
├── script.js        # Active scroll spy, filtering, toast notifications, and copy handler
├── .gitignore       # Standard git ignore rules
└── README.md        # Project documentation
```

---

## 💻 Local Preview

To view the website locally, open `index.html` in any browser:

```powershell
# On Windows PowerShell:
Start-Process index.html
```

Or serve with any static server:
```bash
# Python:
python -m http.server 8000

# Node / npx:
npx serve .
```

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.
