# OMA Cake — Luxury Bespoke Landing Page

An ultra-refined, high-converting landing page for **OMA Cake**, an haute pâtisserie and architectural confectionery atelier based in Setif, Algeria.

---

## Visual & Technical Highlights

- **Aesthetic**: *Light Minimalist Luxury* — warm cream palette (`#FFF8F2`, `#F5EEE6`, `#E7D6C1`, `#3B2A20`) with Playfair Display & Montserrat typography.
- **Scroll Sequence**: 151-frame exploded cake architectural animation scrubbed via HTML5 Canvas and GSAP ScrollTrigger.
- **Bento Grid Gallery**: 8-cell asymmetrical luxury layout showcasing bespoke wedding, botanical, gilded, and dark cocoa creations with category filtering.
- **The Art of Transformation**: Interactive 2:3 portrait Before/After comparison slider with fluid touch support.
- **Mobile-First UX**: Responsive from 320px (iPhone SE) to 430px modern iPhones and tablets, with gesture-safe touch handling, slide-in drawer, and safe-area insets.

---

## Deploying to Netlify

This project is pre-configured with `netlify.toml`, `_headers`, `_redirects`, and `404.html`.

### Option 1: Drag & Drop (Instant — No Git Required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `oma-cake` root folder into the browser window.
3. Your site will be deployed live with SSL within seconds!

### Option 2: Connect via GitHub / GitLab / Bitbucket
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete OMA Cake luxury landing page"
   git push origin main
   ```
2. In Netlify, click **"Add new site" &rarr; "Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect settings from `netlify.toml`:
   - **Publish directory**: `.` (or leave blank)
   - **Build command**: *(none required for static site)*
5. Click **"Deploy site"**.

### Option 3: Netlify CLI
```bash
# Install Netlify CLI if needed
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy directly
netlify deploy --prod
```

---

## Local Development & Testing

To run the site locally:
```bash
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Project Structure

```
oma-cake/
├── assets/
│   ├── exploded_cake/            # 151 scroll animation frames
│   ├── gallery/                  # Haute couture cake images
│   ├── before_cake.png           # Raw tier photograph
│   ├── after_cake.png            # Finished gilded creation
│   ├── oma_cake_loader.PNG       # Initial loading emblem
│   └── oma_cake_logo_transparent_bg.png
├── index.html                    # Main landing page
├── style.css                     # Complete luxury design system
├── script.js                     # Canvas scrubbing, slider & menu logic
├── 404.html                      # Branded luxury 404 error page
├── netlify.toml                  # Netlify build, caching & security rules
├── _headers                      # Direct CDN headers
├── _redirects                    # Clean routing rules
├── robots.txt                    # Search engine crawler instructions
├── sitemap.xml                   # XML sitemap
└── .gitignore                    # Git cleanliness configuration
```
