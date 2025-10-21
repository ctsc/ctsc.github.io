# Carter Tierney | Data Engineer Portfolio

A clean, minimal, single-page portfolio showcasing data engineering projects and expertise. Professional blue theme with smooth animations.

## 🎯 Concept

A professional, minimal portfolio with a light blue theme. Clean layout inspired by modern developer portfolios - focused on showcasing data engineering expertise with clear project descriptions and real production metrics.

## ✨ Features

### Design Philosophy
- **Zero Scrolling**: Everything fits on one screen (desktop)
- **Dashboard Layout**: 4x3 grid system with modular cards
- **Minimal Aesthetic**: Terminal-inspired, monospace font, green accent
- **Professional**: Matches resume tone - clear, concise, consistent

### Interactive Elements
- **Live System Time**: Updates every second in header
- **Hover Effects**: Subtle glow on cards
- **Keyboard Shortcuts**:
  - `G` → Open GitHub
  - `L` → Open LinkedIn  
  - `Ctrl/Cmd + K` → Contact

### Content Cards
1. **Profile** - Name, role, bio, links
2. **Metrics** - Key stats (12.5K tx/min, 99.7% uptime, etc.)
3. **Tech Stack** - 8 core technologies
4. **Education** - M.S. & B.S. + Achievement
5. **3 Projects** - Top data engineering work
6. **Experience** - 2 recent positions
7. **Status** - Availability & interests

## 📐 Layout

```
┌─────────────────────────────────────────────────┐
│ HEADER: Status | Title | Time | Contact         │
├─────────┬─────────┬─────────┬─────────┐
│ Profile │ Metrics │  Tech   │   Edu   │
├─────────┼─────────┼─────────┼─────────┤
│Project 1│Project 2│Project 3│ Work    │
├─────────┴─────────┴─────────┴─────────┤
│          Status & Availability         │
├─────────────────────────────────────────┤
│ FOOTER: Copyright | Title | Tagline    │
└─────────────────────────────────────────┘
```

## 🎨 Design Specs

### Colors
- **Background**: #0a0e1a (dark blue-black)
- **Cards**: #151922 (slightly lighter)
- **Accent**: #00ff88 (terminal green)
- **Text**: #e4e6eb (light gray)

### Typography
- **Font**: JetBrains Mono (monospace)
- **Size**: 14px base (responsive down to 10px mobile)

### Grid
- **Desktop**: 4 columns × 3 rows
- **Tablet**: 2 columns × 5 rows
- **Mobile**: 1 column (scrollable)

## 🚀 Quick Start

1. Open `index.html` in a browser
2. That's it! No build process needed.

## 🔧 Customization

### Update Your Info

**Lines to change in `index.html`:**
- Line 24: Your name in title
- Line 29: Email address
- Line 40: Name
- Line 41: Role
- Line 42: Bio
- Lines 44-46: GitHub, LinkedIn, Phone links
- Lines 82-88: Education details
- Lines 89: Achievement
- Lines 95-166: Projects (3 total)
- Lines 175-186: Work experience (2 entries)
- Lines 194-202: Status/availability

### Change Colors

**In `styles.css` (lines 9-15):**
```css
--accent: #00ff88;        /* Main green accent */
--bg-primary: #0a0e1a;    /* Dark background */
--bg-card: #151922;       /* Card background */
```

## 📱 Responsive

- **Desktop (1200px+)**: Full 4×3 grid, no scroll
- **Laptop (1024-1199px)**: Scaled down, still no scroll
- **Tablet (768-1023px)**: 2×5 grid, some scroll
- **Mobile (<768px)**: 1 column, vertical scroll

## 🎯 File Structure

```
personalweb/
├── index.html    (9 cards layout)
├── styles.css    (minimal dashboard styling)
├── script.js     (time update, shortcuts)
└── README.md     (this file)
```

**Total Size**: ~12KB (all files combined)

## 📊 Metrics Displayed

From your actual resume:
- ✅ 12.5K transactions/minute
- ✅ 99.7% system uptime
- ✅ 18x database optimization
- ✅ 95.3% ML accuracy

## 🔑 Keyboard Shortcuts

- `G` - Open GitHub profile
- `L` - Open LinkedIn profile
- `Ctrl/Cmd + K` - Open email contact

## 🌐 Deploy

### GitHub Pages
```bash
git init
git add .
git commit -m "Data engineer dashboard"
git remote add origin https://github.com/ctsc/portfolio
git push -u origin main
```
Enable Pages in repo settings.

### Netlify
Drag and drop the folder to netlify.com

### Vercel  
Import from GitHub and deploy instantly.

## 💡 Design Choices

**Why This Layout?**
- Matches data engineering aesthetic (monitoring dashboards)
- Clean and professional (not gamer-themed)
- Information density without clutter
- Respects recruiter's time (no scrolling needed)
- Consistent with resume tone

**Why Minimal?**
- Focus on content, not design
- Fast loading
- Professional appearance
- Easy to scan quickly

**Why Dashboard Style?**
- Reflects data engineering work (monitoring systems)
- Unique but not gimmicky
- Shows technical thinking
- Industry-appropriate

## ✅ Matches Resume

This portfolio uses the same:
- Projects (E-Commerce Analytics, Enterprise Platform, ML Sports, Housing)
- Metrics (12.5K tx/min, 99.7% uptime, etc.)
- Tech stack (Python, Kafka, Spark, PostgreSQL, AWS)
- Tone (professional, metric-driven, clear)

## 🎓 Perfect For

- Amazon data engineer applications
- Google/Meta/tech company portfolios
- LinkedIn profile link
- Resume supplement
- Technical interviews

## 📞 Contact

- **Email**: cartertierney0@gmail.com
- **LinkedIn**: [Carter Tierney](https://www.linkedin.com/in/carter-tierney-6b6001261/)
- **GitHub**: [ctsc](https://github.com/ctsc)
- **Phone**: (404) 807-0557

---

**CARTER_TIERNEY.sys** | Data Engineer | © 2025
