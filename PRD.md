# Dorm Marketplace — Product Requirements Document

## Scope Cut

1. **Payments:** No in-app payment processing because a Day 1 campus prototype only needs a displayed price and an in-person handoff.
2. **Live chat:** No messaging system because coordination can stay lightweight and should not expand the MVP into a social platform.
3. **Advanced search and verification:** No saved searches, ranking, or email verification because a small campus feed can validate the core exchange loop first.

## MVP Features

1. **List an item:** A student can create a listing with a title, price or free label, category, dorm, and short handoff note.
2. **Browse available items:** Students can scan active listings, filter by category, and see clear availability and pickup details.
3. **Claim and resolve an item:** A student can claim an item for a short hold window, confirm pickup, or let the claim expire; the seller can also mark an item sold or remove it immediately.

## Acceptance Criteria

### Claim Item — successful hold

**Given** an item is available, **when** a student selects Claim Item, **then** the listing changes to Held, shows the hold expiry, and becomes unavailable to other claim attempts.

### Claim Item — concurrency collision

**Given** two students attempt to claim the same available item at the same time, **when** the first state transition succeeds, **then** exactly one claim is accepted and the other student sees that the item is no longer available.

### Claim Item — ghost buyer expiration

**Given** a student has claimed an item but has not confirmed pickup, **when** the hold timer reaches zero, **then** the claim expires and the item returns to Available for another student to claim.
