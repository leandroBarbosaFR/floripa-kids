# Floripa with Kids — Setup Guide

## 1. Supabase

1. Go to https://supabase.com and create a new project (e.g. `floripa-with-kids`)
2. Once created, open the **SQL Editor** and run the file:
   `supabase/migrations/001_initial_schema.sql`
   This creates all tables, RLS policies, the storage bucket, and seeds the 8 categories.
3. In Supabase → **Authentication → Users**, click **Invite user** and create your admin account.
4. Copy your project URL and anon key from **Project Settings → API**.

---

## 2. Admin Dashboard (Next.js)

```bash
cd apps/admin
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
npm install
npm run dev
# Open http://localhost:3000 → login with your Supabase user
```

### Deploy to Vercel
```bash
npm i -g vercel
cd apps/admin
vercel
# Add env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 3. Mobile App (Expo)

```bash
cd apps/mobile
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
npm install
npx expo start
# Press i for iOS simulator, a for Android, or scan QR with Expo Go
```

### Build for App Store (iOS)
```bash
npx eas build --platform ios --profile production
npx eas submit --platform ios
```

You'll need:
- An Apple Developer account ($99/yr)
- EAS CLI: `npm i -g eas-cli && eas login`
- `eas.json` configured (run `eas build:configure` to generate it)

---

## Project Structure

```
floripa-with-kids/
├── apps/
│   ├── admin/          Next.js 15 admin dashboard
│   └── mobile/         Expo 52 React Native app
├── packages/
│   └── shared/         Shared TypeScript types
└── supabase/
    └── migrations/     SQL schema
```

## Admin Features
- Dashboard with event stats
- Create / edit / delete events
- Bilingual fields (PT + EN)
- Photo upload (multiple, set cover)
- Categories, dates, price, age range, location, website, phone
- Publish/draft toggle

## Mobile Features
- Browse events as cards
- Filter by category
- Full-text search (PT + EN)
- Event detail with photo gallery
- Links to Maps, WhatsApp, Website
- Language toggle (PT ↔ EN)
- Pull-to-refresh
