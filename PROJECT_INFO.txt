# 🏛️ Younick Design Studio — Master Project Handbook

> **Confidential & Operational Documentation**  
> This file contains all essential administrative, architectural, credential, and developer reference information for the Younick Design Studio digital platform.

---

## 📌 1. Quick Reference & Important URLs

| Asset / Service | URL / Destination | Description |
| :--- | :--- | :--- |
| **🌐 Live Public Website** | [https://yds-liart.vercel.app](https://yds-liart.vercel.app) | Production customer-facing portfolio & platform |
| **📱 Live Cloud Admin Studio** | [https://younickdesignstudio-admin.sanity.studio](https://younickdesignstudio-admin.sanity.studio) | Cloud CMS accessible from any phone, tablet, or laptop |
| **⚙️ Sanity Cloud Dashboard** | [https://www.sanity.io/manage/project/b0rnzdhr](https://www.sanity.io/manage/project/b0rnzdhr) | Project billing, team members, CORS, & API tokens |
| **💻 Local Website (Dev)** | `http://localhost:5173` | Local frontend development server |
| **🛠️ Local Studio (Dev)** | `http://localhost:3333` | Local admin CMS development server |

---

## 🔑 2. Project Identifiers & Credentials

* **Sanity Project ID**: `b0rnzdhr`
* **Sanity Dataset**: `production`
* **Sanity API Version**: `2024-01-01`
* **Studio Hostname**: `younickdesignstudio-admin`
* **Primary Admin Account**: `keshavsain.jpr@gmail.com`

### Environment Configuration (`.env`)
Located in project root `c:\Users\admin\YDS\.env`:
```env
VITE_SANITY_PROJECT_ID=b0rnzdhr
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

---

## 📱 3. Admin & Content Manager Guide (For Mobile & Desktop)

### A. Accessing the Admin Panel on Your Phone
1. Open Chrome/Safari on your smartphone or iPad.
2. Go to: **[https://younickdesignstudio-admin.sanity.studio](https://younickdesignstudio-admin.sanity.studio)**
3. Log in with your registered Google account (`keshavsain.jpr@gmail.com`).
4. *(Optional Pro-Tip)*: Tap the browser **Share** icon $\rightarrow$ **"Add to Home Screen"** to save it as a 1-tap mobile app on your phone.

### B. Adding a New Architectural / Interior Project
1. Tap **Projects** in the left menu.
2. Click the **`+`** button.
3. Fill in:
   * **Project Title** (e.g. *The Royal Oasis Villa*)
   * Click **Generate** next to Slug.
   * Select **Category** (*Architecture*, *Interior Design*, *Construction*, *Renovation*, *3D Visualization*, *Consultation*).
   * **Location** (e.g. *Jaipur, Rajasthan*).
   * **Main Cover Image**: Upload a high-resolution render or photograph.
   * **Photo Gallery**: Upload multiple site/interior photos.
   * **Work Scope / Deliverables**: List project tasks (e.g. *Structural Design, Custom Woodwork, Lighting Automation*).
   * **Area & Budget**: (e.g. *4,500 sq ft*, *Luxury*).
   * **Featured on Homepage**: Toggle ON if you want this project to appear in the Homepage Selected Works carousel.
4. Click the green **Publish** button at the bottom right. The live website updates immediately!

### C. Managing Services, Team Members & Reviews
* **Services**: Update descriptions, icons, features, and project timelines.
* **Team Members**: Add new architects/engineers, update bios, and upload portraits.
* **Client Testimonials**: Add client quotes, star ratings (1–5), and location references.

---

## 🎨 4. Brand Guidelines & Visual Palette

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Midnight Obsidian** | `#0B1220` | Main luxury dark background, headings, studio base |
| **Deep Charcoal** | `#070D18` | Studio top bar, navigation headers, dark cards |
| **Forest Emerald** | `#0B3528` | Accent brand deep green, sustainability badges |
| **Luxury Warm Gold** | `#E6B566` / `#B08D57` | Primary accent, CTA buttons, active tabs, star ratings |
| **Alabaster White** | `#FAFAFB` / `#FFFFFF` | Card containers, light sections, modal backgrounds |

---

## 💻 5. Developer Architecture & Engineering Structure

```
YDS/
├── public/                 # Optimized static assets & images
│   ├── assets/Projects/    # High-resolution architectural photography
│   └── younick-crest.png   # Brand crest logo
├── sanity/                 # Standalone Sanity Studio Application
│   ├── components/         # Custom StudioLogo & StudioNavbar
│   ├── schemas/            # Schemas: project, service, teamMember, testimonial
│   ├── theme.ts            # Custom luxury dark/gold studio theme
│   ├── sanity.config.ts    # Main Studio configuration
│   └── sanity.cli.ts       # CLI configuration (with younickdesignstudio-admin host)
├── src/
│   ├── components/         # Reusable UI components (Modals, Sliders, Cards, 3D Hero)
│   ├── data/               # Permanent static fallback data (projects, services, team)
│   ├── hooks/
│   │   └── useSanityData.ts# Reactive caching hooks with zero-downtime offline fallback
│   ├── lib/
│   │   └── sanity.ts       # Client instance & dynamic WebP/AVIF image URL builder
│   ├── pages/              # Route pages (Home, Projects, Services, Team, About, Career)
│   └── utils/seo.ts        # Dynamic JSON-LD, OpenGraph & meta tags
├── scripts/
│   └── run_migration.mjs   # Automated cloud data seeder script
├── .env                    # Environment variables
└── vite.config.ts          # Granular bundle splitting & Vite configuration
```

### 🛡️ Zero-Downtime Fallback Architecture
The site utilizes a resilient dual-layer data architecture in `src/hooks/useSanityData.ts`:
1. It attempts to fetch real-time data from the Sanity Edge CDN.
2. If Sanity is unconfigured, unreachable, or in development mode without internet, the hooks instantly fall back to local static objects in `src/data/`.
3. **The website will never crash or display blank screens under any network circumstance.**

---

## 🛠️ 6. Common Developer Terminal Commands

### Run the Website Locally:
```bash
npm run dev
# Opens at http://localhost:5173
```

### Build & Verify Production Bundle:
```bash
npx vite build
```

### Run Sanity Studio Locally:
```bash
cd sanity
npm run dev
# Opens at http://localhost:3333
```

### Deploy / Update Live Cloud Sanity Studio:
```bash
cd sanity
npx sanity deploy
```

### Re-run Database Migration (Upload local data to Sanity):
```bash
npx tsx scripts/run_migration.mjs
```

---

## 🌐 7. CORS Configuration (Allowing Domains to Read Content)

If you add a custom domain (e.g. `www.younickdesignstudio.com`), you must authorize it in Sanity:
1. Go to: **[https://www.sanity.io/manage/project/b0rnzdhr/api](https://www.sanity.io/manage/project/b0rnzdhr/api)**
2. Click **+ Add CORS origin**.
3. Add your domain URL (e.g. `https://www.younickdesignstudio.com`).
4. Check **Allow credentials** $\rightarrow$ Click **Save**.

---
*Created for Younick Design Studio.*
