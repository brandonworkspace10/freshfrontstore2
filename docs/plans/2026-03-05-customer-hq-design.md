# FreshFront — Customer HQ Design Doc

**Date:** 2026-03-05  
**Project:** freshfrontstore2  
**Status:** Approved

---

## Overview

Customer HQ is a private, invite-only customer portal for FreshFront — a NYC storefront cleaning company. Active customers manage their service subscriptions, view invoices, book additional services, and communicate with the FreshFront team.

This is a frontend-only MVP using Next.js App Router with mock/placeholder data.

---

## Architecture

### Tech Stack
- Next.js 16 (App Router) — TypeScript
- Tailwind CSS v4
- shadcn/ui component library
- Lucide React icons
- Motion library for animations
- Mock data (no backend yet)

### Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Redirect → `/dashboard/book` (auth'd) or `/login` (not auth'd) |
| `/login` | Email/password + Google OAuth login |
| `/invite/[token]` | Invite token acceptance |
| `/invite-only` | Public gate for unauthenticated visitors |
| `/onboarding/plan` | Step 1: Pick your plan |
| `/onboarding/business` | Step 2: Business info |
| `/onboarding/payment` | Step 3: Payment |
| `/onboarding/welcome` | Step 4: Welcome screen |
| `/dashboard/book` | Tab 1: Book a service |
| `/dashboard/calendar` | Tab 2: My schedule |
| `/dashboard/invoices` | Tab 3: Invoice history |
| `/dashboard/profile` | Tab 4: My profile |
| `/dashboard/messages` | Tab 5: Messages |

### Layout Groups
- `(auth)` — Centered auth layout for login/invite pages
- `(portal)` — Dashboard shell with persistent sidebar + topbar

---

## Design System

### Fonts
- **Fraunces** — Serif display font for logo, headings, plan names
- **DM Sans** — Clean, modern sans-serif for body text, labels, UI

### Colors
- Background: `#FFFFFF`
- Primary: `#22C55E` (green-500)
- Primary Hover: `#16A34A` (green-600)
- Primary Surface: `#F0FDF4` (green-50)
- Foreground: `#111827`
- Muted: `#6B7280`
- Border: `#E5E7EB`

### Components
- Card: `rounded-xl` + subtle shadow
- Buttons: `rounded-lg` with loading states
- Badges: `rounded-full`
- Icons: Lucide React throughout

---

## Access Model (Mock)

Since there's no backend yet, auth state is managed via React Context with localStorage persistence. A mock user is pre-populated.

### Mock User
- Business: "Metro Cuts Barbershop"
- Plan: Medium Business ($250/month)
- Frequency: Monthly
- Borough: Manhattan

---

## Key Features

### Invite Gate
Unauthenticated visitors see a minimal page with:
- FreshFront branding
- Message: invite-only, check email or visit freshfrontnyc.com

### Login
- Email + password form
- "Continue with Google" (placeholder)
- No public signup

### 4-Step Onboarding
1. **Plan Selection** — 3 plan cards with frequency selector
2. **Business Info** — Name, address, borough, type, phone
3. **Payment** — Stripe placeholder + promo code + terms
4. **Welcome** — Confetti animation + next steps

### Dashboard
- Persistent sidebar with 5 tabs
- Sidebar collapses to bottom nav on mobile
- Next service widget in sidebar
- Notification badge on messages

---

## File Structure

```
app/
  layout.tsx
  page.tsx
  (auth)/
    layout.tsx
    login/page.tsx
    invite/[token]/page.tsx
    invite-only/page.tsx
  (portal)/
    layout.tsx
    dashboard/
      book/page.tsx
      calendar/page.tsx
      invoices/page.tsx
      profile/page.tsx
      messages/page.tsx
  onboarding/
    layout.tsx
    plan/page.tsx
    business/page.tsx
    payment/page.tsx
    welcome/page.tsx
components/
  portal/
    sidebar.tsx
    topbar.tsx
lib/
  mock-data.ts
providers/
  auth-provider.tsx
  onboarding-provider.tsx
```
