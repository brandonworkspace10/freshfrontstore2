# Book Tab — Add-Ons Only Redesign

**Date:** 2026-03-05  
**Approach:** A — Clean replacement  
**Status:** Approved

## Problem

The Book tab showed all 5 services, 4 of which were "Included in plan" (banner, windows, sidewalk, storefront wash). This confused customers because those services happen automatically each month — there's nothing to book. Only 1 service (Full Deep Clean) was actually bookable.

## Solution

Replace `mockServices` with 4 true add-on services that are outside the monthly plan. Update the subscription banner copy to clearly explain what the plan already covers. Remove any mention of plan-included services from this page.

## New Add-On Services

| Service | Duration | Pricing |
|---------|----------|---------|
| Graffiti Removal | ~1–2 hrs | Quote-based |
| Alley & Rear Cleaning | ~45 min | Add-on |
| Gum & Stain Removal | ~30 min | Add-on |
| Full Deep Clean | ~2 hrs | Add-on |

## UI Changes

- **Subscription banner:** New copy — "Your plan covers banner, windows & concrete automatically. Book any extras below."
- **Page subtitle:** "Request a one-time add-on service outside your monthly plan."
- **Service cards:** Replace all 5 old cards with the 4 add-on cards above. No "Included in plan" badges anywhere.
- **Emergency CTA:** Kept as-is — still the highest priority item on the page.

## Files Changed

- `lib/mock-data.ts` — `mockServices` array
- `app/(portal)/dashboard/book/page.tsx` — banner copy, subtitle, icon map
