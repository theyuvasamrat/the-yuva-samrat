# THE YUVA SAMRAT — Website starter

A bilingual (English default / Kannada toggle) React + Vite website designed for Cloudflare Pages, with optional Supabase forms.

## Included in this starter

- Responsive homepage with Karnataka-inspired editorial photography and subtle motion
- English default with a compact Kannada language switch
- Public issue submission form
- Community interest registration form
- Karnataka district directory preview
- Political/civic learning section
- Public opinion UI preview (not persisted to a database in this starter)
- Supabase SQL schema with Row Level Security insert-only policies
- Final supplied logo included at `public/logo.jpeg`

## 1. Run locally

Install Node.js (LTS), then:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## 2. Connect Supabase

1. Create a Supabase project.
2. Open **SQL Editor** in Supabase and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env`.
4. Add your Supabase Project URL and the browser-safe publishable/anon key:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

5. Restart `npm run dev`.

The frontend uses only the publishable/anon key. **Never put the Supabase `service_role` key in frontend code or GitHub.** RLS is enabled; public visitors can insert with consent but cannot read or alter submissions. Review submissions in the Supabase dashboard until a protected admin panel is built.

## 3. Push to GitHub

Create a new empty GitHub repository, then from this folder:

```bash
git init
git add .
git commit -m "Initial THE YUVA SAMRAT website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not commit `.env`. It is ignored by `.gitignore`.

## 4. Deploy on Cloudflare Pages

1. In Cloudflare Dashboard, open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select your GitHub repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Build output directory: `dist`.
6. Add environment variables in the Cloudflare Pages project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Deploy. Future pushes to `main` will trigger deployments.

## Important before public launch

- The public opinion buttons currently show a local preview confirmation only; no votes are stored.
- District directory and learning cards are starter content; connect real, sourced content before launch.
- Add an admin-only review interface before publishing public submissions. Do not expose private phone numbers or raw unverified allegations.
- Add spam protection/rate limiting (e.g. Cloudflare Turnstile) before opening submissions widely.
- Add a privacy policy, contact details, retention policy and a clear moderation process.
- Replace sample photography with licensed/owned Karnataka photographs. Remote Unsplash images are used as visual placeholders.
- The social links are placeholders and should be replaced with official profile URLs.
