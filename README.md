# Donation Platform — Frontend (Next.js 14)

Public website + admin panel for the donation/NGO platform. Fully API-driven,
SEO-optimised, with an admin panel to manage settings, CMS pages and per-page SEO.

---

## 🧱 Tech stack

| Concern | Technology | Why |
|---------|-----------|-----|
| Framework | **Next.js 14** (App Router, SSR/ISR) | SEO-friendly server rendering |
| Styling | **Tailwind CSS** + **shadcn/ui** | Utility-first + accessible components |
| Data (client) | **TanStack Query** + **Axios** | Caching, mutations, loading/error states |
| Data (server) | Native `fetch` + ISR | SEO-friendly server data for public pages |
| Local state | **Zustand** | Lightweight UI/theme state |
| Forms/validation | **React Hook Form** + **Zod** | Typed, validated forms |
| Theme | **next-themes** | Light/dark toggle (no "system") |
| Notifications | **Sonner** | Toasts |
| Package manager | **pnpm** | Fast, disk-efficient |

---

## 🚀 Getting started

```bash
# 1. Install
pnpm install

# 2. Environment — point the app at the backend API
cp .env.example .env.local
#    NEXT_PUBLIC_API_URL = http://localhost:8080/api   (backend)
#    NEXT_PUBLIC_SITE_URL = http://localhost:3000      (this site, for SEO)
#    API_URL              = http://localhost:8080/api   (server-side fetch)

# 3. Run (make sure the backend is running first)
pnpm dev
```

- Public site → **http://localhost:3000**
- Admin panel → **http://localhost:3000/admin** (login at **/login**)
- SEO files  → **/sitemap.xml**, **/robots.txt**

> Default admin (after backend `pnpm db:seed`): `admin@example.com` / `Admin@12345`

---

## 🗂️ Folder structure

```
app/
  layout.tsx              # Root: dynamic <metadata> from Settings API, providers
  (site)/                 # ── PUBLIC website ──
    layout.tsx            #   dynamic header/footer (Settings API)
    page.tsx              #   home (/)
    donate/page.tsx       #   /donate
    [slug]/page.tsx       #   any published CMS page (/privacy-policy …)
  (admin)/admin/          # ── ADMIN panel (auth-guarded) ──
    layout.tsx            #   AuthGuard + dashboard shell
    page.tsx              #   dashboard
    settings/page.tsx     #   website settings
    seo/page.tsx          #   per-page SEO manager
    cms/page.tsx          #   CMS pages list
    cms/[id]/page.tsx     #   CMS page editor (id "new" = create)
    users/page.tsx        #   user management
  login/page.tsx          # admin login
  sitemap.ts / robots.ts  # dynamic SEO files
components/
  site/                   # SiteHeader, SiteFooter, HomeHero
  admin/                  # dashboard, RichTextEditor, SeoManager, CmsPagesTable,
                          #   UsersManager, AuthGuard, forms/
  providers/              # ThemeProvider, BrandProvider, QueryProvider, ThemeToggle
  ui/                     # shadcn/ui components
  shared/                 # PageHeader, DataTable
lib/
  api/                    # server.ts (SSR), settings.ts, cms.ts, seo-meta.ts,
                          #   client.ts (browser axios), admin.ts, auth.ts
  hooks/useAdmin.ts       # React Query hooks (settings/cms/seo/users)
  seo.ts                  # buildMetadata() — 1-line SEO for any page
config/app.ts             # routes + admin sidebar nav
```

---

## 🔎 How SEO works (fully admin-managed)

Every page gets consistent metadata via **`buildMetadata()`** (`lib/seo.ts`),
which merges, in priority order:

1. Values passed in code
2. **Admin-managed page SEO** (`pageKey` → SEO Manager)
3. **Global defaults** (Settings API)

```ts
// Any new public page → 1 line, admin-editable SEO:
export const generateMetadata = () =>
  buildMetadata({ pageKey: "about", path: "/about" });

// Private page → keep it out of search:
export const generateMetadata = () =>
  buildMetadata({ title: "Profile", noIndex: true });
```

- **CMS pages** carry their own SEO (edited in the CMS editor).
- **Coded pages** (Home/About/Contact) read SEO from the **SEO Manager**.
- `sitemap.xml` and `robots.txt` are generated dynamically; `/admin` is no-indexed.

---

## 🧩 What's where (features)

- **Dynamic header/footer** — `components/site/SiteHeader|SiteFooter`, fed by the
  Settings API in `app/(site)/layout.tsx` (logo, contact, socials, quick links, copyright).
- **API-driven home** — `app/(site)/page.tsx`, no dummy data, graceful fallback.
- **CMS public pages** — `app/(site)/[slug]/page.tsx` renders any published page
  with rich-text content + per-page SEO + JSON-LD.
- **Admin** — Settings, SEO Manager, CMS Manager (with a dependency-free rich-text
  editor), and User Management — all wired to the backend with React Query.
- **Auth** — `/login` stores a JWT; `AuthGuard` protects `/admin`; logout in the header.

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Dev server (http://localhost:3000) |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm lint` / `pnpm type-check` | Lint / TypeScript check |

---

## 🔐 Notes

- Uses **pnpm only**; other lockfiles are git-ignored.
- The browser API client attaches the JWT from `localStorage.auth_token`
  (set on login). Admin mutations require an admin/super-admin account.
- Light/dark theme only (no "system"); brand color is applied live by `BrandProvider`.
