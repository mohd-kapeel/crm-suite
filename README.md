# CRM Suite — Supabase Authentication

A clean CRM Suite frontend with Supabase email/password authentication.

## 1. Install

```bash
npm install
```

No authentication credentials are hard-coded in the source.

## 2. Configure Supabase

Create or open your Supabase project, then copy the **Project URL** and **Publishable key**.

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

Do not commit `.env.local`.

## 3. Supabase Authentication settings

In Supabase:

**Authentication → Providers → Email**

Enable Email provider.

If you want a new user to enter CRM Suite immediately after Sign Up, turn **Confirm email** off. If Confirm email remains enabled, Sign Up will create the account and ask the user to verify their email before signing in.

## 4. Run

```bash
npm run dev
```

Open the local URL shown by Vite.

## Authentication flow

```text
CRM Suite URL
   ↓
Login / Sign Up
   ↓
Supabase Authentication
   ↓
Authenticated session
   ↓
CRM Suite
```

The CRM route is protected. Direct access to `/` redirects unauthenticated visitors to `/login`.

## Included

- Supabase email/password Sign Up
- Supabase email/password Login
- Persistent browser session
- Session refresh
- Sign Out
- Protected CRM route
- Login/Sign Up loading and error states
- Optional email-confirmation flow
- InventModel logo favicon
