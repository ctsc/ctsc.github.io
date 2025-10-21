# Personal Portfolio Website

A modern, dark-themed single-page portfolio website showcasing your projects with a bold aesthetic inspired by powerlifting, gaming, and anime culture.

## Features

- **Dark Theme**: Black background with neon/electric accent colors (green, pink, blue, purple)
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Smooth Animations**: Anime-inspired transitions and effects including glitch effects
- **Interactive Elements**: Hover effects, smooth scrolling, mobile menu
- **Project Showcase**: Display your GitHub projects with links and technology tags
- **Personal Touch**: Reflects your personality as a powerlifter, gamer, and anime enthusiast

## Tech Stack

- HTML5
- CSS3 (with modern features like Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (no frameworks needed!)

## Local Development

1. Clone this repository or download the files
2. Open `index.html` in your browser
3. That's it! No build process needed.

## Customization

### Update Your Information

Edit `index.html` to add your personal information:

1. **Navigation & Contact**:
   - Replace `your.email@example.com` with your email (line 187)
   - Update social media links (lines 197-206)

2. **Hero Section**:
   - Customize the hero description if needed (lines 28-31)

3. **About Section**:
   - Edit the about text to tell your story (lines 50-60)

4. **Projects**:
   - Replace the placeholder project cards with your actual projects
   - Update GitHub links (search for `yourusername` in the file)
   - Modify project titles, descriptions, and tech tags
   - Add more project cards by copying the `.project-card` structure

### Styling Customization

Edit `styles.css` to customize colors and appearance:

- **Colors**: Modify CSS variables at the top of the file (lines 11-17)
  ```css
  --accent-primary: #00ff88;  /* Main accent color */
  --accent-secondary: #ff006e; /* Secondary accent */
  --accent-blue: #00d9ff;      /* Blue accent */
  --accent-purple: #9d4edd;    /* Purple accent */
  ```

- **Fonts**: Change the Google Fonts import in `index.html` if desired

### JavaScript Features

The `script.js` file includes:
- Mobile menu toggle
- Smooth scrolling
- Scroll animations
- 3D tilt effect on project cards
- Easter egg (try the Konami code: ↑↑↓↓←→←→BA)

Optional features are commented out and can be enabled:
- Cursor trail effect
- Typing animation for subtitle

## Deployment to GitHub Pages

### Option 1: Quick Deploy from GitHub Web

1. Create a new repository on GitHub (can be named anything, e.g., `personalweb`)
2. Upload all files (`index.html`, `styles.css`, `script.js`, `README.md`) to the repository
3. Go to repository **Settings** → **Pages**
4. Under "Source", select **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/personalweb/`



Then follow steps 3-6 from Option 1.

### Option 3: Deploy to username.github.io (Personal Site)

For your main GitHub Pages site:

1. Create a repository named **exactly** `yourusername.github.io` (replace with your actual GitHub username)
2. Push your files to this repository
3. GitHub Pages will automatically be enabled
4. Your site will be live at `https://yourusername.github.io/`

## File Structure

```
personalweb/
│
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
└── README.md           # This file (documentation)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- All assets are optimized and minimal
- No external dependencies except Google Fonts
- Pure CSS animations for better performance
- Lazy loading with Intersection Observer

## Future Enhancements

Consider adding:
- Dark/light mode toggle
- Blog section
- More projects as you build them
- Contact form integration
- Analytics (Google Analytics or similar)
- SEO meta tags and Open Graph tags
- Favicon

## License

Feel free to use this template for your own portfolio! No attribution required, but always appreciated.

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

---

**Built with ☕ and 💪**

*Now go lift some weights, play some games, and watch some anime while your portfolio does the talking!* 🎮⚡

